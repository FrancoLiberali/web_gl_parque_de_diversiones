function Cubo(lado) {
  Objeto3D.call(this);
  this.lado = lado;

  this.agregarTapa = function(translacionX, translacionY, translacionZ, anguloRotacion = 0, ejeRotacion = vec3.create()) {
    var tapa = new TapaCubo(this.lado);
    tapa.rotar(anguloRotacion, ejeRotacion);
    tapa.transladar(translacionX, translacionY, translacionZ);
    this.agregarHijo(tapa);
  }

  this.crearCubo = function() {
    this.agregarTapa(0.0, 0.0, 0.0);
    this.agregarTapa(0.0, this.lado, 0.0);
    this.agregarTapa(0.0, 0.0, 0.0, Math.PI / 2, vec3.fromValues(-1.0, 0.0, 0.0));
    this.agregarTapa(0.0, -this.lado, 0.0, Math.PI / 2, vec3.fromValues(-1.0, 0.0, 0.0));
    this.agregarTapa(0.0, 0.0, 0.0, Math.PI / 2, vec3.fromValues(0.0, 0.0, 1.0));
    this.agregarTapa(0.0, -this.lado, 0.0, Math.PI / 2, vec3.fromValues(0.0, 0.0, 1.0));
  }
  this.crearCubo();
  this.setupWebGLBuffers();
}

function TapaCubo(lado) {
  Objeto3D.call(this);
  this.lado = lado;

  this.crearTapaCubo = function() {
    crearIndexArray(this.index_array, 2, 2);

    this.vertex_array = [
      0.0, 0.0, 0.0,
      0.0, 0.0, this.lado,
      this.lado, 0.0, 0.0,
      this.lado, 0.0, this.lado
    ];

    this.normal_array = [
      // como la tapa esta en x,z todas las normales son en y
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
    ];
  }
  this.crearTapaCubo();
  this.setupWebGLBuffers();
}
