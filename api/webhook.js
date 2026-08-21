const { blackcat, estaPago } = require('./_blackcat');
const { enviarOrder, desempacotarContexto } = require('./_utmify');

// Fonte de verdade da venda aprovada. A Blackcat chama aqui (postbackUrl) a cada mudança
// de status. Roda no servidor: a venda conta mesmo se o comprador fechar a aba. O status
// do corpo NÃO é confiável (postback por URL não vem assinado): sempre reconsulta a Blackcat
// antes de marcar 'paid'. Sem isso, quem descobrir a URL forja "pago" e envenena a UTMify.
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).end(); return; }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    // Tenta extrair o transactionId de vários formatos possíveis do webhook Blackcat
    const id = body && (
      body.transactionId ||
      (body.data && body.data.transactionId) ||
      body.id ||
      (body.transaction && body.transaction.id)
    );
    if (!id || !/^[a-zA-Z0-9._-]{6,128}$/.test(String(id))) {
      res.status(200).json({ received: true, ignorado: 'id invalido' });
      return;
    }

    // Reconsulta via GET /sales/{id}/status para verificar o status real
    const r = await blackcat('/sales/' + encodeURIComponent(String(id)) + '/status');
    if (!r.ok) { res.status(200).json({ received: true, ignorado: 'consulta falhou' }); return; }

    const status = r.dados && r.dados.data && r.dados.data.status;
    if (!estaPago(status)) {
      res.status(200).json({ received: true, pago: false });
      return;
    }

    // Na Blackcat, metadata é string (arx empacotado). Tenta extrair de metadata ou externalRef.
    const meta = (r.dados && r.dados.data && r.dados.data.metadata) || null;
    const arx = meta || (body && body.metadata) || null;
    const ctx = desempacotarContexto(arx);

    // UTMify 'paid' (venda aprovada). Awaited pelo mesmo motivo do pix.js.
    await enviarOrder({ orderId: String(id), status: 'paid', ctx, approvedAt: Date.now() });

    res.status(200).json({ received: true, pago: true });
  } catch (e) {
    console.error('webhook erro', e);
    res.status(200).json({ received: true });
  }
};
