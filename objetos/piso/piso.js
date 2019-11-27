 
function Piso() {
  Objeto3D.call(this, true, true); //Objeto3D.call(this, conTapa);

  this.crearPiso = function() {
    var figura = new Cuadrado(20);
    var recta = new RectaEnY(0, 0.1);
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

    this.usarColores = true;
    var color = [0.0, 1.0, 0.0];
    this.setColorUniforme(color);
    var l = this.color_array;
    this.rotar(Math.PI/2, vec3.fromValues(1.0, 0.0, 0.0));
    this.transladar(-5.0, 5.0, 0.0);
    this.escalar(100.0, 10.0, 0.0);

  }
  this.crearPiso();
  this.setupWebGLBuffers();
}
