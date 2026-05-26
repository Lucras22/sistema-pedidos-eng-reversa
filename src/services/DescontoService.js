// Estruturas de estratégia para cálculo de descontos
export class SemDesconto {
  calcular(valorBruto) { return valorBruto; }
}

export class DescontoPercentual {
  constructor(porcentagem) {
    this.porcentagem = porcentagem;
  }
  calcular(valorBruto) {
    return valorBruto * (1 - this.porcentagem / 100);
  }
}

export class DescontoService {
  constructor() {
    this.estrategia = new SemDesconto();
  }

  definirEstrategia(novaEstrategia) {
    this.estrategia = novaEstrategia;
  }

  aplicarDesconto(valorBruto) {
    return this.estrategia.calcular(valorBruto);
  }
}