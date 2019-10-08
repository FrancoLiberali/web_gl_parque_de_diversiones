MAX_PORCENTAJE = 100;

function Cono(conTapa, conEjes, porcentaje = MAX_PORCENTAJE) {
  // porcentaje es hasta donde del cono hacer
  // porcenta entre 0 y 100
  Objeto3D.call(this, conTapa, conEjes);

  this.crearCono = function() {

    var circulo = new Circulo(1, 32);
    var limite = porcentaje / MAX_PORCENTAJE;
    var recta = new RectaEnY(0, limite);
    var escalas = function(t) {
      return vec3.fromValues(1 - t, 1 - t, 1 - t);
    }
    // hacer solo en dos niveles
    var discretizacion = limite;

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
