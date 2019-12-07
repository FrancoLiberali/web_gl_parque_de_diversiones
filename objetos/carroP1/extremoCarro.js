function ExtremoCarro() {
  Objeto3D.call(this, true); //Objeto3D.call(this, conTapa);

  this.crearCarroExtremo = function() {

    var figura = new FiguraExtremoCarro();
    var recta = new RectaEnY(0, 0.5);
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
    this.texturas = null;
    this.light = false;
    this.usarColores = true;
    var color = [0.930,0.827,0.013];
    this.setColorUniforme(color);
  }
  this.crearCarroExtremo();
  this.setupWebGLBuffers();
}
