function Circulo(radio, discretizacion) {
  this.puntos = [];

  this.crearCirculo = function() {
    var anguloDiscretizacion = 2 * Math.PI / discretizacion;
    for (var angulo = 0; angulo <= 2 * Math.PI; angulo += anguloDiscretizacion) {
      this.puntos.push(vec3.fromValues(radio * Math.cos(angulo), 0.0, radio * Math.sin(angulo)));
    }
    // El primero otra vez para asegurarnos cerrar el circulo, ya que por cuestiones de floats
    // no lo hace con 2pi
    this.puntos.push(vec3.fromValues(radio, 0.0, 0.0));
  };

  this.crearCirculo();
}
