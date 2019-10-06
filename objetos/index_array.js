function crearIndexArray(indexArray, filas, columnas) {
  // A partir de conocer las dimensiones
  // se genera el index buffer correspondiente
  for (var i = 0; i < filas - 1; i++) {
    indexArray.push(i * columnas);
    for (var j = 0; j < columnas - 1; j++) {

      // lleno el buffer de indices del quad
      indexArray.push(i * columnas + j);
      indexArray.push((i + 1) * columnas + j);
      indexArray.push(i * columnas + j + 1);
      indexArray.push((i + 1) * columnas + j + 1);
    }
    indexArray.push((i + 1) * columnas + columnas - 1);
  }
}
