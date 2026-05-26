// Interface/Classe Base
export class DescontoStrategy {
  calcular(valorBruto) {
    return valorBruto;
  }
}

export class SemDesconto extends DescontoStrategy {
  calcular(valorBruto) {
    return valorBruto;
  }
}

export class DescontoPercentual extends DescontoStrategy {
  constructor(porcentagem) {
    super();
    this.porcentagem = porcentagem;
  }

  calcular(valorBruto) {
    return valorBruto * (1 - this.porcentagem / 100);
  }
}