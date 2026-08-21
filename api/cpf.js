// Proxy de consulta de CPF: esconde a API key e evita CORS (same-origin pro browser).
// Contrato com 2.html: GET /api/cpf?cpf=<11 digitos> -> { nome, data_nascimento, ... }.
//
// Cascata de robustez (apicpf tem rate limit agressivo no plano free = 429):
//   1) apicpf.com  -> dados ricos (nome + data_nascimento reais)
//   2) fallback concurso-inscricao.com quando apicpf falha/429/vazio
// O funil nunca trava: se nenhuma trouxer nascimento, 2.html degrada a etapa 3.
const APICPF_URL = 'https://apicpf.com/api/consulta';
const APICPF_KEY = process.env.CPF_API_KEY || '3370051f4eaa75bf6dd8f4740f2c8fe346586ff089b858f05bbb8f28fb6e2c56';
const FALLBACK_URL = 'https://concurso-inscricao.com/v1/consultarev0ltz';
const FALLBACK_TOKEN = 'tokenjotais6x026';

async function consultarApicpf(cpf) {
  const r = await fetch(`${APICPF_URL}?cpf=${cpf}`, {
    method: 'GET',
    headers: { 'X-API-KEY': APICPF_KEY, 'Accept': 'application/json' },
  });
  const data = await r.json().catch(() => ({}));
  // 429 (rate limit) ou payload sem nome util => sinaliza pro fallback.
  const d = data && data.data;
  if (data && data.code === 200 && d && d.nome) {
    return { nome: d.nome, data_nascimento: d.data_nascimento || '', genero: d.genero || '', fonte: 'apicpf' };
  }
  return null;
}

async function consultarFallback(cpf) {
  const r = await fetch(`${FALLBACK_URL}/${cpf}/?token=${FALLBACK_TOKEN}`, { method: 'GET' });
  const data = await r.json().catch(() => ({}));
  // Resposta varia; normaliza o que der.
  const nome = data.nome || data.NOME || '';
  const nasc = data.nascimento || data.NASC || data.data_nascimento || '';
  const mae = data.mae || data.MAE || data.nome_mae || '';
  if (nome && nome.toLowerCase() !== 'cliente') {
    return { nome, data_nascimento: nasc, nome_mae: mae, fonte: 'fallback' };
  }
  if (nasc || mae) return { nome: nome || 'Cliente', data_nascimento: nasc, nome_mae: mae, fonte: 'fallback' };
  return null;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const cpf = String((req.query && req.query.cpf) || '').replace(/\D/g, '');
    if (cpf.length !== 11) {
      res.status(200).json({ error: 'cpf_invalido' });
      return;
    }

    let out = null;
    try { out = await consultarApicpf(cpf); } catch (e) { console.error('apicpf erro', e); }
    if (!out) {
      try { out = await consultarFallback(cpf); } catch (e) { console.error('fallback erro', e); }
    }

    // Nada em nenhuma fonte: devolve vazio (2.html segue o funil degradando etapa 3).
    res.status(200).json(out || { nome: 'Cliente', data_nascimento: '', fonte: 'none' });
  } catch (e) {
    console.error('cpf handler erro', e);
    res.status(200).json({ nome: 'Cliente', data_nascimento: '', fonte: 'error' });
  }
};
