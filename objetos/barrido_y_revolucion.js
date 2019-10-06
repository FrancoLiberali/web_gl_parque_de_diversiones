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

function aplicarTransfomacion(vertexArray, normalArray, matrizTransformacion, puntos, normales) {
  var matrizTransformacionNormales = mat4.create();
  mat4.invert(matrizTransformacionNormales, matrizTransformacion);
  mat4.transpose(matrizTransformacionNormales, matrizTransformacionNormales);

  // Se aplica la tranformacion correspondiente a cada punto
  aplicarTransfomacionAVectores(vertexArray, matrizTransformacion, puntos);
  // Se aplica la tranformacion correspondiente a cada normal
  aplicarTransfomacionAVectores(normalArray, matrizTransformacionNormales, normales);
}

NORMAL_HACIA_ARRIBA = vec3.fromValues(0, 0, 1);

function barrido(vertexArray, indexArray, normalArray, superficie, normales, curva, pasoDiscretizacion) {

  var cantNiveles = 0;
  for (var t = curva.limiteInferior; t <= curva.limiteSuperior; t += pasoDiscretizacion) {
    cantNiveles += 1;
    var binormal = vec3.create();
    var normal = vec3.create();
    var tangente = curva.derivadaEn(t);
    vec3.normalize(tangente, tangente);
    var binormal = vec3.cross(binormal, tangente, NORMAL_HACIA_ARRIBA);
    var normal = vec3.cross(normal, binormal, tangente);

    var translacion = curva.evaluarEn(t);
    var matrizDeNivel = mat4.fromValues(
      binormal[X], binormal[Y], binormal[Z], 0,
      tangente[X], tangente[Y], tangente[Z], 0,
      normal[X], normal[Y], normal[Z], 0,
      translacion[X], translacion[Y], translacion[Z], 1
    );

    aplicarTransfomacion(vertexArray, normalArray, matrizDeNivel, superficie, normales);
  }

  crearIndexArray(indexArray, cantNiveles, superficie.length);
}

function aplicarRotacion(vertexArray, normalArray, angulo, eje, curva, normales) {
  var matrizRotacion = mat4.create();
  mat4.fromRotation(matrizRotacion, angulo, eje);

  aplicarTransfomacion(vertexArray, normalArray, matrizRotacion, curva, normales);
}

function revolucion(vertexArray, indexArray, normalArray, curva, normales, eje, paso) {

  var cantNiveles = 0;
  for (var angulo = 0; angulo <= 2 * Math.PI; angulo += paso) {
    cantNiveles += 1;
    aplicarRotacion(vertexArray, normalArray, angulo, eje, curva, normales);
  }
  // por si por cuestiones de presicion se saltea el 2pi
  cantNiveles += 1;
  aplicarRotacion(vertexArray, normalArray, 2 * Math.PI, eje, curva, normales);

  crearIndexArray(indexArray, cantNiveles, curva.length);
}
