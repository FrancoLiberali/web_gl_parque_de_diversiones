precision highp float;

attribute vec3 aVertexColor;
attribute vec3 aVertexPosition;	// atributo posicion
attribute vec3 aVertexNormal;		// atributo normal

uniform mat4 modelMatrix;				// matriz de modelado
uniform mat4 viewMatrix;				// matriz de vista
uniform mat4 projMatrix;				// matriz de proyección

uniform mat4 normalMatrix;			// matriz de normales

//uniform vec3 u_lightWorldPosition; 

varying vec3 v_surfaceToLight;

varying highp vec3 vColor;					// vector posición en coord de mundo.
varying vec3 vNormal;						// vector normal enviado al fragment shader
varying vec3 vPosWorld;					// vector posición en coord de mundo.


void main(void) {
	gl_Position = projMatrix * viewMatrix * modelMatrix * vec4(aVertexPosition, 1.0);

	vPosWorld=(modelMatrix*vec4(aVertexPosition,1.0)).xyz;	//la posicion en coordenadas de mundo
	vNormal=(modelMatrix*vec4(aVertexNormal,1.0)).xyz;			//la normal en coordenadas de mundo
	vColor = aVertexColor;
 
  	// compute the vector of the surface to the light
  	// and pass it to the fragment shader
  	v_surfaceToLight = vec3(0.0, 0.0, -5.0) - vPosWorld;
}
