X = 0
Y = 1
Z = 2

function llenarArray(array, vector) {
  array.push(vector[X]);
  array.push(vector[Y]);
  array.push(vector[Z]);
}

function aplicarTransfomacionAVectores(array, matrizTransformacion, vectores) {
  _.each(vectores, function(vector) {
    var vectorTransformado = vec3.create();
    // Aplico transformacion
    vec3.transformMat4(vectorTransformado, vector, matrizTransformacion);
    // Agrego el vectorTransformado al arreglo
    llenarArray(array, vectorTransformado);
  });
}

function aplicarTransfomacion(vertexArray, normalArray, matrizTransformacion, forma) {
  var matrizTransformacionNormales = mat4.create();
  mat4.invert(matrizTransformacionNormales, matrizTransformacion);
  mat4.transpose(matrizTransformacionNormales, matrizTransformacionNormales);

  // Se aplica la tranformacion correspondiente a cada punto
  aplicarTransfomacionAVectores(vertexArray, matrizTransformacion, forma.puntos);
  // Se aplica la tranformacion correspondiente a cada normal
  aplicarTransfomacionAVectores(normalArray, matrizTransformacionNormales, forma.normales);
}

function agregarTapa(vertexArray, normalArray, forma, normal, matrizDeNivel) {
  aplicarTransfomacionAVectores(vertexArray, matrizDeNivel, forma.puntos);
  _.each(forma.puntos, function(punto) {
    // Agrego la normal para todos los puntos de la tapa
    llenarArray(normalArray, normal);
  });

  var centroTransformado = vec3.create();
  vec3.transformMat4(centroTransformado, forma.centro, matrizDeNivel);
  _.each(forma.puntos, function(punto) {
    // pongo un nuevo nivel con todos en el punto central
    llenarArray(vertexArray, centroTransformado);
    // el centro tambien tiene esa normal
    llenarArray(normalArray, normal);
  });
}

NORMAL_HACIA_ARRIBA = vec3.fromValues(0, 0, 1);

function barrido(vertexArray, indexArray, normalArray, forma, curva, pasoDiscretizacion, conTapa, escalas = null, cerrada = false) {

  var cantNiveles = 0;
  var tangente = null;
  var matrizDeNivel = null;
  var matini = mat4.create();

  for (var t = curva.limiteInferior; t <= curva.limiteSuperior; t += pasoDiscretizacion) {
    cantNiveles += 1;
    var binormal = vec3.create();
    var normal = vec3.create();
    tangente = curva.derivadaEn(t);
    vec3.normalize(tangente, tangente);
    var binormal = vec3.cross(binormal, tangente, NORMAL_HACIA_ARRIBA);
    var normal = vec3.cross(normal, binormal, tangente);

    var translacion = curva.evaluarEn(t);
    matrizDeNivel = mat4.fromValues(
      binormal[X], binormal[Y], binormal[Z], 0,
      tangente[X], tangente[Y], tangente[Z], 0,
      normal[X], normal[Y], normal[Z], 0,
      translacion[X], translacion[Y], translacion[Z], 1
    );

    if (escalas) {
      var matrizEscala = mat4.create();
      mat4.scale(matrizEscala, matrizEscala, escalas(t));
      mat4.multiply(matrizDeNivel, matrizDeNivel, matrizEscala);
    }

    if (cantNiveles === 1 && cerrada){
      matini = matrizDeNivel;        
    }

    if (cantNiveles === 1 && conTapa) {
      cantNiveles += 2;
      agregarTapa(vertexArray, normalArray, forma, tangente, matrizDeNivel);
    }

    aplicarTransfomacion(vertexArray, normalArray, matrizDeNivel, forma);
  }
  if (conTapa) {
    cantNiveles += 2;
    agregarTapa(vertexArray, normalArray, forma, tangente, matrizDeNivel);
  }
  if (cerrada){
    aplicarTransfomacion(vertexArray, normalArray, matini, forma);
    cantNiveles += 1;
  }
  crearIndexArray(indexArray, cantNiveles, forma.cantidadDePuntos());
}

function aplicarRotacion(vertexArray, normalArray, angulo, eje, forma) {
  var matrizRotacion = mat4.create();
  mat4.fromRotation(matrizRotacion, angulo, eje);

  aplicarTransfomacion(vertexArray, normalArray, matrizRotacion, forma);
}

function revolucion(vertexArray, indexArray, normalArray, forma, eje, paso) {

  var cantNiveles = 0;
  for (var angulo = 0; angulo <= 2 * Math.PI; angulo += paso) {
    cantNiveles += 1;
    aplicarRotacion(vertexArray, normalArray, angulo, eje, forma);
  }
  // por si por cuestiones de presicion se saltea el 2pi
  cantNiveles += 1;
  aplicarRotacion(vertexArray, normalArray, 2 * Math.PI, eje, forma);

  crearIndexArray(indexArray, cantNiveles, forma.cantidadDePuntos());
}
