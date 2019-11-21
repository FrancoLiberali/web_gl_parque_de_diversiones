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

  var p0 = vec3.fromValues(-t, 0.0, 0.2);
  var pt = vec3.fromValues(-t+0.5, 0.0, 0.2);
  var p1 = vec3.fromValues(-t/2, -3*t/2, (5/2)*h);
  var p2 = vec3.fromValues(0.0, 0.0, h*3);
  var p3 = vec3.fromValues(t/2, 3*t/2, (5/2)*h);
  var p4 = vec3.fromValues(t, 0.0, 0.2);
  
  var p5 = vec3.fromValues(t/2, -t/2, h/2);
  var p6 = vec3.fromValues(0.0, 0.0, 0.0);
  var p7 = vec3.fromValues(-t/2, t/2, 0.0);
  var p8 = vec3.fromValues(-t, 0.0, 0.0);

  var p00 = vec3.fromValues(0.0, -t, h/3);
  var p01 = vec3.fromValues(0.0, t, -h/2);
  var p02 = vec3.fromValues(-t, t, 1.5*h);
  var p03 = vec3.fromValues(-t, -t, h/3);
  var p04 = vec3.fromValues(0.0, t, -h/2);
  var p05 = vec3.fromValues(-t, 0.0, h/2);
  var p06 = vec3.fromValues(0.0, -t, h/3);
  var p07 = vec3.fromValues(0.0, t, -h/2);

  var p10 = vec3.fromValues(-4.5, 9.0, 0.2);
  var p11 = vec3.fromValues(1.0, 10.0, 0.2);
  var p12 = vec3.fromValues(5.3, 8.75, 0.2);
  var p13 = vec3.fromValues(8.5, 7.9, 0.2);
  var p14 = vec3.fromValues(6.0, 11.0, 0.2);
  var p15 = vec3.fromValues(13.5, 4.0, 0.2);
  var p16 = vec3.fromValues(12.0, 1.0, 0.3);
  var p17 = vec3.fromValues(10.0, 0, 0.7);
  var p18 = vec3.fromValues(8.5, -1.0, 1.0);
  var p19 = vec3.fromValues(5.0, -1.0, 3.0);
  var p110 = vec3.fromValues(2.3, 0.5, 5.0);
  var p111 = vec3.fromValues(-1.2, 0.0, 10.0);
  var p112 = vec3.fromValues(-4.5, -2.75, 12.0);
  var p113 = vec3.fromValues(-5.5, -5.2, 14.0);
  var p114 = vec3.fromValues(-6.0, -8.8, 3.5);
  var p115 = vec3.fromValues(-6.5, -12.5, 2.5);
  var p116 = vec3.fromValues(-7.0, -15.5, 2.5);
  var p117 = vec3.fromValues(-7.5, -18.75, 2.0);
  var p118 = vec3.fromValues(-8.0, -22.0, 0.5);
  var p119 = vec3.fromValues(-5.5, -24.0, 0.2);
  var p120 = vec3.fromValues(-3.0, -24.5, 0.5);
  var p121 = vec3.fromValues(0.5, -24.0, 1.0);
  var p122 = vec3.fromValues(2.5, -21.5, 2.0);
  var p123 = vec3.fromValues(3.0, -18.0, 5.0);
  var p124 = vec3.fromValues(3.2, -15.0, 5.0);
  var p125 = vec3.fromValues(3.5, -11.5, 4.0);
  var p126 = vec3.fromValues(3.0, -8.25, 2.5);
  var p127 = vec3.fromValues(1.8, -5.2, 1.5);
  var p128 = vec3.fromValues(0.0, -2.4, 0.8);
  var p129 = vec3.fromValues(-1.2, 0.0, 0.2);
  var p130 = vec3.fromValues(-3.0, 2.5, 0.2);
  var p131 = vec3.fromValues(-4.9, 6.0, 0.2);
  

  var pista2 = [p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p110,p111,p112,p113,p114,p115,p116,p117,p118,p119,p120,p121,p122,p123,p124,p125,p126,p127,p128,p129,p130,p131,p10,p11,p12];

  
  var pista0 = [p00, p01, p02, p03, p00, p01, p02];
  var pista1 = [p8,pt,pt, p1, p2, p3, p4, p5, p6, p7, p8,p8,pt,pt];
  this.pistas = [pista0, pista1, pista2];
  this.pts = this.pistas[app.pista];

  BSpline.call(this, this.pts);

  this.limite = this.cantidadDeCurvas;
  this.centro = vec3.fromValues(0.0, 0.5, 0.0);
  
  this.crearCirculo = function(discretizacion) {
    for(var i = 0; i <= this.limite; i+= discretizacion){
      this.puntos.push(this.parametrizacion(i));
      this.normales.push(this.parametrizacion(i));
    }
  }
  this.crearCirculo(0.2);
}