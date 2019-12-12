precision highp float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 modelMatrix;               // matriz de modelado
uniform mat4 viewMatrix;                // matriz de vista
uniform mat4 projMatrix;                // matriz de proyección
uniform mat4 normalMatrix;          // matriz de normales

uniform vec3 uCamaraPosition;

varying vec3 vSurfaceToView;
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vPos;
varying vec2 vTextureCoord;

void main(void) {
    // Transformamos al vertice al espacio de la camara
    vec4 pos_camera_view = viewMatrix * modelMatrix * vec4(aVertexPosition, 1.0);
    vec4 pos_view = modelMatrix * vec4(aVertexPosition, 1.0);
    // Transformamos al vertice al espacio de la proyeccion
    gl_Position = projMatrix * pos_camera_view;
    
    // Coordenada de textura sin modifiaciones
    vec3 pos = vec3(pos_view) / pos_view.w;
    vNormal = normalize((normalMatrix * vec4(aVertexNormal, 1.0)).xyz);
    
    vPos = pos;    
    vViewDir = normalize(-pos);
    vTextureCoord = aTextureCoord;
    vSurfaceToView = uCamaraPosition - pos;
}
 