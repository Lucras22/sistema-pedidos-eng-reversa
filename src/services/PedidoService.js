import { Pedido } from '../models/Pedido.js';
import { ItemPedido } from '../models/ItemPedido.js';
import { Produto } from '../models/Produto.js';
import { DescontoService } from './DescontoService.js';

class PedidoService {
  constructor() {
    this.pedidoAtual = this.criarNovoPedido();
    this.descontoService = new DescontoService();
    this.observers = []; // Mecanismo do Padrão Observer
  }

  // Métodos Factory para criação de objetos
  criarNovoPedido() { return new Pedido(); }
  criarItem(id, nome, preco, qtd) {
    const produto = new Produto(id, nome, preco);
    return new ItemPedido(produto, qtd);
  }

  // Métodos de Inscrição do Observer
  subscribe(observer) { this.observers.push(observer); }
  notify(dados) { this.observers.forEach(obs => obs.update(dados)); }

  adicionarProdutoAoPedido(id, nome, preco, quantidade) {
    const item = this.criarItem(id, nome, preco, quantidade);
    this.pedidoAtual.adicionarItem(item);
    this.notificarMudanca();
  }

  removerProdutoDoPedido(id) {
    this.pedidoAtual.removerItem(id);
    this.notificarMudanca();
  }

  definirDesconto(estrategia) {
    this.descontoService.definirEstrategia(estrategia);
    this.notificarMudanca();
  }

  calcularBruto() {
    return this.pedidoAtual.itens.reduce((acc, item) => acc + item.subtotal, 0);
  }

  calcularTotalComDesconto() {
    const bruto = this.calcularBruto();
    return this.descontoService.aplicarDesconto(bruto);
  }

  notificarMudanca() {
    this.notify({
      itens: this.pedidoAtual.itens,
      total: this.calcularTotalComDesconto()
    });
  }

  gerarLinksWhatsApp(telefoneCliente, telefoneEstabelecimento) {
    let resumo = `*Resumo do Pedido*\n\n`;
    this.pedidoAtual.itens.forEach(item => {
      resumo += `- ${item.quantidade}x ${item.produto.nome} (R$ ${item.subtotal.toFixed(2)})\n`;
    });
    resumo += `\n*Total:* R$ ${this.calcularTotalComDesconto().toFixed(2)}`;

    const textoCodificado = encodeURIComponent(resumo);
    return {
      linkCliente: `https://wa.me/${telefoneCliente}?text=${textoCodificado}`,
      linkEstabelecimento: `https://wa.me/${telefoneEstabelecimento}?text=${textoCodificado}`
    };
  }

  resetarPedido() {
    this.pedidoAtual = this.criarNovoPedido();
    this.notificarMudanca();
  }
}

// Exportado como Singleton (instância única de controle de negócio)
const instanciaUnica = new PedidoService();
Object.freeze(instanciaUnica);
export default instanciaUnica;