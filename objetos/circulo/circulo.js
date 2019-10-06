function Circulo(radio, discretizacion, limite = 2 * Math.PI) {
  this.puntos = [];
  this.normales = [];
  this.limite = limite;

  this.crearCirculo = function() {
    var anguloDiscretizacion = 2 * Math.PI / discretizacion;
    for (var angulo = 0; angulo <= this.limite; angulo += anguloDiscretizacion) {
      var direccion = vec3.fromValues(Math.cos(angulo), 0.0, Math.sin(angulo));
      this.normales.push(direccion);
      vec3.scale(direccion, direccion, radio);
      this.puntos.push(direccion);
    }
    // Nos aseguramos que el limite este, ya que por cuestiones de floats
    // puede no hacerlo con angulo = this.limite
    var direccion = vec3.fromValues(Math.cos(this.limite), 0.0, Math.sin(this.limite));
    this.normales.push(direccion);
    vec3.scale(direccion, direccion, radio);
    this.puntos.push(direccion);
  };

  this.crearCirculo();
}
