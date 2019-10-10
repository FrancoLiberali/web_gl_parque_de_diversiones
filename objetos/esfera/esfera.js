function Esfera() {
  Objeto3D.call(this);

  this.crearEsfera = function() {
    var semiCirculo = new Circulo(1.5, 64, Math.PI);
    var discretizacion = Math.PI / 32;

    revolucion(
      this.vertex_array,
      this.index_array,
      this.normal_array,
      semiCirculo,
      vec3.fromValues(1.0, 0.0, 0.0),
      discretizacion
    );
  }
  this.crearEsfera();
  this.setupWebGLBuffers();
}
