function crearIndexArray(filas, columnas) {
  // A partir de conocer las dimensiones
  // se genera el index buffer correspondiente
  var index_array = [];
  for (var i = 0; i < filas - 1; i++) {
    index_array.push(i * columnas);
    for (var j = 0; j < columnas - 1; j++) {

      // lleno el buffer de indices del quad
      index_array.push(i * columnas + j);
      index_array.push((i + 1) * columnas + j);
      index_array.push(i * columnas + j + 1);
      index_array.push((i + 1) * columnas + j + 1);
    }
    index_array.push((i + 1) * columnas + columnas - 1);
  }
  return index_array;
}
