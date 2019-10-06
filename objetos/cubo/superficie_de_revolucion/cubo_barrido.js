function llenarNivel(vertexArray, formaEnNivel) {
        vertexArray.push(formaEnNivel[0]);
        vertexArray.push(formaEnNivel[1]);
        vertexArray.push(formaEnNivel[2]);
    return vertexArray
}

function revolucion(curva, eje, pasos){
  
  var vertexArray = [];
  //lleno el primer nivel con la curva pasado por parametro
  for (var punto = 0; punto < curva.length; punto++){
    vertexArray = llenarNivel(vertexArray, curva[punto]);
  }
  
  var m1 = mat4.create();
  mat4.fromRotation(m1, pasos, eje);

  for(var i = 0; i <= 2*Math.PI; i += pasos){
    for (var punto = 0; punto < curva.length; punto++){
      var formaEnNivel = vec3.create();    
      vec3.transformMat4(formaEnNivel, curva[punto], m1);
      curva[punto] = formaEnNivel;
      vertexArray = llenarNivel(vertexArray, curva[punto]); 
    }

  }
  return vertexArray;   
}

function dimensionGrillaRevolucion(curva, pasos){
  var dimensiones = [];
  dimensiones[0] = ((2*Math.PI)/pasos)+1; 
  dimensiones[1] = curva.length;
  return dimensiones;
}

function Cubo() {
  Objeto3D.call(this);

  this.crearCubo = function() {
    var pasos = Math.PI/2;
    var curvaInicial =
     [vec3.fromValues(0.0, 1.0, 0.0),
      vec3.fromValues(0.0, 1.0, 1.0)];

    var dimension = dimensionGrillaRevolucion(curvaInicial, pasos);

    this.index_array = crearIndexArray(dimension[0], dimension[1]);
    
    this.vertex_array = revolucion(curvaInicial, vec3.fromValues(0.0, 0.0, 1.0), pasos);
    this.color_array = [
      // cualquier cosa
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 1.0, 0.0,
      1.0, 1.0, 0.0,
      1.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
    ];

    this.normal_array = [
      // cualquier cosa
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 1.0, 0.0,
      1.0, 1.0, 0.0,
      1.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
    ];
  }
  this.crearCubo();
  this.setupWebGLBuffers();
  //this.agregarHijo(new TapaCubo());
  //var otraTapa = new TapaCubo();
  //otraTapa.transladar(0.0, 1.0, 0.0);
  //this.agregarHijo(otraTapa);
}

function TapaCubo() {
  Objeto3D.call(this);

  this.crearTapaCubo = function() {
    this.index_array = crearIndexArray(2, 2);

    this.vertex_array = [
      0.0, 0.0, 0.0,
      0.0, 0.0, 1.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0
    ];

    this.color_array = [
      // cualquier cosa
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
    ];

    this.normal_array = [
      // cualquier cosa
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
    ];
  }
  this.crearTapaCubo();
  this.setupWebGLBuffers();
}
