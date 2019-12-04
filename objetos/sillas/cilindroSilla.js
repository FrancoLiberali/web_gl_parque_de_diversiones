function CilindroSilla(conTapa = false, conEjes = true, alto = 1.0 , radio = 1.0, texturePath) {
    
    Objeto3D.call(this, conTapa, conEjes);
    
    this.h = alto;
    this.r = radio;
    this.texturePath = texturePath;

	this.puntosPorNivel = 0;	
    
    this.crearNivel = function(radio, discretizacion, altura){
        this.puntosPorNivel = 0;
        var anguloDiscretizacion = 2 * Math.PI / discretizacion;
        for (var angulo = 0; angulo <= 2 * Math.PI; angulo += anguloDiscretizacion) {
            
            this.puntosPorNivel += 1;

            var x = radio * Math.cos(angulo);
            var y = radio * Math.sin(angulo);
            var z = altura;
            var u = angulo/(Math.PI);
            var v = altura;

            this.normal_array.push(x);
            this.normal_array.push(y);
            this.normal_array.push(0);

            this.texture_array.push(u);
            this.texture_array.push(v);
                    
            this.vertex_array.push(x);
            this.vertex_array.push(y);
            this.vertex_array.push(z);

        }
        this.puntosPorNivel += 1;

            var x = radio * Math.cos(0);
            var y = radio * Math.sin(0);
            var z = altura;
            var u = (2 * Math.PI)/(Math.PI);
            var v = altura;

            this.normal_array.push(x);
            this.normal_array.push(y);
            this.normal_array.push(0);

            this.texture_array.push(u);
            this.texture_array.push(v);
                    
            this.vertex_array.push(x);
            this.vertex_array.push(y);
            this.vertex_array.push(z);
    };
    this.crearCilindroSilla = function(){
        this.crearNivel(this.r, 32, 0.0);
        this.crearNivel(this.r, 32, this.h);
        

        crearIndexArray(this.index_array, 2, this.puntosPorNivel);

    }
    
    this.crearCilindroSilla();
    //this.usarColores = true;
    var color = [1.000,0.261,0.030];
    //this.setColorUniforme(color);
    this.rotar(-Math.PI/2, vec3.fromValues(1.0,0.0,0.0));
    this.setupWebGLBuffers();
    this.initTexture(this.texturePath);
    
}