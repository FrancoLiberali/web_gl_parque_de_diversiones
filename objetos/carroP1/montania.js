function Montania() {
  Objeto3D.call(this, false, true); //Objeto3D.call(this, conTapa);

  this.crearMontania = function() {

    //var circulo = new FiguraCarro();
    var figura = new FiguraMontania();
    var recta = new CirculoB();

    var nPilares = 8

    //reparto uniformemente los pilares. Para que esto funcione de forma agradabe
    //a la vista la norma de la resta entre todo par de puntos de control(de la recta) sucesivos debe ser
    // cte(o lo mas cercano a ello).  
    for(var i = 0; i <= recta.cantidadDeCurvas; i += (recta.cantidadDeCurvas/nPilares) ){
      var pto = recta.parametrizacion(i);
      var pilar = new Cilindro(false, true);
      // modifico con la misma cantidad el eje x y z para disminuir el radio del cilindro
      // y es y le escalo la altura de la montaña rusa
      //Nota eso ultimo funciona asi ya que el cilindro tiene y = 1; 
      pilar.escalar(0.125,6/5*pto[2],0.125);
      //Lo acomodo
      pilar.rotar(Math.PI/2, vec3.fromValues(1.0,0.0,0.0));
      //Lo ubico en el mismo lugar que la montaña proyectada sobre el plano xy
      pilar.transladar(pto[0], pto[1], 0.0);
      this.agregarHijo(pilar);
    }

    var carrito = new CuerpoCarro();
    carrito.transladar(1.0, 1.0, 1.2);
    carrito.escalar(0.25,0.25,0.25);
    this.agregarHijo(carrito);
    //var recta = new RectaEnX(0.0, 1.0);
    var discretizacion = 0.08;

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
