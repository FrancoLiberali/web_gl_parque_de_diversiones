function ExtremoCarro() {
  Objeto3D.call(this, true); //Objeto3D.call(this, conTapa);

  this.crearCarroExtremo = function() {

    //var circulo = new FiguraCarro();
    var figura = new FiguraExtremoCarro();
    var recta = new RectaEnY(0, 0.5);
    var discretizacion = 0.1;

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
  this.crearCarroExtremo();
  this.setupWebGLBuffers();
}
