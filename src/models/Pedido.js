export class Pedido {
  constructor() {
    this.id = null;
    this.itens = [];
    this.status = 'Aberto';
  }

  adicionarItem(item) {
    this.itens.push(item);
  }

  removerItem(produtoId) {
    this.itens = this.itens.filter(item => item.produto.id !== produtoId);
  }

  calcularTotal(strategyDesconto = null) {
    const bruto = this.itens.reduce((soma, item) => soma + item.subtotal, 0);
    if (strategyDesconto) {
      return strategyDesconto.calcular(bruto);
    }
    return bruto;
  }
}