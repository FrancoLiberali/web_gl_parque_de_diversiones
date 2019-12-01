function Esfera() {
  Objeto3D.call(this);

  this.crearEsfera = function() {
    var semiCirculo = new Circulo(0.3, 64, Math.PI);
    var discretizacion = Math.PI / 32;

    revolucion(
      this.vertex_array,
      this.index_array,
      this.normal_array,
      semiCirculo,
      vec3.fromValues(1.0, 0.0, 0.0),
      discretizacion
    );
    var color = [0.740,0.995,0.908];
    this.setColorUniforme(color);
  }
  this.crearEsfera();
  this.setupWebGLBuffers();
}
