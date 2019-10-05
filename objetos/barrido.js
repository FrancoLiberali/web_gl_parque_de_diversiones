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
    var ctg = curvaDerivada(i);
    vec3.normalize(ctg, ctg);
    var binormal = vec3.cross(binormal, ctg, vec3.fromValues(0, 0, 1));
    var normal = vec3.cross(normal, binormal, ctg);

    var m1 = mat4.fromValues(binormal[0], binormal[1], binormal[2], 0,
      ctg[0], ctg[1], ctg[2], 0,
      normal[0], normal[1], normal[2], 0,
      curva(i)[0], curva(i)[1], curva(i)[2], 1
    );

    for (var punto = 0; punto < superficie.length; punto++) {

      var formaEnNivel = vec3.create();
      vec3.transformMat4(formaEnNivel, superficie[punto], m1);

      superficie[punto] = formaEnNivel;

      vertexArray = llenarNivel(vertexArray, formaEnNivel);

    }
  }
  return vertexArray;
}
