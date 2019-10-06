function llenarNivel(vertexArray, formaEnNivel) {
  vertexArray.push(formaEnNivel[0]);
  vertexArray.push(formaEnNivel[1]);
  vertexArray.push(formaEnNivel[2]);
}

NORMAL_HACIA_ARRIBA = vec3.fromValues(0, 0, 1);
X = 0
Y = 1
Z = 2

function barrido(vertexArray, superficieInicial, curva, pasoDiscretizacion) {

  var superficie = superficieInicial;
  for (var t = curva.limiteInferior; t <= curva.limiteSuperior; t += pasoDiscretizacion) {
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

    // Se aplica la tranformacion correspondiente a cada punto de la superficie
    // actualizando a la misma
    _.each(superficie, function(punto) {
      var puntoTransformado = vec3.create();
      // Aplico transformacion
      vec3.transformMat4(puntoTransformado, punto, matrizDeNivel);
      // Agrego el puntoTransformado al arreglo de vertices
      llenarNivel(vertexArray, puntoTransformado);
    });
  }
  return vertexArray;
}
