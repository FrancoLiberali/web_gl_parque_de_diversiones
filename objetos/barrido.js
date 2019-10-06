function llenarNivel(vertexArray, formaEnNivel) {
  vertexArray.push(formaEnNivel[X]);
  vertexArray.push(formaEnNivel[Y]);
  vertexArray.push(formaEnNivel[Z]);
}

NORMAL_HACIA_ARRIBA = vec3.fromValues(0, 0, 1);
X = 0
Y = 1
Z = 2

function barrido(vertexArray, indexArray, normalArray, superficieInicial, normalInicial, curva, pasoDiscretizacion) {

  var superficie = superficieInicial;
  var normales = normalInicial;
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

    var matrizDeNivelNormales = mat4.create();
    mat4.invert(matrizDeNivelNormales, matrizDeNivel);
    mat4.transpose(matrizDeNivelNormales, matrizDeNivelNormales);

    // Se aplica la tranformacion correspondiente a cada punto de la superficie
    // actualizando a la misma
    _.each(superficie, function(punto) {
      var puntoTransformado = vec3.create();
      // Aplico transformacion
      vec3.transformMat4(puntoTransformado, punto, matrizDeNivel);
      // Agrego el puntoTransformado al arreglo de vertices
      llenarNivel(vertexArray, puntoTransformado);
    });

    _.each(normales, function(normalAlPunto) {
      var normalTransformada = vec3.create();
      // Aplico transformacion
      vec3.transformMat4(normalTransformada, normalAlPunto, matrizDeNivelNormales);
      // Agrego el puntoTransformado al arreglo de vertices
      llenarNivel(normalArray, normalTransformada);
    });
  }

  crearIndexArray(indexArray, cantNiveles, superficie.length);
}
