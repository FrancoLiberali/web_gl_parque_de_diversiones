MAX_PORCENTAJE = 100;

function Cono(conTapa, conEjes, porcentaje = MAX_PORCENTAJE, alto = 1.0 , radio = 1.0) {
  // porcentaje es hasta donde del cono hacer
  // porcenta entre 0 y 100
  Objeto3D.call(this, conTapa, conEjes);

  this.crearCono = function() {

    var circulo = new Circulo(radio, 32);
    var limite = (porcentaje / MAX_PORCENTAJE)*alto;
    var recta = new RectaEnY(0, limite); 
    var escalas = function(t) {
      return vec3.fromValues(1 - t, 1 - t, 1 - t);
    }
    // hacer solo en cuatro niveles
    var discretizacion = limite / 2;

    barrido(
      this.vertex_array,
      this.index_array,
      this.normal_array,
      circulo,
      recta,
      discretizacion,
      this.conTapa,
      escalas
    );
  }
  this.crearCono();
  this.setupWebGLBuffers();
}
