function Montania() {
  Objeto3D.call(this, false, true); //Objeto3D.call(this, conTapa);

  this.crearMontania = function() {

    this.figura = new FiguraMontania();
    this.recta = new CirculoB();

    var nPilares = app.cantidadDePilares;

    //reparto uniformemente los pilares. Para que esto funcione de forma agradabe
    //a la vista la norma de la resta entre todo par de puntos de control(de la recta) sucesivos debe ser
    // cte(o lo mas cercano a ello).  
    for(var i = 0; i <= this.recta.cantidadDeCurvas; i += (this.recta.cantidadDeCurvas/nPilares) ){
      var pto = this.recta.parametrizacion(i);
      var pilar = new Cilindro(false, true, 8/7*pto[2], 0.125);
      // modifico con la misma cantidad el eje x y z para disminuir el radio del cilindro
      // y es y le escalo la altura de la montaña rusa
      //Nota eso ultimo funciona asi ya que el cilindro tiene y = 1; 
      //pilar.escalar(0.125,5/5*pto[2],0.125);
      //Lo acomodo
      pilar.rotar(Math.PI/2, vec3.fromValues(1.0,0.0,0.0));
      //Lo ubico en el mismo lugar que la montaña proyectada sobre el plano xy
      pilar.transladar(pto[0], pto[1], 0.0);
      this.agregarHijo(pilar);
    }

    this.carrito = new CuerpoCarro();
    this.carrito.transladar(1.0, 1.0, 1.2);
    this.carrito.escalar(0.25,0.25,0.25);
    this.agregarHijo(this.carrito);
    var discretizacion = 0.1;

    barrido(
      this.vertex_array,
      this.index_array,
      this.normal_array,
      this.figura,
      this.recta,
      discretizacion,
      this.conTapa,
      null,
      true,
    );

    //this.usarColores = true;
    var color = [0.269,0.355,0.345];
    //this.setColorUniforme(color);
  }

  this.getPosicion = function(){
    var pos = this.carrito.getPosicion();
    
    return vec3.add(pos, pos, vec3.fromValues(10.0, 20.0, 0.0));//return this.carrito.getPosicion(); 
  };
  this.crearMontania();
  this.setupWebGLBuffers();
}

