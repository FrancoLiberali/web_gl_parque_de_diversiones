function Montania() {
  Objeto3D.call(this, false); //Objeto3D.call(this, conTapa);

  this.crearMontania = function() {

    //var circulo = new FiguraCarro();
    var figura = new FiguraMontania();
    var recta = new CirculoB();
    //var recta = new RectaEnX(0.0, 1.0);
    var discretizacion = 0.01;

    barrido(
      this.vertex_array,
      this.index_array,
      this.normal_array,
      figura,
      recta,
      discretizacion,
      this.conTapa,
    );
  }
  this.crearMontania();
  this.setupWebGLBuffers();
}
