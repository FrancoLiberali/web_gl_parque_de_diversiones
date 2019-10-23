function Cubo(lado, conTapa, conEjes) {
  Objeto3D.call(this, conTapa, conEjes);
  this.lado = lado;

  // this.agregarTapa = function(translacionX, translacionY, translacionZ, anguloRotacion = 0, ejeRotacion = vec3.create()) {
    // var tapa = new TapaCubo(this.lado);
    // tapa.rotar(anguloRotacion, ejeRotacion);
    // tapa.transladar(translacionX, translacionY, translacionZ);
    // this.agregarHijo(tapa);
  // }

  this.crearCubo = function() {
    // this.agregarTapa(0.0, 0.0, 0.0);
    // this.agregarTapa(0.0, this.lado, 0.0);
    // this.agregarTapa(0.0, 0.0, 0.0, Math.PI / 2, vec3.fromValues(-1.0, 0.0, 0.0));
    // this.agregarTapa(0.0, -this.lado, 0.0, Math.PI / 2, vec3.fromValues(-1.0, 0.0, 0.0));
    // this.agregarTapa(0.0, 0.0, 0.0, Math.PI / 2, vec3.fromValues(0.0, 0.0, 1.0));
    // this.agregarTapa(0.0, -this.lado, 0.0, Math.PI / 2, vec3.fromValues(0.0, 0.0, 1.0));
  // }

    var cuadrado = new Cuadrado(this.lado);
    var recta = new RectaEnY(0, this.lado);
    var discretizacion = this.lado;

    barrido(
      this.vertex_array,
      this.index_array,
      this.normal_array,
      cuadrado,
      recta,
      discretizacion,
      conTapa,
    );
  }

  this.crearCubo();
  this.setupWebGLBuffers();
}

// function TapaCubo(lado) {
  // Objeto3D.call(this);
  // this.lado = lado;

  // this.crearTapaCubo = function() {
    // crearIndexArray(this.index_array, 2, 2);

    // this.vertex_array = [
      // 0.0, 0.0, 0.0,
      // 0.0, 0.0, this.lado,
      // this.lado, 0.0, 0.0,
      // this.lado, 0.0, this.lado
    // ];

    // this.normal_array = [
      // como la tapa esta en x,z todas las normales son en y
      // 0.0, 1.0, 0.0,
      // 0.0, 1.0, 0.0,
      // 0.0, 1.0, 0.0,
      // 0.0, 1.0, 0.0,
    // ];
  // }
  // this.crearTapaCubo();
  // this.setupWebGLBuffers();
// }
