export class PedidoRepository {
  constructor() {
    this.apiUrl = 'http://localhost:3000/pedidos';
  }

  async salvarPedido(pedido, total) {
    const payload = {
      id: Date.now().toString(),
      itens: pedido.itens.map(i => ({
        produto: { id: i.produto.id, nome: i.produto.nome, preco: i.produto.preco },
        quantidade: i.quantidade
      })),
      total: total,
      status: pedido.status,
      dataCriacao: new Date().toISOString()
    };

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await response.json();
  }
}