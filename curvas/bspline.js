var vec3 = glMatrix.vec3;
function BSpline(puntosDeControl) {

	this.ptos = puntosDeControl;
	
	//bases
	this.base0 = function(u) { return (1-u)*(1-u)*(1-u)*1/6;} // 1/6*(1-u)^3

	this.base1 = function(u) { return (4-6*u*u+3*u*u*u)*1/6; } // (u^3)/2 - u +2/3

	this.base2 = function(u) { return (1+3*u+3*u*u-3*u*u*u)*1/6} // -0.5*u^3+0.5*u^2+0.5*u+1

	this.base3 = function(u) { return (u*u*u)*1/6; }
	
	//bases derivadas
	this.base0der = function(u) { return -0.5*Math.pow(1-u,2);} // ((1-u)^2)/2

	this.base1der = function(u) { return (3/2)*u*u-2*u; }

	this.base2der = function(u) { return -1.5*u*u+u+0.5;}

	this.base3der = function(u) { return (u*u)/2; }

	this.base = [this.base0,this.base1,this.base2,this.base3];
	this.baseDer = [this.base0der, this.base1der, this.base2der, this.base3der];
	
	CurvaCubica.call(this, this.base, this.baseDer, this.ptos);

	//no hay suficientes puntos para armar una curva B-Spline cubica

	if(this.ptos.length < 4){
		return null;		
	}
	this.cantidadDeCurvas = (this.ptos.length-4)+1;
	
	this.curvas = [];

	var curva = new Array(this.ptos[0], this.ptos[1], this.ptos[2], this.ptos[3]);
	this.curvas[0] = curva;
	for(var i = 4; i < this.ptos.length; i++){
		curva = new Array();//capaz no hace falta
		curva = this.curvas[i-4].slice(1, 4);
		curva.push(this.ptos[i]);
		this.curvas.push(curva);
	}

}
