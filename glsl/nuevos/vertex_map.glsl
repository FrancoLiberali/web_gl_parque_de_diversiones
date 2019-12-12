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
varying vec3 vSurfaceToView;

varying vec3 vPos;
varying vec3 vViewDir;

void main(void) {
    // Transformamos al vertice al espacio de la camara
    vec4 pos_camera_view = viewMatrix * modelMatrix * vec4(aVertexPosition, 1.0);
    vec4 pos_view = modelMatrix * vec4(aVertexPosition, 1.0);
    // Transformamos al vertice al espacio de la proyeccion
    vec4 position = projMatrix * pos_camera_view;
    gl_Position = position;
    
    // Coordenada de textura sin modifiaciones
    vCamDir = uCamaraPosition;

    vec3 pos = pos_view.xyz / pos_view.w;
    vNormal = normalize((normalMatrix * vec4(aVertexNormal, 1.0)).xyz); //la normal en coordenadas de mundo
    
    vPos = pos;    

    // compute the vector of the surface to the view/camera
    // and pass it to the fragment shader
    vSurfaceToView = uCamaraPosition - pos;

    vViewDir = normalize(-pos_view.xyz);
}