function calcularTangente(actual, sig){
    tangente = vec3.create();
    vec3.subtract(tangente, sig, actual);
    vec3.normalize(tangente, tangente);
    return tangente;
}

function llenarNivel(vertexArray, formaEnNivel) {
        vertexArray.push(formaEnNivel[0]);
        vertexArray.push(formaEnNivel[1]);
        vertexArray.push(formaEnNivel[2]);
    return vertexArray
}

function mat4xvec3(m4, v3){
  return vec4.fromValues()
}

function barrido(curva, curvaDerivada, pasos, superficieInicial){

    var vertexArray = [];
    var superficie = superficieInicial;
    //for (var punto = 0; punto < superficie.length; punto++){
    //  vertexArray = llenarNivel(vertexArray, superficie[punto]);
    //}
    for(var i = 0; i <= 1; i += pasos){
        var binormal = vec3.create();
        var normal = vec3.create();
        var ctg = curvaDerivada(i);
        vec3.normalize(ctg, ctg);
        var binormal = vec3.cross(binormal, ctg, vec3.fromValues(0,0,1));
        var normal = vec3.cross(normal, binormal, ctg);

        var m1 = mat4.fromValues(binormal[0], binormal[1], binormal[2], 0,
					                       ctg[0]     , ctg[1]     , ctg[2]     , 0,
                                 normal[0]  , normal[1]  , normal[2]  , 0,
					                       curva(i)[0], curva(i)[1], curva(i)[2], 1
        );

        for (var punto = 0; punto < superficie.length; punto++){

            var formaEnNivel = vec3.create();
            vec3.transformMat4(formaEnNivel, superficie[punto], m1); 

            superficie[punto] = formaEnNivel;

            vertexArray = llenarNivel(vertexArray, formaEnNivel);

        }
    }
    return vertexArray;
}


function Cubo() {
  Objeto3D.call(this);

  this.crearCubo = function() {
    this.index_array = crearIndexArray(2, 5);
    var superficieInicial =
     [vec3.fromValues(0.0, 0.0, 1.0),
      vec3.fromValues(1.0, 0.0, 1.0),
      vec3.fromValues(1.0, 0.0, 0.0),
      vec3.fromValues(0.0, 0.0, 0.0),
      vec3.fromValues(0.0, 0.0, 1.0)];

		var recta = function(t){
      return vec3.fromValues(0, 2*t, 0);
		}
    var rectaDerivada = function(t){
      return vec3.fromValues(0, 2, 0);
    }

    var pasos = 0.5;

    this.vertex_array = barrido(recta, rectaDerivada, pasos, superficieInicial);

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
  otraTapa.transladar(0.0, 1.0, 0.0);
  this.agregarHijo(otraTapa);
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
