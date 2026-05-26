import { PedidoController } from './src/controllers/PedidoController.js';
import { ConsoleView } from './src/views/ConsoleView.js';
import { DescontoPercentual } from './src/services/DescontoStrategy.js';

async function rodarSistema() {
  console.log("Iniciando fluxo controlado do sistema...");
  
  // Instancia Controladora e Visão
  const controller = new PedidoController();
  const tela = new ConsoleView();

  // Registra a View para observar as atualizações do Controller (Observer Pattern)
  controller.subscribe(tela);

  // 1. Simula Adição de Itens (Interface atualiza automaticamente a cada chamada)
  controller.adicionarProduto("1", "Hambúrguer Artesanal", 29.90, 2);
  controller.adicionarProduto("2", "Batata Frita", 12.00, 1);
  
  // 2. Aplicando Desconto de 10% (Strategy Pattern)
  controller.definirDesconto(new DescontoPercentual(10));

  // 3. Removendo um item
  controller.removerProduto("2");

  // 4. Finalizando o pedido (Envia para API Fake e gera links WhatsApp)
  try {
    console.log("\n[Enviando dados para o Servidor e Gerando Comunicação...]");
    const resultado = await controller.finalizarPedido("5588988888888");
    
    console.log("\nPedido persistido com sucesso no JSON Server!");
    console.log("Link para o Estabelecimento:", resultado.linksWa.linkEstabelecimento);
    console.log("Link para o Cliente:", resultado.linksWa.linkCliente);
  } catch (error) {
    console.error("Erro ao finalizar:", error.message);
  }
}

rodarSistema();