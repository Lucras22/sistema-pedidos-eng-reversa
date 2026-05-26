import { Pedido } from '../models/Pedido.js';
import { ItemPedido } from '../models/ItemPedido.js';
import { Produto } from '../models/Produto.js';

class PedidoFactory {
  createPedido() {
    return new Pedido();
  }

  createItem(idProd, nomeProd, precoProd, qtd) {
    const produto = new Produto(idProd, nomeProd, precoProd);
    return new ItemPedido(produto, qtd);
  }
}

// Exporta como Singleton garantindo uma única instância da Factory se necessário
const instancia = new PedidoFactory();
Object.freeze(instancia);
export default instancia;