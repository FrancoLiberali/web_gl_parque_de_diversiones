var vec3 = glMatrix.vec3;
function Bezier(puntosDeControl) {

	this.ptos = puntosDeControl;
	
	//bases
	this.base0 = function(u) { return (1-u)*(1-u)*(1-u);}; // 1*(1-u) - u*(1-u) = 1-2u+u2,  (1-2u+u2) - u +2u2- u3,  1 - 3u +3u2 -u3

	this.base1 = function(u) { return 3*(1-u)*(1-u)*u; };

	this.base2 = function(u) { return 3*(1-u)*u*u;}// -u3 +3u2

	this.base3 = function(u) { return u*u*u; }// u3
	
	//bases derivadas
	this.base0der = function(u) { return -3*u*u+6*u-3;};//-3u2 +6u -3

	this.base1der = function(u) { return 9*u*u-12*u+3; };// 9u2 -12u +3

	this.base2der = function(u) { return -9*u*u+6*u;};// -9u2 +6u

	this.base3der = function(u) { return 3*u*u; };// 3u2

	this.base = [this.base0,this.base1,this.base2,this.base3];
	this.baseDer = [this.base0der, this.base1der, this.base2der, this.base3der];
	
	//no hay suficientes puntos para armar una curva de Bezier cubica
	var tmp = (this.ptos.length-4)%3;

	if(tmp != 0){
		return null;		
	}
	
	this.cantidadDeCurvas = ((this.ptos.length-4)/3)+1;

	CurvaCubica.call(this, this.base, this.baseDer, this.ptos);

	this.cantidadDePuntos = function() {
    	return this.ptos.length;
  	};
	
	this.curvas = [];
	
	//me armo los grafos de control para cada curva
	var curva = new Array();
	for(var i = 0; i < this.ptos.length; i++){
		if((i-4)%3 == 0 &&  (i-4) >= 0){
			this.curvas.push(curva);
			curva = new Array(this.ptos[i-1]);
		}
		curva.push(this.ptos[i]);
	}
	this.curvas.push(curva);

	this.calcularNormal = function(punto, puntoAnterior){
    /*
    var direccionCurva = vec3.create();
    var biNormal = vec3.create();
    var normal = vec3.create();
    direccionCurva = vec3.sub(direccionCurva, punto, puntoAnterior);
    biNormal = vec3.cross(biNormal, vec3.fromValues(0.0, 0.0, 1.0), direccionCurva);
    normal = vec3.cross(normal, biNormal, direccionCurva);
    return normal;
    */

    
    /*
    var normal = vec3.create();
    normal = vec3.cross(normal, tangente, vec3.fromValues(0.0, 1.0, 0.0));
    normal = vec3.normalize(normal, normal);
    return normal;
     */

    var direccionCurva = vec3.create();
    var normal = vec3.create();
    direccionCurva = vec3.sub(direccionCurva, punto, puntoAnterior);
    normal = vec3.cross(normal, direccionCurva, vec3.fromValues(0.0, -1.0, 0.0));
    //normal = vec3.scale(normal, normal, 1000);
    normal = vec3.normalize(normal, normal);
    return normal;
  }

}
