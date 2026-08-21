const { blackcat, estaPago } = require('./_blackcat');

// Contrato com public/js/checkout-nu.js: GET /api/status?id=<txnId> -> { paid, status }.
// Serve só a tela de sucesso do comprador; quem contabiliza a venda é o webhook.
module.exports = async function handler(req, res) {
  try {
    const id = (req.query && req.query.id) || '';
    if (!id || !/^[a-zA-Z0-9._-]{6,128}$/.test(String(id))) {
      res.status(200).json({ paid: false, status: 'invalid' });
      return;
    }

    // Blackcat: GET /sales/{transactionId}/status
    const r = await blackcat('/sales/' + encodeURIComponent(String(id)) + '/status');
    res.setHeader('Cache-Control', 'no-store');
    if (!r.ok) { res.status(200).json({ paid: false, status: 'unknown' }); return; }

    // Resposta: { success, data: { transactionId, status, ... } }
    const status = r.dados && r.dados.data && r.dados.data.status;
    res.status(200).json({ paid: estaPago(status), status: status || 'unknown' });
  } catch (e) {
    console.error('status handler erro', e);
    res.status(200).json({ paid: false, status: 'error' });
  }
};
