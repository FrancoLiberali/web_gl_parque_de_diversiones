precision highp float;

attribute vec3 aVertexColor;
attribute vec3 aVertexPosition;	// atributo posicion

uniform mat4 modelMatrix;				// matriz de modelado
uniform mat4 viewMatrix;				// matriz de vista
uniform mat4 projMatrix;				// matriz de proyección

varying highp vec4 vColor;					// vector posición en coord de mundo.

void main(void) {
	gl_Position = projMatrix * viewMatrix * modelMatrix * vec4(aVertexPosition, 1.0);

	vColor = vec4(aVertexColor, 1.0);
}
