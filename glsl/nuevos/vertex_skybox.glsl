attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;  
uniform mat4 projMatrix;
uniform mat4 normalMatrix;

varying vec3 vViewDir;
varying vec3 vNormal;						// vector normal enviado al fragment shader

varying vec3 vPos;

varying vec2 vTextureCoord;

void main(void) {
	
	vec3 position = aVertexPosition;		
    
	// Transformamos al vértice al espacio de la cámara
	vec4 pos_camera_view = viewMatrix * modelMatrix * vec4(position, 1.0);
    vec4 pos_view = modelMatrix * vec4(aVertexPosition, 1.0);
    // Transformamos al vertice al espacio de la proyeccion
    gl_Position = projMatrix * pos_camera_view;
    
    // Coordenada de textura sin modifiaciones
    vec3 pos = vec3(pos_view) / pos_view.w;
    vNormal = normalize((normalMatrix * vec4(aVertexNormal, 1.0)).xyz); //la normal en coordenadas de mundo
    
    vViewDir = normalize(-pos);
	vPos = pos;
    vTextureCoord = aTextureCoord;
		
    }
