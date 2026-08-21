// Envio de vendas para a UTMify (Orders API): POST /api-credentials/orders, header `x-api-token`.
// Sem token, faz skip silencioso. Dispara 'waiting_payment' na geração do PIX (venda pendente)
// e 'paid' quando a Blackcat confirma (venda aprovada).
const ENDPOINT = 'https://api.utmify.com.br/api-credentials/orders';

// A Blackcat devolve o metadata na consulta e no webhook como string.
// Como não há banco, o contexto da venda viaja empacotado em metadata (base64url).
function empacotarContexto(ref, ctx) {
  const b64 = Buffer.from(JSON.stringify(ctx), 'utf8').toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const externalId = ref + '.' + b64;
  return externalId.length > 1600 ? ref : externalId;
}

function desempacotarContexto(externalId) {
  try {
    const ponto = String(externalId || '').indexOf('.');
    if (ponto === -1) return null;
    const b64 = externalId.slice(ponto + 1).replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
  } catch { return null; }
}

function dataUtc(d) { return new Date(d).toISOString().slice(0, 19).replace('T', ' '); }
function corta(v, max) { return (v === undefined || v === null || v === '') ? null : String(v).slice(0, max); }

async function enviarOrder({ orderId, status, ctx, approvedAt, isTest = false }) {
  const token = process.env.UTMIFY_API_TOKEN;
  if (!token) { console.warn('UTMIFY_API_TOKEN ausente, order nao enviada'); return { ok: false, motivo: 'sem-token' }; }
  if (!ctx) { console.warn('contexto ausente para', orderId); return { ok: false, motivo: 'sem-contexto' }; }

  const centavos = Math.round(Number(ctx.p) * 100);
  const body = {
    orderId,
    platform: 'Blackcat',
    paymentMethod: 'pix',
    status, // 'waiting_payment' na geracao, 'paid' so quando a Blackcat diz paid
    createdAt: dataUtc(ctx.t),
    approvedDate: status === 'paid' ? dataUtc(approvedAt || Date.now()) : null,
    refundedAt: null,
    customer: {
      name: ctx.n, email: ctx.e,
      phone: ctx.ph || null, document: ctx.d || null,
      country: 'BR', ip: ctx.ip || undefined,
    },
    products: [{
      id: ctx.k || 'nuapp',
      name: ctx.pn,
      planId: null, planName: ctx.pn,
      quantity: 1, priceInCents: centavos,
    }],
    trackingParameters: {
      src: ctx.src || null, sck: ctx.sck || null,
      utm_source: ctx.us || null, utm_campaign: ctx.uc || null,
      utm_medium: ctx.um || null, utm_content: ctx.uct || null,
      utm_term: ctx.ut || null,
    },
    commission: {
      totalPriceInCents: centavos,
      gatewayFeeInCents: 0,
      userCommissionInCents: centavos,
    },
    isTest,
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'x-api-token': token, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const texto = await res.text();
    if (!res.ok) console.error('UTMify recusou', res.status, texto.slice(0, 400));
    else console.log('UTMify ok', status, orderId);
    return { ok: res.ok, statusHttp: res.status };
  } catch (e) {
    console.error('UTMify erro de rede', e);
    return { ok: false, motivo: 'rede' };
  }
}

// ctx compacto (metadata.arx tem limite). Guarda produto, cliente, UTMs e IP.
function montarContexto({ produto, nome, email, cpf, phone, ip, utms }) {
  const u = utms || {};
  return {
    t: Date.now(),
    p: produto.price, pn: produto.name, k: produto.upKey,
    n: corta(nome, 80), e: corta(email, 100),
    ph: corta(phone, 20), d: corta(cpf, 20), ip: ip || null,
    us: corta(u.utm_source, 150), uc: corta(u.utm_campaign, 200),
    um: corta(u.utm_medium, 200), uct: corta(u.utm_content, 200),
    ut: corta(u.utm_term, 150),
    src: corta(u.src, 100), sck: corta(u.sck, 100),
  };
}

module.exports = { enviarOrder, empacotarContexto, desempacotarContexto, montarContexto };
