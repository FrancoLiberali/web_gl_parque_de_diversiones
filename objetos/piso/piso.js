 
function Piso() {
  Objeto3D.call(this, true, true); //Objeto3D.call(this, conTapa);
  //this.imagenes = imagenesCargadas;
/*
  this.crearPiso = function() {
    var figura = new Cuadrado(2000);
    var recta = new RectaEnY(0, 0.1);
    var discretizacion = 0.1;
    barrido(
      this.vertex_array,
      this.index_array,
      this.normal_array,
      figura,
      recta,
      discretizacion,
      this.conTapa,
    );

    this.usarColores = true;
    var color = [0.0, 1.0, 0.0];
    this.setColorUniforme(color);
    var l = this.color_array;
    this.rotar(Math.PI/2, vec3.fromValues(1.0, 0.0, 0.0));
    this.transladar(-500.0, 500.0, 0.0);
    //this.escalar(100.0, 10.0, 0.0);

  }
  */
  this.crearPiso = function() {
    var lado = 400.0;
    this.vertex_array = [

        -lado,-lado, 0.0,     // vertice 1, triangulo 1
        -lado, lado, 0.0,     // vertice 2, triangulo 1
        lado,-lado, 0.0,     // vertice 3, triangulo 1

        lado, lado, 0.0      // vertice 3, triangulo 2
    ];
    this.normal_array = [

        0.0, 0.0, 1.0,     // vertice 1, triangulo 1
        0.0, 0.0, 1.0,     // vertice 2, triangulo 1
        0.0, 0.0, 1.0,     // vertice 3, triangulo 1

        0.0, 0.0, 1.0      // vertice 3, triangulo 2
    ];
    this.index_array = [
      0.0,
      1.0,
      2.0,
      3.0
    ];
    
    this.color_array = [

        0.0, 1.0, 0.0,     // vertice 1, triangulo 1
        0.0, 1.0, 0.0,     // vertice 2, triangulo 1
        0.0, 1.0, 0.0,     // vertice 3, triangulo 1

        0.0, 1.0, 0.0      // vertice 3, triangulo 2
    ];
    var repeat = 20.0;
    this.texture_array = [   
        0.0, 0.0,
        0.0, repeat,
        repeat, 0.0,
                    
        repeat, repeat
    ];

  /*          
  for (var ii = 0; ii < 3; ++ii) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
 
    // Set the parameters so we can render any size image.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
 
    // Upload the image into the texture.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.imagenes[ii]);
 
    // add the texture to the array of textures.
    this.texturas.push(texture);
  }

    gl.useProgram(glPisoProgram);
    var samplerUniform0 = gl.getUniformLocation(glPisoProgram, "uSampler0");
    var samplerUniform1 = gl.getUniformLocation(glPisoProgram, "uSampler1");
    var samplerUniform2 = gl.getUniformLocation(glPisoProgram, "uSampler2");

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texturas[0]);
    gl.uniform1i(samplerUniform0, 0);

    */    

    
  }
  //this.usarColores = true;
  //var color = [0.0, 1.0, 0.0];
  //this.setColorUniforme(color);
  this.crearPiso();
  this.setupWebGLBuffers();
  this.initTexture("./objetos/tierra.jpg");
  this.initTexture("./objetos//tierraSeca.jpg");
  this.initTexture("./objetos/pasto.jpg");
  
}
