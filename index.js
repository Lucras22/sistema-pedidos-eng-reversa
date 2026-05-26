import { PedidoController } from './src/controllers/PedidoController.js';
import { PedidoView } from './src/views/pedidoView.js';
import { DescontoPercentual } from './src/services/DescontoService.js';

async function inicializarSistemaMVC() {
  const controller = new PedidoController();
  const view = new PedidoView();

  // Registra a View no controlador (Observer)
  controller.subscribe(view);

  // Simulações que acionam o fluxo do controlador
  controller.adicionarProduto("101", "Pizza Quatro Queijos", 45.00, 1);
  controller.adicionarProduto("102", "Refrigerante 2L", 9.00, 2);

  // Aplica desconto através do Service acionado pelo Controller
  controller.definirEstrategiaDesconto(new DescontoPercentual(15)); // 15% Desconto

  try {
    const resultado = await controller.processarFinalizacao("5588912345678");
    console.log("\n[Resultado do Backend JSON-Server]: Gravado ID:", resultado.pedidoSalvo.id);
    console.log("[Link Loja]: ", resultado.linksWa.linkEstabelecimento);
    console.log("[Link Cliente]: ", resultado.linksWa.linkCliente);
  } catch (erro) {
    console.error("Falha no fluxo:", erro.message);
  }
}

inicializarSistemaMVC();