precision highp float;

attribute vec3 aVertexColor;
attribute vec3 aVertexPosition;	// atributo posicion
attribute vec3 aVertexNormal;		// atributo normal

uniform mat4 modelMatrix;				// matriz de modelado
uniform mat4 viewMatrix;				// matriz de vista
uniform mat4 projMatrix;				// matriz de proyección

uniform mat4 normalMatrix;			// matriz de normales

varying vec3 vViewDir;
varying vec3 vNormal;						// vector normal enviado al fragment shader
varying highp vec4 vColor;					// vector posición en coord de mundo.
varying vec3 vPos;

void main(void) {
	gl_Position = projMatrix * viewMatrix * modelMatrix * vec4(aVertexPosition, 1.0);

	vColor = vec4(aVertexColor, 1.0);
	
	// Transformamos al vertice al espacio de la camara
    vec4 pos_camera_view = viewMatrix * modelMatrix * vec4(aVertexPosition, 1.0); // vertice en la camara
    vec4 pos_view = modelMatrix * vec4(aVertexPosition, 1.0); // vertice en el mundo
    // Transformamos al vertice al espacio de la proyeccion
    gl_Position = projMatrix * pos_camera_view;
    
    // Coordenada de textura sin modifiaciones
    vec3 pos = pos_view.xyz / pos_view.w;
    vNormal = normalize((normalMatrix * vec4(aVertexNormal, 1.0)).xyz); //la normal en coordenadas de mundo
    
    vPos = pos;    

    vViewDir = normalize(-pos);
	
}
