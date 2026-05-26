export class ItemPedido {
  constructor(produto, quantidade) {
    this.produto = produto; // Instância de Produto
    this.quantidade = parseInt(quantidade);
  }

  get subtotal() {
    return this.produto.preco * this.quantidade;
  }
}