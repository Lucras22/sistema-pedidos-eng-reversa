export class ConsoleView {
  // Esse método é acionado automaticamente toda vez que o controller executa 'notify()'
  update(estado) {
    console.clear();
    console.log("=========================================");
    console.log("       MURAL DO PEDIDO (INTERFACE)       ");
    console.log("=========================================");
    if (estado.itens.length === 0) {
      console.log(" Carrinho Vazio.");
    } else {
      estado.itens.forEach(item => {
        console.log(` > ${item.quantidade}x ${item.produto.nome} | Subtotal: R$ ${item.subtotal.toFixed(2)}`);
      });
    }
    console.log("-----------------------------------------");
    console.log(` VALOR TOTAL ATUAL: R$ ${estado.total.toFixed(2)}`);
    console.log("=========================================");
  }
}