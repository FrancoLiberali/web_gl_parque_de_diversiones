attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;  
uniform mat4 projMatrix;
uniform mat4 normalMatrix;
	
uniform sampler2D uSampler0;


varying vec2 vTextureCoord;

void main(void) {
	
	vec3 position = aVertexPosition;		
    //vec2 uvCoord = aTextureCoord;
    //vec4 textureColor = texture2D(uSampler0, vec2(uvCoord.s, uvCoord.t));
		
		
	// Transformamos al vértice al espacio de la cámara
	vec4 pos_camera_view = viewMatrix * modelMatrix * vec4(position, 1.0);
	// Transformamos al vértice al espacio de la proyección
    gl_Position = projMatrix * pos_camera_view;
		
    vTextureCoord = aTextureCoord;
		
    }