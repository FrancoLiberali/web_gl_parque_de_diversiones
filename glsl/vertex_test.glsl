precision highp float;


attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec3 aVertexColor;


uniform mat4 modelMatrix;               // matriz de modelado
uniform mat4 viewMatrix;                // matriz de vista
uniform mat4 projMatrix;                // matriz de proyección

uniform mat4 normalMatrix;          // matriz de normales

uniform vec3 uLightPosition; 

uniform bool uUseLighting;
uniform bool uUsingNormalMap;

varying vec3 vVertexColor;
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vLightDir;

void main(void) {
    // Transformamos al vertice al espacio de la camara
    vec4 pos_camera_view = viewMatrix * modelMatrix * vec4(aVertexPosition, 1.0);
    vec4 pos_view = modelMatrix * vec4(aVertexPosition, 1.0);
    // Transformamos al vertice al espacio de la proyeccion
    gl_Position = projMatrix * pos_camera_view;
    
    // Coordenada de textura sin modifiaciones
    vVertexColor = aVertexColor;
    vec3 pos = vec3(pos_view) / pos_view.w;
    vNormal = normalize((modelMatrix * vec4(aVertexNormal, 1.0)).xyz);
    vLightDir = uLightPosition - pos;
    vViewDir = normalize(-pos);
}