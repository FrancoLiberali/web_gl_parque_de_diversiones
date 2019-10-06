function Cubo() {
  Objeto3D.call(this);

  this.crearCubo = function() {
    var pasos = Math.PI / 2;
    var curvaInicial = [vec3.fromValues(0.0, 1.0, 0.0),
      vec3.fromValues(0.0, 1.0, 1.0)
    ];

    var dimension = dimensionGrillaRevolucion(curvaInicial, pasos);

    this.index_array = crearIndexArray(dimension[0], dimension[1]);

    this.vertex_array = revolucion(curvaInicial, vec3.fromValues(0.0, 0.0, 1.0), pasos);
    this.color_array = [
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
    ];

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
    ];
  }
  this.crearCubo();
  this.setupWebGLBuffers();
  //this.agregarHijo(new TapaCubo());
  //var otraTapa = new TapaCubo();
  //otraTapa.transladar(0.0, 1.0, 0.0);
  //this.agregarHijo(otraTapa);
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
