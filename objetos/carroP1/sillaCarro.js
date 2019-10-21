function SillaCarro() {
  Objeto3D.call(this, true); //Objeto3D.call(this, conTapa);

  this.crearSillaCarro = function() {

    //var circulo = new FiguraCarro();
    var figura = new FiguraSillaCarro();
    var recta = new RectaEnY(-0.75, 0.75);
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
  this.crearSillaCarro();
  this.setupWebGLBuffers();
}
