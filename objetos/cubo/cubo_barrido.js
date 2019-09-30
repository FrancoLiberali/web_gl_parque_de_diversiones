

//llamar barrido con 4 pasos
// con superficie_ini =
//     [[0.0, 1.0, 0.0],
//      [1.0, 1.0, 0.0],
//      [1.0, 0.0, 0.0],
//      [0.0, 0.0, 0.0],
//      [0.0, 1.0, 0.0]]
// y curva = recta


var pasos = 2;



function calcularTangente(actual, sig){
    tangente = vec3.create();
    vec3.subtract(tangente, sig, actual);
    vec3.normalize(tangente, tangente);
    return tangente;
}

function llenarNivel(vertexArray, formaEnNivel) {//superficie){
    //for (var punto = 0; punto < superficie.length; punto++){
        vertexArray.push(formaEnNivel[0]);//superficie[punto][0]);
        vertexArray.push(formaEnNivel[1]);//superficie[punto][1]);
        vertexArray.push(formaEnNivel[2]);//superficie[punto][2]);
    //}
    return vertexArray
}

function barrido(curva, pasos, superficie_ini){

    var vertexArray = [];
    var superficie = superficie_ini;
    for (var punto = 0; punto < superficie.length; punto++){
      vertexArray = llenarNivel(vertexArray, superficie[punto]);
    }
    for(var i = 1; i < pasos; i++){
        var binormal = vec3.create();
        var normal = vec3.create();
        var ctg = calcularTangente(curva(i/pasos), curva((i+1)/pasos));
        var binormal = vec3.multiply(binormal, ctg, vec3.fromValues(0,0,1));
        var normal = vec3.multiply(normal, ctg, binormal);

        var m1 = mat4.fromValues(binormal[0], binormal[1], binormal[2], 0,
					normal[0], normal[1], normal[2], 0,
					ctg[0], ctg[1], ctg[2], 0,
					curva(i)[0], curva(i)[1], curva(i)[2], 1
        );

        //m1=mat4.create();
        //mat4.identity(m1);
        //mat4.translate(m1,m1,2*ctg);

        for (var punto = 0; punto < superficie.length; punto++){

            var formaEnNivel = vec3.create();
            vec3.transformMat4(formaEnNivel, superficie[punto], m1); // creo que esta haciendo la multiplicacion a derecha en lugar de izquierda

            vertexArray = llenarNivel(vertexArray, formaEnNivel);

        }
    }
    return vertexArray;
}


function Cubo() {
  Objeto3D.call(this);

  this.crearCubo = function() {
    this.index_array = crearIndexArray(2, 5);
    var superficie_ini =
     [vec3.fromValues(0.0, 1.0, 0.0),
      vec3.fromValues(1.0, 1.0, 0.0),
      vec3.fromValues(1.0, 0.0, 0.0),
      vec3.fromValues(0.0, 0.0, 0.0),
      vec3.fromValues(0.0, 1.0, 0.0)];

			var recta = function(t){
			    return vec3.fromValues(0,0,t);
			}

    this.vertex_array = barrido(recta, pasos, superficie_ini);

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
  this.agregarHijo(new TapaCubo());
  var otraTapa = new TapaCubo();
  otraTapa.transladar(0.0, 0.0, 1.0);
  this.agregarHijo(otraTapa);
}

function TapaCubo() {
  Objeto3D.call(this);

  this.crearTapaCubo = function() {
    this.index_array = crearIndexArray(2, 2);

    this.vertex_array = [
      0.0, 1.0, 0.0,
      1.0, 1.0, 0.0,
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
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
