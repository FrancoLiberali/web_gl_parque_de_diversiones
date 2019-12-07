#define M_PI 3.1415926535897932384626433832795

precision highp float;

varying vec3 vNormal;
varying vec3 vCamDir;
varying vec3 vPosition;

uniform sampler2D uSampler4;

void main(void) {
    vec3 rayoInsidente = vPosition - vCamDir;
    vec3 rayoReflejado = reflect(rayoInsidente, vNormal);
    //rayoReflejado = normalize(rayoReflejado);

    float r = sqrt(pow(rayoReflejado.x, 2.0) + pow(rayoReflejado.y, 2.0) + pow(rayoReflejado.z, 2.0));
    float alfa = atan(rayoReflejado.y, rayoReflejado.x);
    float beta = acos(rayoReflejado.z/r);
    //if (alfa < 0.0) alfa = -alfa;
    //if (beta < 0.0) beta = -beta;

    //vec2 textureCoord = vec2(beta/(2.0*M_PI), alfa/M_PI); //ok
    vec2 textureCoord = vec2(alfa/M_PI, beta/(M_PI)); //test
    vec4 textureColor = texture2D(uSampler4,textureCoord);
    
    gl_FragColor = textureColor;
    //gl_FragColor = vec4(rayoReflejado, 1.0);
}