function CirculoB() {
  var t = 5;
  /*var p0 = vec3.fromValues(t, 0.0, 0.0);
  var p1 = vec3.fromValues(-t, 0.0, 0.0);
  var p2 = vec3.fromValues(0.0, 0.0, t);
  var p3 = vec3.fromValues(t, 0.0, 0.0);
  var p4 = vec3.fromValues(-t, 0.0, 0.0);
  var p5 = vec3.fromValues(0.0, 0.0, t);
  var p6 = vec3.fromValues(t, 0.0, 0.0);
  var p7 = vec3.fromValues(-t, 0.0, 0.0);
  */
  var p0 = vec3.fromValues(t, 0.0, 0.0);
  var p1 = vec3.fromValues(-t, 0.0, 0.0);
  var p2 = vec3.fromValues(0.0, t, 0.0);
  var p3 = vec3.fromValues(t, 0.0, 0.0);
  var p4 = vec3.fromValues(-t, 0.0, 0.0);
  var p5 = vec3.fromValues(0.0, t, 0.0);
  var p6 = vec3.fromValues(t, 0.0, 0.0);
  var p7 = vec3.fromValues(-t, 0.0, 0.0);
  
  this.pts = [p0, p1, p2, p3, p4, p5, p6, p7];


  BSpline.call(this, this.pts);

  this.puntos = [];
  this.normales = [];
  this.limite = this.cantidadDeCurvas;
  this.centro = vec3.fromValues(0.0, 0.5, 0.0);
  
  this.crearCirculo = function(discretizacion) {
    for(var i = 0; i <= this.limite; i+= discretizacion){
      this.puntos.push(this.parametrizacion(i));
      this.normales.push(this.parametrizacion(i));
    }
  }
  this.cantidadDePuntos = function() {
    return this.puntos.length;
  };
  this.crearCirculo(0.01);
}