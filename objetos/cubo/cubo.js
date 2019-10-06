function Cubo() {
  Objeto3D.call(this);

  this.crearCubo = function() {
    var superficieInicial = [
      vec3.fromValues(0.0, 0.0, 1.0),
      vec3.fromValues(1.0, 0.0, 1.0),
      vec3.fromValues(1.0, 0.0, 0.0),
      vec3.fromValues(0.0, 0.0, 0.0),
      vec3.fromValues(0.0, 0.0, 1.0)
    ];

    var recta = new RectaEnY(0, 2);
    var discretizacion = 1;

    barrido(this.vertex_array, this.index_array, superficieInicial, recta, discretizacion);

    // aun no se usa, se esta pintando según las normales
    this.color_array = [];

    this.normal_array = [
      // cualquier cosa
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 1.0, 0.0,

      1.0, 1.0, 0.0,
      1.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 1.0, 1.0,

      1.0, 1.0, 0.0,
      1.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
    ];
  }
  this.crearCubo();
  this.setupWebGLBuffers();
  // this.agregarHijo(new TapaCubo());
  // var otraTapa = new TapaCubo();
  // otraTapa.transladar(0.0, 1.0, 0.0);
  // this.agregarHijo(otraTapa);
}

function TapaCubo() {
  Objeto3D.call(this);

  this.crearTapaCubo = function() {
    this.index_array = crearIndexArray(2, 2);

    this.vertex_array = [
      0.0, 0.0, 0.0,
      0.0, 0.0, 1.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0
    ];

    this.color_array = [
      // cualquier cosa
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
    ];

    this.normal_array = [
      // cualquier cosa
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
    ];
  }
  this.crearTapaCubo();
  this.setupWebGLBuffers();
}
