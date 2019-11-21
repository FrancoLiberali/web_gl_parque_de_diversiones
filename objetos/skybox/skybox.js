 
function Skybox() {
  Objeto3D.call(this, true, true); //Objeto3D.call(this, conTapa);

  this.crearSkybox = function() {
    var radio = 80.0;
    var semiCirculo = new Circulo(radio, 64, Math.PI/2);
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
  this.crearSkybox()
  this.usarColores = true;
  var color = [0.1333, 0.4431, 0.702];
  this.setColorUniforme(color);;
  this.rotar(-Math.PI/2, vec3.fromValues(0.0, 1.0, 0.0));
  this.transladar(0.0, 0.0, -1.0);
  //this.escalar(10.0, 10.0, 0.0);
  this.setupWebGLBuffers();
}
