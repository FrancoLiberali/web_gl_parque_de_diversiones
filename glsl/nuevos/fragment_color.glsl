precision highp float;

uniform vec3 uAmbientColor;
uniform vec3 uDirectionalColor;
uniform bool light;

uniform vec3 uLightPosition;
uniform vec3 uLightPosition1;
uniform vec3 uLightPosition2;
uniform vec3 uLightPosition3;
uniform vec3 uLightPosition4;
uniform vec3 uLightPosition5;
uniform vec3 uLightPosition6;
uniform vec3 uLightPosition7;
uniform vec3 uLightPosition8;

//uniform float constantAmbient;
//uniform float constantDiffuse;
//uniform float constantSpecular;
//uniform float glossiness;

varying vec3 vSurfaceToView;

varying highp vec4 vColor;
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vPos;

void main(void) {

    const float constantAmbient = 0.50;
    const float constantDiffuse = 0.950;
    const float constantSpecular = 0.8;
    float glossiness = 30.0;
    
    vec3 vLightDir  = uLightPosition - vPos;
    vec3 vLightDir1 = uLightPosition1 - vPos;
    vec3 vLightDir2 = uLightPosition2 - vPos;
    vec3 vLightDir3 = uLightPosition3 - vPos;
    vec3 vLightDir4 = uLightPosition4 - vPos;
    vec3 vLightDir5 = uLightPosition5 - vPos;
    vec3 vLightDir6 = uLightPosition6 - vPos;
    vec3 vLightDir7 = uLightPosition7 - vPos;
    vec3 vLightDir8 = uLightPosition8 - vPos;

    float distance0 = distance(uLightPosition, vPos);
    float distance1 = distance(uLightPosition1, vPos);
    float distance2 = distance(uLightPosition2, vPos);
    float distance3 = distance(uLightPosition3, vPos);
    float distance4 = distance(uLightPosition4, vPos);
    float distance5 = distance(uLightPosition5, vPos);
    float distance6 = distance(uLightPosition6, vPos);
    float distance7 = distance(uLightPosition7, vPos);
    float distance8 = distance(uLightPosition8, vPos);

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

    float p0 = 1.0;

    float diffuseCos =  max(dot(lightDir, normal), 0.0)/pow(distance0, p0);
    float diffuseCos1 = max(dot(lightDir1, normal), 0.0)/pow(distance1, p0);
    float diffuseCos2 = max(dot(lightDir2, normal), 0.0)/pow(distance2, p0);
    float diffuseCos3 = max(dot(lightDir3, normal), 0.0)/pow(distance3, p0);
    float diffuseCos4 = max(dot(lightDir4, normal), 0.0)/pow(distance4, p0);
    float diffuseCos5 = max(dot(lightDir5, normal), 0.0)/pow(distance5, p0);
    float diffuseCos6 = max(dot(lightDir6, normal), 0.0)/pow(distance6, p0);
    float diffuseCos7 = max(dot(lightDir7, normal), 0.0)/pow(distance7, p0);
    float diffuseCos8 = max(dot(lightDir8, normal), 0.0)/pow(distance8, p0);

    vec3 surfaceToViewDirection = normalize(vSurfaceToView);

    //faro0    
    vec3 halfVector = normalize(lightDir + surfaceToViewDirection);

    float specular = 0.0;
    if (diffuseCos > 0.0) {
        specular = pow(dot(vNormal, halfVector), glossiness);
    }

    //faro1
    vec3 halfVector1 = normalize(lightDir1 + surfaceToViewDirection);

    float specular1 = 0.0;
    if (diffuseCos1 > 0.0) {
        specular1 = pow(dot(vNormal, halfVector1), glossiness);
    }

    //faro2
    vec3 halfVector2 = normalize(lightDir2 + surfaceToViewDirection);

    float specular2 = 0.0;
    if (diffuseCos2 > 0.0) {
        specular2 = pow(dot(vNormal, halfVector2), glossiness);
    }

    //faro3
    vec3 halfVector3 = normalize(lightDir3 + surfaceToViewDirection);

    float specular3 = 0.0;
    if (diffuseCos3 > 0.0) {
        specular3 = pow(dot(vNormal, halfVector3), glossiness);
    }

    //faro4
    vec3 halfVector4 = normalize(lightDir4 + surfaceToViewDirection);

    float specular4 = 0.0;
    if (diffuseCos4 > 0.0) {
        specular4 = pow(dot(vNormal, halfVector4), glossiness);
    }

    //faro5
    vec3 halfVector5 = normalize(lightDir5 + surfaceToViewDirection);

    float specular5 = 0.0;
    if (diffuseCos5 > 0.0) {
        specular5 = pow(dot(vNormal, halfVector5), glossiness);
    }

    //faro6
    vec3 halfVector6 = normalize(lightDir6 + surfaceToViewDirection);

    float specular6 = 0.0;
    if (diffuseCos6 > 0.0) {
        specular6 = pow(dot(vNormal, halfVector6), glossiness);
    }

    //faro7
    vec3 halfVector7 = normalize(lightDir7 + surfaceToViewDirection);

    float specular7 = 0.0;
    if (diffuseCos7 > 0.0) {
        specular7 = pow(dot(vNormal, halfVector7), glossiness);
    }

    //faro8
    vec3 halfVector8 = normalize(lightDir8 + surfaceToViewDirection);

    float specular8 = 0.0;
    if (diffuseCos8 > 0.0) {
        specular8 = pow(dot(vNormal, halfVector8), glossiness);
    }
    


   
	
    
    
    //faro0
    //if(diffuseCos > 0.0) {
    //     vec3 reflectDir = reflect(-lightDir, normal);
    //     float specularCos = max(dot(reflectDir, viewDir), 0.0);
    //     specular = pow(specularCos, glossiness);
    //}

    specular  = specular/pow(distance0, p0);
    specular1 = specular1/pow(distance1, p0);
    specular2 = specular2/pow(distance2, p0);
    specular3 = specular3/pow(distance3, p0);
    specular4 = specular4/pow(distance4, p0);
    specular5 = specular5/pow(distance5, p0);
    specular6 = specular6/pow(distance6, p0);
    specular7 = specular7/pow(distance7, p0);
    specular8 = specular8/pow(distance8, p0);

    float difusseAngle =  diffuseCos + diffuseCos1 + diffuseCos2 + diffuseCos3 + diffuseCos4 + diffuseCos5 + diffuseCos6 + diffuseCos7 + diffuseCos8;

    float specularFinal = specular + specular1 + specular2 + specular3 + specular4 + specular5 + specular6 + specular7 + specular8; 

    vec3 lightIntensity =  constantAmbient*uAmbientColor + constantDiffuse*difusseAngle*uDirectionalColor + constantSpecular*specularFinal*uDirectionalColor;
    
   

    if (light){
         gl_FragColor = vec4(vColor.rgb * lightIntensity, 1.0);
    }
    else {
        gl_FragColor = vColor;
    }

}
