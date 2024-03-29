function Cilindro(conTapa = false, conEjes, alto = 1.0 , radio = 1.0, usarColor = false, color = null) {
  Objeto3D.call(this, conTapa, conEjes);

  this.crearCilindro = function() {

    var circulo = new Circulo(radio, 32);
    var recta = new RectaEnY(0, alto);
    var discretizacion = alto;

    barrido(
      this.vertex_array,
      this.index_array,
      this.normal_array,
      circulo,
      recta,
      discretizacion,
      this.conTapa,
    );
    if (usarColor){
      //var color = [1.000,0.261,0.030];
      this.setColorUniforme(color);
    } 
  }
  
  this.crearCilindro();
  this.setupWebGLBuffers();
  if(usarColor === false){
    this.initTexture("./objetos/refmapGreyRoom3.jpg");
    this.usarMapa =true;
  }
}
