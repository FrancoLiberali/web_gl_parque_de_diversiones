function Cono(conTapa, conEjes) {
  Objeto3D.call(this, conTapa, conEjes);

  this.crearCono = function() {

    var circulo = new Circulo(1, 16);
    var recta = new RectaEnY(0, 1);
    var escalas = function(t) {
      return vec3.fromValues(t, t, t);
    }
    var discretizacion = 1;

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
