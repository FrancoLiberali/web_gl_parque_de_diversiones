function Objeto3D(conTapa, conEjes = false) {
  // Si los buffers son nulos, el objeto actua solo como contenedor
  this.vertexBuffer = null;
  this.indexBuffer = null;
  this.normalBuffer = null;
  this.colorBuffer = null;

  this.vertex_array = [];
  this.index_array = [];
  this.normal_array = [];
  this.color_array = [];
  this.conTapa = conTapa;
  this.conEjes = conEjes;

  this.matrizModelado = mat4.create();
  this.matrizRotacion = mat4.create();
  this.matrizPadre;

  this.hijos = [];

  this.ejes = [];
  if (this.conEjes) {
    var ejeX = new Eje("x");
    this.ejes.push(ejeX);
    var ejeY = new Eje("y");
    ejeY.rotar(Math.PI / 2, vec3.fromValues(0.0, 0.0, 1.0));
    ejeY.transladar(LADO_EJE, 0.0, 0.0);
    this.ejes.push(ejeY);
    var ejeZ = new Eje("z");
    ejeZ.rotar(Math.PI / 2, vec3.fromValues(0.0, -1.0, 0.0));
    ejeZ.transladar(LADO_EJE, 0.0, 0.0);
    this.ejes.push(ejeZ);
  }

  this.posicion = vec3.create(); // x,y,z
  this.ejeRotacion; // x,y,z
  this.anguloRotacion // angulo
  this.escala; // x,y,z

  this.setupWebGLBuffers = function() {
    // 1. Creamos un buffer para las posicioens dentro del pipeline.
    this.vertexBuffer = gl.createBuffer();
    // 2. Le decimos a WebGL que las siguientes operaciones que vamos a ser se aplican sobre el buffer que
    // hemos creado.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    // 3. Cargamos datos de las posiciones en el buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertex_array), gl.STATIC_DRAW);

    this.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_array), gl.STATIC_DRAW);

    this.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_array), gl.STATIC_DRAW);

    // Repetimos los pasos 1. 2. y 3. para la información de los índices
    // Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
    // Notar también que se usa un array de enteros en lugar de floats.
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.indexBuffer.number_vertex_point = this.index_array.length;
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_array), gl.STATIC_DRAW);
  }

  this.setGeometria = function(vertexArray, indexArray, normalArray) {
    this.vertex_array = vertexArray;
    this.index_array = indexArray;
    this.normal_array = normalArray;
  }

  this.setColorUniforme = function(color) {
    for (i = 0; i <= this.vertex_array.length; i += 1) {
      this.color_array.push(color[0]);
      this.color_array.push(color[1]);
      this.color_array.push(color[2]);
    }
  }

  this.animar = function() {};

  this.dibujar = function(matrizPadre, conEjes) {
    var matrizModeladoFinal = mat4.create();
    // aplicar rotacion generada por setRotacion;
    mat4.multiply(matrizModeladoFinal, this.matrizModelado, this.matrizRotacion);
    // multiplacar por matriz del padre
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
  }

  this.transladar = function(x, y, z) {
    var matrizTranslacion = mat4.create();
    mat4.translate(matrizTranslacion, matrizTranslacion, [x, y, z]);
    mat4.multiply(this.matrizModelado, matrizTranslacion, this.matrizModelado);
  }

  this.rotar = function(anguloRotacion, ejeRotacion) {
    var matrizRotacion = mat4.create();
    mat4.rotate(matrizRotacion, matrizRotacion, anguloRotacion, ejeRotacion);
    mat4.multiply(this.matrizModelado, matrizRotacion, this.matrizModelado);
  }

  this.escalar = function(x, y, z) {
    var matrizEscalado = mat4.create();
    mat4.scale(matrizEscalado, matrizEscalado, vec3.fromValues(x, y, z));
    mat4.multiply(this.matrizModelado, matrizEscalado, this.matrizModelado);
  }

  this.setPosicion = function(x, y, z) {
    // guarda la posicion
  }

  // a diferencia del rotar que te rota un angulo que se va sumando cada vez
  // que se llama, este no mantiene llamados anteriores, solo este
  // Esta rotacion se hace primero que todas las demas
  this.setRotacion = function(anguloRotacion, ejeRotacion) {
    mat4.identity(this.matrizRotacion);
    mat4.rotate(this.matrizRotacion, this.matrizRotacion, anguloRotacion, ejeRotacion);
  }

  this.agregarHijo = function(obj) {
    this.hijos.push(obj);
  }


  this.quitarHijo = function(obj) {

    // quitar obj de hijos;
  }
}

LADO_EJE = 0.05
function Eje(eje) {
  Cubo.call(this, LADO_EJE, true, false);

  this.usarColores = true;
  this.crearEje = function() {
    this.escalar(40.0, 1.0, 1.0);
    var color = [];
    if (eje === "x") {
      color = [1.0, 0.0, 0.0];
    } else if (eje === "y") {
      color = [0.0, 1.0, 0.0];
    } else {
      color = [0.0, 0.0, 1.0];
    }
    this.setColorUniforme(color);
  }
  this.crearEje();
  this.setupWebGLBuffers();
}
