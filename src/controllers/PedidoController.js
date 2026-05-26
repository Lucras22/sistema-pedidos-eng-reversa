import PedidoService from '../services/PedidoService.js';
import { PedidoRepository } from '../repositories/PedidoRepository.js';

export class PedidoController {
  constructor() {
    this.service = PedidoService;
    this.repository = new PedidoRepository();
  }

  // Intercepta ações vindas da interface (View)
  actionAdicionarItem(id, nome, preco, quantidade) {
    this.service.adicionarProdutoAoPedido(id, nome, preco, quantidade);
  }

  actionRemoverItem(id) {
    this.service.removerProdutoDoPedido(id);
  }

  actionAplicarDesconto(estrategiaDesconto) {
    this.service.definirDesconto(estrategiaDesconto);
  }

  async actionFinalizarPedido(telefoneCliente) {
    if (this.service.pedidoAtual.itens.length === 0) {
      throw new Error("Não é possível fechar um pedido sem itens.");
    }

    const total = this.service.calcularTotalComDesconto();
    const pedidoSalvo = await this.repository.salvarPedido(this.service.pedidoAtual, total);
    
    const linksWa = this.service.gerarLinksWhatsApp(telefoneCliente, '5588999999999');
    
    this.service.resetarPedido();
    return { pedidoSalvo, linksWa };
  }
}