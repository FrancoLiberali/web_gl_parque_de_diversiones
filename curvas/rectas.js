function RectaEnY(limiteInferior, limiteSuperior) {
  Curva.call(this, limiteInferior, limiteSuperior);

  this.parametrizacion = function(t) {
    return vec3.fromValues(0, t, 0);
  };

  this.derivada = function(t) {
    return vec3.fromValues(0, 1, 0);
  };
}

function RectaEnX(limiteInferior, limiteSuperior) {
  Curva.call(this, limiteInferior, limiteSuperior);

  this.parametrizacion = function(t) {
    return vec3.fromValues(t, 0, 0);
  };

  this.derivada = function(t) {
    return vec3.fromValues(1, 0, 0);
  };
}
