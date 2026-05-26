export class PedidoRepository {
  constructor() {
    this.apiUrl = 'http://localhost:3000/pedidos';
  }

  async salvar(pedido, strategyDesconto = null) {
    const payload = {
      id: pedido.id || Date.now().toString(),
      itens: pedido.itens.map(i => ({
        produto: { id: i.produto.id, nome: i.produto.nome, preco: i.produto.preco },
        quantidade: i.quantidade
      })),
      total: pedido.calcularTotal(strategyDesconto),
      status: pedido.status
    };

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return await response.json();
  }

  async listarTodos() {
    const response = await fetch(this.apiUrl);
    return await response.json();
  }
}