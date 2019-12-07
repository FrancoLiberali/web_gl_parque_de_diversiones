precision mediump float;

uniform bool light;
uniform vec3 uAmbientColor;
uniform vec3 uDirectionalColor;
uniform sampler2D uSampler0;

varying vec2 vTextureCoord;
varying vec3 vNormal;
varying vec3 vViewDir;
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

    const float constantAmbient = 0.250;
    const float constantDiffuse = 0.50;
    const float constantSpecular = 1.0;

    float specular = 0.2;
    float specular1 = 0.2;
    float specular2 = 0.2;
    float specular3 = 0.2;
    float specular4 = 0.2;
    float specular5 = 0.2;
    float specular6 = 0.2;
    float specular7 = 0.2;
    float specular8 = 0.2;


    float glossiness = 80.0;
	
    vec3 normal = vNormal;
	vec3 lightDir = normalize(vLightDir);
    vec3 lightDir1 = normalize(vLightDir1);
    vec3 lightDir2 = normalize(vLightDir2);
    vec3 lightDir3 = normalize(vLightDir3);
    vec3 lightDir4 = normalize(vLightDir4);
    vec3 lightDir5 = normalize(vLightDir5);
    vec3 lightDir6 = normalize(vLightDir6);
    vec3 lightDir7 = normalize(vLightDir7);
    vec3 lightDir8 = normalize(vLightDir8);

    vec3 viewDir = vViewDir;
    float diffuseCos = max(dot(lightDir, normal), 0.0);
    float diffuseCos1 = max(dot(lightDir1, normal), 0.0);
    float diffuseCos2 = max(dot(lightDir2, normal), 0.0);
    float diffuseCos3 = max(dot(lightDir3, normal), 0.0);
    float diffuseCos4 = max(dot(lightDir4, normal), 0.0);
    float diffuseCos5 = max(dot(lightDir5, normal), 0.0);
    float diffuseCos6 = max(dot(lightDir6, normal), 0.0);
    float diffuseCos7 = max(dot(lightDir7, normal), 0.0);
    float diffuseCos8 = max(dot(lightDir8, normal), 0.0);
    
    //faro0
    if(diffuseCos > 0.0) {
        vec3 reflectDir = reflect(-lightDir, normal);
        float specularCos = max(dot(reflectDir, viewDir), 0.0);
        specular = pow(specularCos, glossiness);
    }
    //faro1
    if(diffuseCos1 > 0.0) {
        vec3 reflectDir = reflect(-lightDir1, normal);
        float specularCos = max(dot(reflectDir, viewDir), 0.0);
        specular1 = pow(specularCos, glossiness);
    }
    //faro2
    if(diffuseCos2 > 0.0) {
        vec3 reflectDir = reflect(-lightDir2, normal);
        float specularCos = max(dot(reflectDir, viewDir), 0.0);
        specular2 = pow(specularCos, glossiness);
    }
    //faro3
    if(diffuseCos3 > 0.0) {
        vec3 reflectDir = reflect(-lightDir3, normal);
        float specularCos = max(dot(reflectDir, viewDir), 0.0);
        specular3 = pow(specularCos, glossiness);
    }
    //faro4
    if(diffuseCos4 > 0.0) {
        vec3 reflectDir = reflect(-lightDir4, normal);
        float specularCos = max(dot(reflectDir, viewDir), 0.0);
        specular4 = pow(specularCos, glossiness);
    }
    //faro5
    if(diffuseCos5 > 0.0) {
        vec3 reflectDir = reflect(-lightDir5, normal);
        float specularCos = max(dot(reflectDir, viewDir), 0.0);
        specular5 = pow(specularCos, glossiness);
    }
    //faro6
    if(diffuseCos6 > 0.0) {
        vec3 reflectDir = reflect(-lightDir6, normal);
        float specularCos = max(dot(reflectDir, viewDir), 0.0);
        specular6 = pow(specularCos, glossiness);
    }
    //faro7
    if(diffuseCos7 > 0.0) {
        vec3 reflectDir = reflect(-lightDir7, normal);
        float specularCos = max(dot(reflectDir, viewDir), 0.0);
        specular7 = pow(specularCos, glossiness);
    }
    //faro8
    if(diffuseCos8 > 0.0) {
        vec3 reflectDir = reflect(-lightDir8, normal);
        float specularCos = max(dot(reflectDir, viewDir), 0.0);
        specular8 = pow(specularCos, glossiness);
    }

    float difusseAngle =  diffuseCos + diffuseCos1 + diffuseCos2 + diffuseCos3 + diffuseCos4 + diffuseCos5 + diffuseCos6 + diffuseCos7 + diffuseCos8;

    float specularFinal = specular + specular1 + specular2 + specular3 + specular4 + specular5 + specular6 + specular7 + specular8; 

    vec3 lightIntensity =  constantAmbient*uAmbientColor + constantDiffuse*difusseAngle*uDirectionalColor + constantSpecular*specularFinal*uDirectionalColor;
    
    vec4 textureColor = texture2D(uSampler0, vec2(vTextureCoord.s, vTextureCoord.t));
    if (light){
        gl_FragColor = textureColor * vec4(lightIntensity, 1.0);
    }
    else {
        gl_FragColor = textureColor;
    }
    
}
