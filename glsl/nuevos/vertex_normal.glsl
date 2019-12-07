precision highp float;

attribute vec3 aVertexPosition;	// atributo posicion
attribute vec3 aVertexNormal;		// atributo normal

uniform mat4 modelMatrix;				// matriz de modelado
uniform mat4 viewMatrix;				// matriz de vista
uniform mat4 projMatrix;				// matriz de proyección

uniform mat4 normalMatrix;			// matriz de normales

varying vec3 vNormal;						// vector normal enviado al fragment shader

void main(void) {
	gl_Position = projMatrix * viewMatrix * modelMatrix * vec4(aVertexPosition, 1.0);
	vNormal=(normalMatrix*vec4(aVertexNormal,1.0)).xyz;			//la normal en coordenadas de mundo
}
