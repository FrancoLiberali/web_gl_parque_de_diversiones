precision highp float;

attribute vec3 aVertexColor;
attribute vec3 aVertexPosition;	// atributo posicion
attribute vec3 aVertexNormal;		// atributo normal

uniform mat4 modelMatrix;				// matriz de modelado
uniform mat4 viewMatrix;				// matriz de vista
uniform mat4 projMatrix;				// matriz de proyección

uniform mat4 normalMatrix;			// matriz de normales

uniform vec3 uLightPosition;
uniform vec3 uLightPosition1;
uniform vec3 uLightPosition2;
uniform vec3 uLightPosition3;
uniform vec3 uLightPosition4;
uniform vec3 uLightPosition5;
uniform vec3 uLightPosition6;
uniform vec3 uLightPosition7;
uniform vec3 uLightPosition8;

varying vec3 vViewDir;
varying vec3 vNormal;						// vector normal enviado al fragment shader
varying highp vec4 vColor;					// vector posición en coord de mundo.

varying vec3 vLightDir;
varying vec3 vLightDir1;
varying vec3 vLightDir2;
varying vec3 vLightDir3;
varying vec3 vLightDir4;
varying vec3 vLightDir5;
varying vec3 vLightDir6;
varying vec3 vLightDir7;
varying vec3 vLightDir8;



void main(void) {
	gl_Position = projMatrix * viewMatrix * modelMatrix * vec4(aVertexPosition, 1.0);

	vColor = vec4(aVertexColor, 1.0);
	
	// Transformamos al vertice al espacio de la camara
    vec4 pos_camera_view = viewMatrix * modelMatrix * vec4(aVertexPosition, 1.0); // vertice en la camara
    vec4 pos_view = modelMatrix * vec4(aVertexPosition, 1.0); // vertice en el mundo
    // Transformamos al vertice al espacio de la proyeccion
    gl_Position = projMatrix * pos_camera_view;
    
    // Coordenada de textura sin modifiaciones
    vec3 pos = vec3(pos_view) / pos_view.w;
    vNormal = normalize((normalMatrix * vec4(aVertexNormal, 1.0)).xyz); //la normal en coordenadas de mundo
    vLightDir = uLightPosition - pos;
    vLightDir1 = uLightPosition1 - pos;
    vLightDir2 = uLightPosition2 - pos;
    vLightDir3 = uLightPosition3 - pos;
    vLightDir4 = uLightPosition4 - pos;
    vLightDir5 = uLightPosition5 - pos;
    vLightDir6 = uLightPosition6 - pos;
    vLightDir7 = uLightPosition7 - pos;
    vLightDir8 = uLightPosition8 - pos;

    vViewDir = normalize(-pos);
	
}
