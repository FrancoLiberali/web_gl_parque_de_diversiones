function llenarNivel(vertexArray, formaEnNivel) {
  vertexArray.push(formaEnNivel[0]);
  vertexArray.push(formaEnNivel[1]);
  vertexArray.push(formaEnNivel[2]);
  return vertexArray
}

function barrido(curva, curvaDerivada, pasos, superficieInicial) {

  var vertexArray = [];
  var superficie = superficieInicial;
  for (var i = 0; i <= 1; i += pasos) {
    var binormal = vec3.create();
    var normal = vec3.create();
    var tangente = curvaDerivada(i);
    vec3.normalize(tangente, tangente);
    var binormal = vec3.cross(binormal, tangente, vec3.fromValues(0, 0, 1));
    var normal = vec3.cross(normal, binormal, tangente);

    var m1 = mat4.fromValues(binormal[0], binormal[1], binormal[2], 0,
      tangente[0], tangente[1], tangente[2], 0,
      normal[0], normal[1], normal[2], 0,
      curva(i)[0], curva(i)[1], curva(i)[2], 1
    );

    //Se aplica la tranformacion correspondiente a cada punto de la superficie
    //actualizando a la misma  
    for (var punto = 0; punto < superficie.length; punto++) {

      var nuevoPuntoTransformado = vec3.create();
      //Aplico transformacion
      vec3.transformMat4(nuevoPuntoTransformado, superficie[punto], m1);
      //Actualizo la superficie
      superficie[punto] = nuevoPuntoTransformado;
      //Agrego el punto a la arreglo de vertices
      vertexArray = llenarNivel(vertexArray, nuevoPuntoTransformado);

    }
  }
  return vertexArray;
}
