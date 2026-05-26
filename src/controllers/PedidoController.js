import PedidoFactory from '../services/PedidoFactory.js';
import { PedidoRepository } from '../repositories/PedidoRepository.js';
import { WhatsAppService } from '../services/WhatsAppService.js';
import { Subject } from '../services/Observer.js';

export class PedidoController extends Subject {
  constructor() {
    super();
    this.repository = new PedidoRepository();
    this.whatsappService = new WhatsAppService('5588999999999'); // Telefone fictício da loja
    this.pedidoAtual = PedidoFactory.createPedido();
    this.descontoAtual = null;
  }

  adicionarProduto(id, nome, preco, quantidade) {
    const novoItem = PedidoFactory.createItem(id, nome, preco, quantidade);
    this.pedidoAtual.adicionarItem(novoItem);
    // Notifica os Observers (Views) que o estado mudou
    this.notify(this.obterEstadoAtual());
  }

  removerProduto(id) {
    this.pedidoAtual.removerItem(id);
    this.notify(this.obterEstadoAtual());
  }

  definirDesconto(strategyDesconto) {
    this.descontoAtual = strategyDesconto;
    this.notify(this.obterEstadoAtual());
  }

  obterEstadoAtual() {
    return {
      itens: this.pedidoAtual.itens,
      total: this.pedidoAtual.calcularTotal(this.descontoAtual)
    };
  }

  async finalizarPedido(telefoneCliente) {
    if (this.pedidoAtual.itens.length === 0) {
      throw new Error("Não é possível fechar um pedido vazio.");
    }
    
    // Salva no JSON Server via Repositório
    const pedidoSalvo = await this.repository.salvar(this.pedidoAtual, this.descontoAtual);
    
    // Gera links do WhatsApp
    const linksWa = this.whatsappService.gerarLinkWhatsapp(this.pedidoAtual, telefoneCliente, this.descontoAtual);
    
    // Reseta o pedido atual para o próximo
    this.pedidoAtual = PedidoFactory.createPedido();
    this.notify(this.obterEstadoAtual());

    return { pedidoSalvo, linksWa };
  }
}