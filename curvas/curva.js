function Curva(limiteInferior, limiteSuperior) {
  this.parametrizacion = null;
  this.derivada = null;
  this.limiteInferior = limiteInferior;
  this.limiteSuperior = limiteSuperior;

  this.evaluarEn = function(t) {
    if (t <= this.limiteSuperior && t >= limiteInferior) {
      return this.parametrizacion(t);
    } else {
      return null;
    }
  }

  this.derivadaEn = function(t) {
    if (t <= this.limiteSuperior && t >= limiteInferior) {
      return this.derivada(t);
    } else {
      return null;
    }
  }
}
