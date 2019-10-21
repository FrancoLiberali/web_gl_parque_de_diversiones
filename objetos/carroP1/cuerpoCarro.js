function CuerpoCarro() {
  Objeto3D.call(this, false); //Objeto3D.call(this, conTapa);

  this.crearCuerpoCarro = function() {

    var figura = new FiguraCuerpoCarro();
    var recta = new RectaEnY(0, 2.5);
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
  this.crearCarro = function() {
    var extremoIzq = new ExtremoCarro();
    extremoIzq.transladar(0.0, -0.5, 0.0, 0);
    this.agregarHijo(extremoIzq);

    var extremoDer = new ExtremoCarro();
    extremoDer.transladar(0.0, 2.3, 0.0, 0);
    this.agregarHijo(extremoDer);

    var silla1 = new SillaCarro();
    //silla1.transladar(0.0, 2.3, 0.0, 0);
    silla1.rotar(Math.PI / 2, vec3.fromValues(0.0, 0.0, 1.0));
    this.agregarHijo(silla1);

    var silla2 = new SillaCarro();
    silla2.transladar(0.0, 1.0, 0.0, 0);
    silla2.rotar(Math.PI / 2, vec3.fromValues(0.0, 0.0, 1.0));
    this.agregarHijo(silla2);

  }
  this.crearCuerpoCarro();
  this.setupWebGLBuffers();
  this.crearCarro();
}
 
