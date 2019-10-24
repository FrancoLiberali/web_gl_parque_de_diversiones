function FiguraMontania() {



  var p0 = vec3.fromValues(-1.0, 0.0, 1.0);
  var p1 = vec3.fromValues(-0.5, 0.0, 0.875);
  var p2 = vec3.fromValues(-0.7, 0.0,  0.2);
  var p3 = vec3.fromValues(0.0, 0.0, 0.2);

  var p4 = vec3.fromValues(0.7, 0.0, 0.2);
  var p5 = vec3.fromValues(0.5, 0.0, 0.875);
  var p6 = vec3.fromValues(1.0, 0.0, 1.0);
  
  var p7 = vec3.fromValues(1.0, 0.0, 1.25);
  var p8 = vec3.fromValues(1.0, 0.0, 1.6);
  var p9 = vec3.fromValues(0.75, 0.0, 1.5);
  
  var p10 = vec3.fromValues(0.75, 0.0, 1.4);
  var p11 = vec3.fromValues(0.75, 0.0, 1.3);
  var p12 = vec3.fromValues(0.75, 0.0, 1.22);
  
  var p13 = vec3.fromValues(0.25, 0.0, 1.20);
  var p14 = vec3.fromValues(0.5, 0.0, 1.1);
  var p15 = vec3.fromValues(0.0, 0.0, 0.9);
  
  var p16 = vec3.fromValues(-0.5, 0.0, 1.1);
  var p17 = vec3.fromValues(-0.25, 0.0, 1.2)
  var p18 = vec3.fromValues(-0.75, 0.0, 1.30);

  var p19 = vec3.fromValues(-0.75, 0.0, 1.22);
  var p20 = vec3.fromValues(-0.75, 0.0, 1.3)
  var p21 = vec3.fromValues(-0.75, 0.0, 1.5);

  var p22 = vec3.fromValues(-1.0, 0.0, 1.6);
  var p23 = vec3.fromValues(-1.0, 0.0, 1.0);
  var p24 = vec3.fromValues(-1.0, 0.0, 1.0);

  p0 = vec3.scale(p0,p0,.25);
  p1 = vec3.scale(p1,p1,.25);
  p2 = vec3.scale(p2,p2,.25);
  p3 = vec3.scale(p3,p3,.25);

  p4 = vec3.scale(p4,p4,.25);
  p5 = vec3.scale(p5,p5,.25);
  p6 = vec3.scale(p6,p6,.25);
  
  p7 = vec3.scale(p7,p7,.25);
  p8 = vec3.scale(p8,p8,.25);
  p9 = vec3.scale(p9,p9,.25);
  
  p10 = vec3.scale(p10,p10,.25);
  p11 = vec3.scale(p11,p11,.25);
  p12 = vec3.scale(p12,p12,.25);

  p13 = vec3.scale(p13,p13,.25);
  p14 = vec3.scale(p14,p14,.25);
  p15 = vec3.scale(p15,p15,.25);
  
  p16 = vec3.scale(p16,p16,.25);
  p17 = vec3.scale(p17,p17,.25);
  p18 = vec3.scale(p18,p18,.25);

  p19 = vec3.scale(p19,p19,.25);
  p20 = vec3.scale(p20,p20,.25);
  p21 = vec3.scale(p21,p21,.25);

  p22 = vec3.scale(p22,p22,.25);
  p23 = vec3.scale(p23,p23,.25);
  p24 = vec3.scale(p24,p24,.25);
/*
  p0 = vec3.rotateZ(p0,p0,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p1 = vec3.rotateZ(p1,p1,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p2 = vec3.rotateZ(p2,p2,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p3 = vec3.rotateZ(p3,p3,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);

  p4 = vec3.rotateZ(p4,p4,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p5 = vec3.rotateZ(p5,p5,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p6 = vec3.rotateZ(p6,p6,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  
  p7 = vec3.rotateZ(p7,p7,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p8 = vec3.rotateZ(p8,p8,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p9 = vec3.rotateZ(p9,p9,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  
  p10 = vec3.rotateZ(p10,p10,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p11 = vec3.rotateZ(p11,p11,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p12 = vec3.rotateZ(p12,p12,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);

  p13 = vec3.rotateZ(p13,p13,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p14 = vec3.rotateZ(p14,p14,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p15 = vec3.rotateZ(p15,p15,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  
  p16 = vec3.rotateZ(p16,p16,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p17 = vec3.rotateZ(p17,p17,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p18 = vec3.rotateZ(p18,p18,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);

  p19 = vec3.rotateZ(p19,p19,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p20 = vec3.rotateZ(p20,p20,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p21 = vec3.rotateZ(p21,p21,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);

  p22 = vec3.rotateZ(p22,p22,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p23 = vec3.rotateZ(p23,p23,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
  p24 = vec3.rotateZ(p24,p24,vec3.fromValues(0.0,0.0,0.0),Math.PI/2);
*/
  this.pts = [p0, p1, p2, p3, p4, p5, p6, p7 ,p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24];

  Bezier.call(this, this.pts);

  this.puntos = [];
  this.normales = [];
  this.limite = this.cantidadDeCurvas;
  this.centro = vec3.fromValues(0.0, 0.0, 0.3);

  this.crearMontania = function(discretizacion) {
    for(var i = 0; i <= this.limite; i+= discretizacion){
      this.puntos.push(this.parametrizacion(i));
      this.normales.push(this.parametrizacion(i));
    }
  }
  this.cantidadDePuntos = function() {
    return this.puntos.length;
  };
  
  this.crearMontania(0.05);
}