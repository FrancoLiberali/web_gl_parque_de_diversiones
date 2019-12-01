function TexturedSphere(latitude_bands, longitude_bands){

    Objeto3D.call(this, false, true);
    this.latitudeBands = latitude_bands;
    this.longitudeBands = longitude_bands;

        // Se generan los vertices para la esfera, calculando los datos para una esfera de radio 1
        // Y también la informacón de las normales y coordenadas de textura para cada vertice de la esfera
        // La esfera se renderizara utilizando triangulos, para ello se arma un buffer de índices 
        // a todos los triangulos de la esfera
		
    this.crearSkyboxSphere = function(){

        var latNumber;
        var longNumber;
        var radio = 40.0;
        for (latNumber=0; latNumber <= this.latitudeBands/2; latNumber++) {
            var theta = latNumber * Math.PI / (this.latitudeBands);
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (longNumber=0; longNumber <= this.longitudeBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / this.longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = radio * cosPhi * sinTheta;
                var y = radio * cosTheta;
                var z = radio * sinPhi * sinTheta;
                var u = 1.0 - (longNumber / this.longitudeBands);
                var v = 1.0 - (latNumber / (this.latitudeBands*(4/5)));

                this.normal_array.push(x);
                this.normal_array.push(y);
                this.normal_array.push(z);

                this.texture_array.push(u);
                this.texture_array.push(v);
                    
                this.vertex_array.push(x);
                this.vertex_array.push(y);
                this.vertex_array.push(z);
            }
        }

        // Buffer de indices de los triangulos
            
          
        for (latNumber=0; latNumber < this.latitudeBands/2; latNumber++) {
            for (longNumber=0; longNumber < this.longitudeBands; longNumber++) {
                var first = (latNumber * (this.longitudeBands + 1)) + longNumber;
                var second = first + this.longitudeBands + 1;
                this.index_array.push(first);
                this.index_array.push(second);
                this.index_array.push(first + 1);

                this.index_array.push(second);
                this.index_array.push(second + 1);
                this.index_array.push(first + 1);
            }
        }
        
    }
    this.crearSkyboxSphere();
    this.rotar(Math.PI/2, vec3.fromValues(1.0,0.0,0.0));
    this.setupWebGLBuffers();
    this.initTexture("./objetos/sunset.jpg");
    
}