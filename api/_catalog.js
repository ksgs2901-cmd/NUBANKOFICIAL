// Catálogo autoritativo de preços. O valor NUNCA vem do browser: o front manda
// só o upKey ('up1'...'up4') e o preço é resolvido aqui. Espelha PIX_PRODUCTS de
// public/js/checkout-nu.js (front). Manter em sincronia.
const PIX_PRODUCTS = {
  up1: { price: 19.93, name: 'IOF - Imposto sobre Operações Financeiras' },
  up2: { price: 29.90, name: 'Seguro Prestamista - Tarifa de Cadastro' },
  up3: { price: 19.00, name: 'Tarifa de Ativação do Aplicativo' },
  up4: { price: 50.00, name: 'Taxa de Verificação de Conta' },
};

function resolverProduto(upKey) {
  const k = String(upKey || '').trim();
  return PIX_PRODUCTS[k] ? { upKey: k, ...PIX_PRODUCTS[k] } : null;
}

module.exports = { PIX_PRODUCTS, resolverProduto };
