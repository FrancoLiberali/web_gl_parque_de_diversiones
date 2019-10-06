 function llenarNivel(vertexArray, formaEnNivel) {
   vertexArray.push(formaEnNivel[0]);
   vertexArray.push(formaEnNivel[1]);
   vertexArray.push(formaEnNivel[2]);
   return vertexArray
 }

 //Calcula la dimension correspondiente a una grilla
 //necesaria para contener los vertices de una superficie
 //de revolucion que se generaria a partir de los parametros
 //"curva" y "pasos" pasados por parametro.
 //La primer componente del arreglo corresponde a la coordenada x
 //mientras que la segunda componenete corresponde a la coordenada y
 function dimensionGrillaRevolucion(curva, pasos) {
   var dimensiones = [];
   dimensiones[0] = ((2 * Math.PI) / pasos) + 1;
   dimensiones[1] = curva.length;
   return dimensiones;
 }

 function revolucion(curva, eje, pasos) {

   var vertexArray = [];
   //lleno el primer nivel con la curva pasado por parametro
   for (var punto = 0; punto < curva.length; punto++) {
     vertexArray = llenarNivel(vertexArray, curva[punto]);
   }

   var m1 = mat4.create();
   mat4.fromRotation(m1, pasos, eje);

   for (var i = 0; i <= 2 * Math.PI; i += pasos) {
     for (var punto = 0; punto < curva.length; punto++) {
       var formaEnNivel = vec3.create();
       vec3.transformMat4(formaEnNivel, curva[punto], m1);
       curva[punto] = formaEnNivel;
       vertexArray = llenarNivel(vertexArray, curva[punto]);
     }

   }
   return vertexArray;
 }
