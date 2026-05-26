export class WhatsAppService {
  constructor(telefoneEstabelecimento) {
    this.telefoneEstabelecimento = telefoneEstabelecimento;
  }

  gerarLinkWhatsapp(pedido, telefoneCliente, strategyDesconto = null) {
    let resumo = `*Resumo do Pedido*\n\n`;
    pedido.itens.forEach(item => {
      resumo += `- ${item.quantidade}x ${item.produto.nome} (R$ ${item.subtotal.toFixed(2)})\n`;
    });
    resumo += `\n*Total:* R$ ${pedido.calcularTotal(strategyDesconto).toFixed(2)}`;
    
    const textoCodificado = encodeURIComponent(resumo);
    
    // Links wa.me para o cliente e estabelecimento conforme solicitado
    const linkEstabelecimento = `https://wa.me/${this.telefoneEstabelecimento}?text=${textoCodificado}`;
    const linkCliente = `https://wa.me/${telefoneCliente}?text=${textoCodificado}`;
    
    return { linkEstabelecimento, linkCliente, textoResumo: resumo };
  }
}