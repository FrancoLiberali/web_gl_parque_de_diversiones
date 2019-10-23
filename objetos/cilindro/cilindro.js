function Cilindro(conTapa = false) {
  Objeto3D.call(this, conTapa);

  this.crearCilindro = function() {

    //var circulo = new Circulo(1, 16);
    var circulo = new CirculoB();
    var recta = new RectaEnY(0, 0.15);
    var discretizacion = 0.15;

    barrido(
      this.vertex_array,
      this.index_array,
      this.normal_array,
      circulo,
      recta,
      discretizacion,
      this.conTapa,
    );
  }
  this.crearCilindro();
  this.setupWebGLBuffers();
}
