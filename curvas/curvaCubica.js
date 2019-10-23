var vec3 = glMatrix.vec3;
function CurvaCubica(base, baseDer, puntosDeControl) {
	
	this.base = base;
	this.baseDer = baseDer;

	this.ptos = puntosDeControl;
	/*
	//no hay suficientes puntos para armar una curva de Bezier
	var tmp = (this.ptos.length-4)%3;

	if(tmp != 0){
		return null;		
	}
	this.cantidadDeCurvas = ((this.ptos.length-4)/3)+1;
	
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
	*/
	this.getValor = function(t, base){
		var i = Math.trunc(t);
		if(i == this.cantidadDeCurvas) i = i-1; //caso borde
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
		termino0 = vec3.scale(termino0, p0, base[0](t-i));
		termino1 = vec3.scale(termino1, p1, base[1](t-i));
		termino2 = vec3.scale(termino2, p2, base[2](t-i));
		termino3 = vec3.scale(termino3, p3, base[3](t-i));
		resultado = vec3.add(resultado, termino0, termino1);
		resultado = vec3.add(resultado, resultado, termino2);
		resultado = vec3.add(resultado, resultado, termino3);

		return resultado;
	};
	//CHEQUEAR!
	//this.cantidadDeCurvas = (this.ptos.length-4)+1;

	Curva.call(this, 0, this.cantidadDeCurvas);

	this.parametrizacion = function(t){
		return this.getValor(t, this.base)
	};

	this.derivada = function(t){
		return this.getValor(t, this.baseDer)
	};
}
 
