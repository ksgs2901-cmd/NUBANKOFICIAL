// Cliente da API Blackcat Payment (checkout PIX).
// Doc: https://docs.blackcatoficial.com  — base https://api.blackcatoficial.com/api
//
// Particularidades da API Blackcat:
//   - auth em UM header: `X-API-Key` com a chave crua (sem "Bearer").
//   - valores em CENTAVOS. R$ 99,90 = 9990.
//   - o PIX volta SÍNCRONO no POST /sales/create-sale (HTTP 201), já com
//     paymentData.copyPaste (copia-e-cola) e paymentData.qrCodeBase64.
//   - resposta envelopada em { success, data: { transactionId, status, paymentData, ... } }.
//   - status pago = "PAID". Outros: PENDING, CANCELLED, REFUNDED.
const BASE = 'https://api.blackcatoficial.com/api';

function chave() {
  const k = process.env.BLACKCAT_API_KEY;
  if (!k) throw new Error('BLACKCAT_API_KEY ausente');
  return k;
}

async function blackcat(path, { method = 'GET', body } = {}) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'X-API-Key': chave(),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const texto = await res.text();
  let json;
  try { json = texto ? JSON.parse(texto) : {}; } catch { json = { raw: texto }; }
  return { ok: res.ok, statusHttp: res.status, dados: json };
}

// Único ponto que decide se uma transação está paga.
// Blackcat usa "PAID" (uppercase), mas checamos case-insensitive por segurança.
function estaPago(status) {
  return String(status || '').toUpperCase() === 'PAID';
}

// Extrai o código copia-e-cola PIX da resposta da Blackcat.
// Na criação: dados.data.paymentData.copyPaste ou .qrCode
// Na consulta: dados.data (pode não ter paymentData)
// Cobre os dois cenários.
function extrairPix(o) {
  o = o || {};
  // Resposta da criação: { success, data: { paymentData: { copyPaste, qrCode, qrCodeBase64 } } }
  const d = o.data || o;
  const pd = d.paymentData || d.pix || {};
  return pd.copyPaste || pd.qrCode || pd.qrcode || pd.pix_qrcode_text || null;
}

module.exports = { blackcat, estaPago, extrairPix, BASE };
