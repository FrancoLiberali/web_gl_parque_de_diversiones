function Silla(conEjes = false) {
  Objeto3D.call(this, true, conEjes);

  this.crearSilla = function() {

    var forma = new FormaDeSilla();
    var recta = new RectaEnY(0, 1);
    var discretizacion = 1;

    barrido(
      this.vertex_array,
      this.index_array,
      this.normal_array,
      forma,
      recta,
      discretizacion,
      true,
    );
    this.setColorUniforme([0.700,0.150,1.000]);
    

  }
  this.crearSilla();
  this.setupWebGLBuffers();
}

function FormaDeSilla() {
  this.puntos = [];
  this.normales = [];
  this.centro = vec3.fromValues(0.125, 0.0, 0.125);

  this.cantidadDePuntos = function() {
    return this.puntos.length;
  };

  this.crearFormaDeSilla = function() {
    this.puntos = [
      // duplicados para definir dos normales en cada esquina
      vec3.fromValues(0.0, 0.0, 0.0),
      vec3.fromValues(0.0, 0.0, 1.0),
      vec3.fromValues(0.0, 0.0, 1.0),
      vec3.fromValues(0.25, 0.0, 1.0),
      vec3.fromValues(0.25, 0.0, 1.0),
      vec3.fromValues(0.25, 0.0, 0.25),
      vec3.fromValues(0.25, 0.0, 0.25),
      vec3.fromValues(1.0, 0.0, 0.25),
      vec3.fromValues(1.0, 0.0, 0.25),
      vec3.fromValues(1.0, 0.0, 0.0),
      vec3.fromValues(1.0, 0.0, 0.0),
      vec3.fromValues(0.0, 0.0, 0.0),
    ]

    this.normales = [
      vec3.fromValues(-1.0, 0.0, 0.0),
      vec3.fromValues(-1.0, 0.0, 0.0),
      vec3.fromValues(0.0, 0.0, 1.0),
      vec3.fromValues(0.0, 0.0, 1.0),
      vec3.fromValues(1.0, 0.0, 0.0),
      vec3.fromValues(1.0, 0.0, 0.0),
      vec3.fromValues(0.0, 0.0, 1.0),
      vec3.fromValues(0.0, 0.0, 1.0),
      vec3.fromValues(1.0, 0.0, 0.0),
      vec3.fromValues(1.0, 0.0, 0.0),
      vec3.fromValues(0.0, 0.0, -1.0),
      vec3.fromValues(0.0, 0.0, -1.0),
    ]
  };

  this.crearFormaDeSilla();
}
