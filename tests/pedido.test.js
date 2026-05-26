import PedidoFactory from '../src/services/PedidoFactory.js';
import { DescontoPercentual, SemDesconto } from '../src/services/DescontoStrategy.js';

describe('Testes de Negócio do Sistema de Pedidos', () => {
  
  test('Deve calcular o valor bruto total corretamente', () => {
    const pedido = PedidoFactory.createPedido();
    const item1 = PedidoFactory.createItem("1", "Produto A", 10.00, 2); // 20.00
    const item2 = PedidoFactory.createItem("2", "Produto B", 15.50, 2); // 31.00
    
    pedido.adicionarItem(item1);
    pedido.adicionarItem(item2);

    expect(pedido.calcularTotal(new SemDesconto())).toBe(51.00);
  });

  test('Deve aplicar estratégia de desconto percentual com sucesso', () => {
    const pedido = PedidoFactory.createPedido();
    const item = PedidoFactory.createItem("1", "Produto A", 100.00, 1);
    pedido.adicionarItem(item);

    const desconto10Porcento = new DescontoPercentual(10);
    expect(pedido.calcularTotal(desconto10Porcento)).toBe(90.00);
  });
});