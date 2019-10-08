function Forma() {
  this.puntos = [];
  this.normales = [];
  this.centro = null;

  this.cantidadDePuntos = function() {
    return this.puntos.length;
  };
}

function Circulo(radio, discretizacion, limite = 2 * Math.PI) {
  Forma.call(this);

  this.limite = limite;
  this.centro = vec3.fromValues(0.0, 0.0, 0.0);

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

function Cuadrado(lado) {
  Forma.call(this);

  this.centro = vec3.fromValues(lado / 2, 0.0, lado / 2);

  this.crearCuadrado = function() {
    this.puntos = [
      // duplicados para definir dos normales en cada esquina
      vec3.fromValues(0.0, 0.0, 0.0),
      vec3.fromValues(0.0, 0.0, lado),
      vec3.fromValues(0.0, 0.0, lado),
      vec3.fromValues(lado, 0.0, lado),
      vec3.fromValues(lado, 0.0, lado),
      vec3.fromValues(lado, 0.0, 0.0),
      vec3.fromValues(lado, 0.0, 0.0),
      vec3.fromValues(0.0, 0.0, 0.0),
    ]

    this.normales = [
      vec3.fromValues(-1.0, 0.0, 0.0),
      vec3.fromValues(-1.0, 0.0, 0.0),
      vec3.fromValues(0.0, 0.0, 1.0),
      vec3.fromValues(0.0, 0.0, 1.0),
      vec3.fromValues(1.0, 0.0, 0.0),
      vec3.fromValues(1.0, 0.0, 0.0),
      vec3.fromValues(0.0, 0.0, -1.0),
      vec3.fromValues(0.0, 0.0, -1.0),
    ]
  };

  this.crearCuadrado();
}
