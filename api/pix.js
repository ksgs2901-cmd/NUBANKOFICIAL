const { blackcat, extrairPix } = require('./_blackcat');
const { resolverProduto } = require('./_catalog');
const { enviarOrder, empacotarContexto, montarContexto } = require('./_utmify');

function soDigitos(v) { return String(v || '').replace(/\D/g, ''); }
function primeiroIp(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || '0.0.0.0';
}

// A Blackcat recusa a geracao do PIX se o document nao for um CPF valido.
function cpfValido(c) {
  const d = soDigitos(c);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  let s = 0;
  for (let i = 0; i < 9; i++) s += Number(d[i]) * (10 - i);
  let r = (s * 10) % 11; if (r === 10) r = 0;
  if (r !== Number(d[9])) return false;
  s = 0;
  for (let i = 0; i < 10; i++) s += Number(d[i]) * (11 - i);
  r = (s * 10) % 11; if (r === 10) r = 0;
  return r === Number(d[10]);
}

// Fallback quando o funil nao trouxe CPF (acesso direto): gera um CPF valido pra
// nao derrubar a venda. No fluxo normal o CPF real vem do passo de consulta (/01->/02).
function gerarCpf() {
  const n = [];
  for (let i = 0; i < 9; i++) n.push(Math.floor(Math.random() * 10));
  let s = 0; for (let i = 0; i < 9; i++) s += n[i] * (10 - i);
  let d1 = (s * 10) % 11; if (d1 === 10) d1 = 0; n.push(d1);
  s = 0; for (let i = 0; i < 10; i++) s += n[i] * (11 - i);
  let d2 = (s * 10) % 11; if (d2 === 10) d2 = 0; n.push(d2);
  return n.join('');
}

// Contrato com public/js/checkout-nu.js:
//   POST { upKey, nome, cpf, email, phone, utms } -> { success, amount, qrcode, txnId }
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ success: false, message: 'Metodo nao permitido' }); return; }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    const produto = resolverProduto(body.upKey);
    if (!produto) { res.status(400).json({ success: false, message: 'Produto invalido.' }); return; }

    const cpf = cpfValido(body.cpf) ? soDigitos(body.cpf) : gerarCpf();
    const nome = String(body.nome || '').trim() || 'Cliente Nubank';
    const email = String(body.email || '').includes('@')
      ? String(body.email).trim()
      : cpf + '@nuapp.checkout';
    const phone = soDigitos(body.phone) || '11999999999';
    const ip = primeiroIp(req);
    const utms = body.utms || {};

    const ref = 'nu-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    const ctx = montarContexto({ produto, nome, email, cpf, phone, ip, utms });
    // Na Blackcat, metadata é string. O contexto da venda (nome, CPF, UTM) viaja
    // empacotado em metadata (string) para reconstruir a order da UTMify depois.
    const arx = empacotarContexto(ref, ctx);

    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const centavos = Math.round(Number(produto.price) * 100);

    const r = await blackcat('/sales/create-sale', {
      method: 'POST',
      body: {
        amount: centavos,
        currency: 'BRL',
        paymentMethod: 'pix',
        pix: { expiresInDays: 1 },
        postbackUrl: 'https://' + host + '/api/webhook',
        externalRef: ref,
        customer: {
          name: nome,
          email,
          phone,
          document: { number: cpf, type: 'cpf' },
        },
        items: [{
          title: produto.name,
          unitPrice: centavos,
          quantity: 1,
          tangible: false,
        }],
        metadata: arx,
        utm_source: utms.utm_source || undefined,
        utm_medium: utms.utm_medium || undefined,
        utm_campaign: utms.utm_campaign || undefined,
        utm_content: utms.utm_content || undefined,
        utm_term: utms.utm_term || undefined,
      },
    });

    // Blackcat retorna: { success, data: { transactionId, status, paymentData: { copyPaste, qrCode, qrCodeBase64 } } }
    const dados = r.dados && r.dados.data;
    const txnId = dados && dados.transactionId;
    const qrcode = extrairPix(r.dados);

    if (!r.ok || !txnId || !qrcode) {
      console.error('Blackcat create falhou', r.statusHttp, JSON.stringify(r.dados).slice(0, 600));
      res.status(200).json({ success: false, message: 'Nao foi possivel gerar o PIX. Tente novamente.' });
      return;
    }

    // PIX gerado -> UTMify 'waiting_payment' (venda pendente). Awaited: em serverless um
    // fire-and-forget morre ao congelar a funcao e a pendente "nao sai".
    try { await enviarOrder({ orderId: txnId, status: 'waiting_payment', ctx }); } catch (e) {}

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ success: true, amount: produto.price, qrcode, txnId });
  } catch (e) {
    console.error('pix handler erro', e);
    res.status(200).json({ success: false, message: 'Erro interno. Tente novamente.' });
  }
};
