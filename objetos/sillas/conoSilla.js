function ConoSilla(conTapa = false, conEjes = true) {
  Objeto3D.call(this, conTapa, conEjes);
	this.puntosPorNivel = 0;	
    
    this.crearNivel = function(radio, discretizacion, altura, t){
        this.puntosPorNivel = 0;
        var anguloDiscretizacion = 2 * Math.PI / discretizacion;
        for (var angulo = 0; angulo <= 2 * Math.PI; angulo += anguloDiscretizacion) {
            
            this.puntosPorNivel += 1;

            var x = radio * Math.cos(angulo);
            var y = radio * Math.sin(angulo);
            var z = altura;
            var u = angulo/(2*Math.PI);
            var v = t;

            var normal = vec3.fromValues(x, y, z);
            normal = vec3.normalize(normal, normal);

            this.normal_array.push(normal[0]);
            this.normal_array.push(normal[1]);
            this.normal_array.push(normal[2]);

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
            var u = (2 * Math.PI)/(2*Math.PI);
            var v = t;

            this.normal_array.push(x);
            this.normal_array.push(y);
            this.normal_array.push(0);

            this.texture_array.push(u);
            this.texture_array.push(v);
                    
            this.vertex_array.push(x);
            this.vertex_array.push(y);
            this.vertex_array.push(z);
    };
    this.crearConoSilla = function(){
        this.crearNivel(1.0, 32, 0.0, 0.0);
        this.crearNivel(0.66, 32, 0.05, 0.5);
        this.crearNivel(0.33, 32, 0.10, 1.0);
        this.crearNivel(0.10, 32, 0.13, 1.5);
        this.crearNivel(0.0, 32, 0.15, 2.0);

        crearIndexArray(this.index_array, 5, this.puntosPorNivel);

    }
    
    this.crearConoSilla();
    //this.usarColores = true;
    //var color = [1.000,0.261,0.030];
    //this.setColorUniforme(color);
    this.rotar(-Math.PI/2, vec3.fromValues(1.0,0.0,0.0));
    this.setupWebGLBuffers();
    this.initTexture("./objetos/patron3.png");
    
}