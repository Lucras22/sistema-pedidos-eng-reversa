export class PedidoView {
  // Chamado automaticamente pelo PedidoService (Observer) ao detectar alterações de estado
  update(dadosDoEstado) {
    console.clear();
    console.log("====================================================");
    console.log("          PAINEL DE PEDIDOS (VIEW MVC TRADICIONAL)  ");
    console.log("====================================================");
    
    if (dadosDoEstado.itens.length === 0) {
      console.log(" [Carrinho atualmente vazio]");
    } else {
      dadosDoEstado.itens.forEach(item => {
        console.log(` -> ${item.quantidade}x ${item.produto.nome} (Preço un: R$ ${item.produto.preco.toFixed(2)}) | Subtotal: R$ ${item.subtotal.toFixed(2)}`);
      });
    }

    console.log("----------------------------------------------------");
    console.log(` VALOR TOTAL ATUALIZADO: R$ ${dadosDoEstado.total.toFixed(2)}`);
    console.log("====================================================");
  }
}