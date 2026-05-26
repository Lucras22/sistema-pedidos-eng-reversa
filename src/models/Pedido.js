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
}