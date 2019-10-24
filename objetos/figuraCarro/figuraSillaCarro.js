function FiguraSillaCarro() {

  var p0 = vec3.fromValues(0.0, 0.0, 0.125);
  var p1 = vec3.fromValues(0.333, 0.0, 0.125);
  var p2 = vec3.fromValues(0.66, 0.0,  0.125);
  var p3 = vec3.fromValues(1.0, 0.0, 0.125);

  var p4 = vec3.fromValues(1.0, 0.0, 0.333);
  var p5 = vec3.fromValues(1.0, 0.0, 0.666);
  var p6 = vec3.fromValues(1.0, 0.0, 1.3);
  
  var p7 = vec3.fromValues(0.917, 0.0, 1.3);
  var p8 = vec3.fromValues(0.834, 0.0, 1.3);
  var p9 = vec3.fromValues(0.75, 0.0, 1.3);
  
  var p10 = vec3.fromValues(0.75, 0.0, 0.666);
  var p11 = vec3.fromValues(0.75, 0.0, 0.333);
  var p12 = vec3.fromValues(0.75, 0.0, 0.25);
  
  var p13 = vec3.fromValues(0.5, 0.0, 0.25);
  var p14 = vec3.fromValues(0.25, 0.0, 0.25);
  var p15 = vec3.fromValues(0.0, 0.0, 0.25);
  
  var p16 = vec3.fromValues(0.0, 0.0, 0.2);
  var p17 = vec3.fromValues(0.0, 0.0, 0.125)
  var p18 = vec3.fromValues(0.0, 0.0, 0.125);

  this.pts = [p0, p1, p2, p3, p4, p5, p6, p7 ,p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18];

  
  Bezier.call(this, this.pts);

  this.puntos = [];
  this.normales = [];
  this.limite = this.cantidadDeCurvas;
  this.centro = vec3.fromValues(1.0, 0.0, 0.125);

  this.cantidadDePuntos = function() {
    return this.puntos.length;
  };
  
  this.crearSillaCarro = function(discretizacion) {
    for(var i = 0; i <= this.limite; i+= discretizacion){
      this.puntos.push(this.parametrizacion(i));
      this.normales.push(this.parametrizacion(i));
    }
  }
  this.crearSillaCarro(0.05);
}