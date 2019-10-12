var vec3 = glMatrix.vec3;
function Bezier(puntosDeControl) {
	this.ptos = puntosDeControl;
	
	//no hay suficientes puntos para armar una curva de Bezier
	if((this.ptos.length-4)%3 != 0){
		return null;		
	}
	this.cantidadDeCruvas = ((this.ptos.length-4)/3)+1;
	
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

	//bases
	this.b0 = function(t){return((1-t)*(1-t)*(1-t))};
	this.b1 = function(t){return(3*(1-t)*(1-t)*t)};
	this.b2 = function(t){return(3*(1-t)*t*t)};
	this.b3 = function(t){return(t*t*t)};
	
	Curva.call(this, 0, this.cantidadDeCruvas);

	this.parametrizacion = function(t){
		var i = Math.trunc(t);
		if(i == this.cantidadDeCruvas) i = i-1; //caso borde
		var curva = this.curvas[i];
		var termino0 = vec3.create();
		var termino1 = vec3.create();
		var termino2 = vec3.create();
		var termino3 = vec3.create();
		var resultado = vec3.create();
		var p0 = curva[0];
		var p1 = curva[1];
		var p2 = curva[2];
		var p3 = curva[3];
		termino0 = vec3.scale(termino0, p0, this.b0(t-i));
		termino1 = vec3.scale(termino1, p1, this.b1(t-i));
		termino2 = vec3.scale(termino2, p2, this.b2(t-i));
		termino3 = vec3.scale(termino3, p3, this.b3(t-i));
		resultado = vec3.add(resultado, termino0, termino1);
		resultado = vec3.add(resultado, resultado, termino2);
		resultado = vec3.add(resultado, resultado, termino3);

		return resultado;
	};

	this.derivada = function(t) {
		return vec3.fromValues(0, 1, 0);
	};
}
