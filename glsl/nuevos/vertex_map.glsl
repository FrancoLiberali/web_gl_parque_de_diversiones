precision highp float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 modelMatrix;               // matriz de modelado
uniform mat4 viewMatrix;                // matriz de vista
uniform mat4 projMatrix;                // matriz de proyección

uniform mat4 normalMatrix;          // matriz de normales

uniform vec3 uCamaraPosition;

varying vec3 vCamDir;
varying vec3 vNormal;
varying vec3 vPosition;


void main(void) {
    // Transformamos al vertice al espacio de la camara
    vec4 pos_camera_view = viewMatrix * modelMatrix * vec4(aVertexPosition, 1.0);
    vec4 pos_view = modelMatrix * vec4(aVertexPosition, 1.0);
    // Transformamos al vertice al espacio de la proyeccion
    vec4 position = projMatrix * pos_camera_view;
    gl_Position = position;
    
    // Coordenada de textura sin modifiaciones
    vNormal = normalize((normalMatrix * vec4(aVertexNormal, 1.0)).xyz);
    vCamDir = uCamaraPosition;

    vPosition = (position/position.w).xyz;
}