function CuerpoCarro() {
  Objeto3D.call(this, false, true); //Objeto3D.call(this, conTapa);

  this.crearCuerpoCarro = function() {

    var figura = new FiguraCuerpoCarro();
    var recta = new RectaEnY(0, 2.5);
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
  }
  this.crearCarro = function() {
    var extremoIzq = new ExtremoCarro();
    extremoIzq.transladar(0.0, -0.5, 0.0, 0);
    this.agregarHijo(extremoIzq);

    var extremoDer = new ExtremoCarro();
    extremoDer.transladar(0.0, 2.3, 0.0, 0);
    this.agregarHijo(extremoDer);

    var silla1 = new SillaCarro();
    //silla1.transladar(0.0, 2.3, 0.0, 0);
    silla1.rotar(Math.PI / 2, vec3.fromValues(0.0, 0.0, 1.0));
    this.agregarHijo(silla1);

    var silla2 = new SillaCarro();
    silla2.transladar(1.0, 0.0, 0.0, 0);
    silla2.rotar(Math.PI / 2, vec3.fromValues(0.0, 0.0, 1.0));
    this.agregarHijo(silla2);

  }
  

  this.t = 0;
  this.recta = new CirculoB();
  this.dibujar = function(matrizPadre, conEjes) {

    var binormal = vec3.create();
    var normal = vec3.create();
    tangente = this.recta.derivadaEn(this.t);
    vec3.normalize(tangente, tangente);
    var binormal = vec3.cross(binormal, tangente, NORMAL_HACIA_ARRIBA);
    var normal = vec3.cross(normal, binormal, tangente);

    var translacion = this.recta.evaluarEn(this.t);
    var matrizMovimiento = mat4.fromValues(
      binormal[X], binormal[Y], binormal[Z], 0,
      tangente[X], tangente[Y], tangente[Z], 0,
      normal[X], normal[Y], normal[Z], 0,
      translacion[X], translacion[Y], translacion[Z], 1
    );

    var matrizModeladoFinal = mat4.create();

    mat4.multiply(matrizModeladoFinal, matrizMovimiento, this.matrizModelado);
    mat4.multiply(matrizModeladoFinal, matrizPadre, matrizModeladoFinal);

    if (this.vertexBuffer && this.indexBuffer && this.normalBuffer) {
      // dibujar la geometria del objeto, segun la tranformacion de "matrizModeladoFinal"
      drawScene(this.vertexBuffer, this.normalBuffer, this.indexBuffer, this.colorBuffer, matrizModeladoFinal, this.usarColores);

    }

    if (this.hijos.length > 0) {

      for (var i = 0; i < this.hijos.length; i++) {
        this.hijos[i].dibujar(matrizModeladoFinal, conEjes);
      }
    }

    if (conEjes && this.ejes.length > 0) {
      for (var i = 0; i < this.ejes.length; i++) {
        this.ejes[i].dibujar(matrizModeladoFinal, conEjes);
      }
    }

    this.t+=0.0025;
    if (this.t > this.recta.limiteSuperior) this.t = 0; 
  }


  this.crearCuerpoCarro();
  this.setupWebGLBuffers();
  this.crearCarro();
}
 
