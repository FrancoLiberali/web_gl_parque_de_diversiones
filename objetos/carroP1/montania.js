function Montania() {
  Objeto3D.call(this, false); //Objeto3D.call(this, conTapa);

  this.crearMontania = function() {

    //var circulo = new FiguraCarro();
    var figura = new FiguraMontania();
    var recta = new RectaEnY(0.0, 1.0);
    var discretizacion = 0.5;

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
