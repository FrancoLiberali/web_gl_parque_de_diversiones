function Circulo(radio, discretizacion) {
  this.puntos = [];
  this.normales = [];

  this.crearCirculo = function() {
    var anguloDiscretizacion = 2 * Math.PI / discretizacion;
    for (var angulo = 0; angulo <= 2 * Math.PI; angulo += anguloDiscretizacion) {
      var direccion = vec3.fromValues(Math.cos(angulo), 0.0, Math.sin(angulo));
      this.normales.push(direccion);
      vec3.scale(direccion, direccion, radio);
      this.puntos.push(direccion);
    }
    // El primero otra vez para asegurarnos cerrar el circulo, ya que por cuestiones de floats
    // no lo hace con 2pi
    this.normales.push(vec3.fromValues(1.0, 0.0, 0.0));
    this.puntos.push(vec3.fromValues(radio, 0.0, 0.0));
  };

  this.crearCirculo();
}
