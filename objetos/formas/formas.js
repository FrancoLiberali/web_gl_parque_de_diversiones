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
function CirculoB() {
  Forma.call(this);

  var t = 8.0;
  var h = 2.0;
/*
  var p0 = vec3.fromValues(t, 0.0, 0.0);
  var p1 = vec3.fromValues(-t, 0.0, 0.0);
  var p2 = vec3.fromValues(0.0, 0.0, t);
  var p3 = vec3.fromValues(t, 0.0, 0.0);
  var p4 = vec3.fromValues(-t, 0.0, 0.0);
*/
  
  var p0 = vec3.fromValues(0.0, -t, h/3);
  var p1 = vec3.fromValues(0.0, t, -h/2);
  var p2 = vec3.fromValues(-t, 0.0, 1.5*h);

  var p3 = vec3.fromValues(0.0, -t, h/3);
  var p4 = vec3.fromValues(0.0, t, -h/2);
  var p5 = vec3.fromValues(-t, 0.0, h/2);
  var p6 = vec3.fromValues(0.0, -t, h/3);
  var p7 = vec3.fromValues(0.0, t, -h/2);
  
  this.pts = [p0, p1, p2, p0, p1, p2]//, p1, p2];


  BSpline.call(this, this.pts);

  this.limite = this.cantidadDeCurvas;
  this.centro = vec3.fromValues(0.0, 0.5, 0.0);
  
  this.crearCirculo = function(discretizacion) {
    for(var i = 0; i <= this.limite; i+= discretizacion){
      this.puntos.push(this.parametrizacion(i));
      this.normales.push(this.parametrizacion(i));
    }
  }
  this.crearCirculo(0.01);
}