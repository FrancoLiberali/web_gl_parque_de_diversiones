precision highp float;
uniform vec3 uAmbientColor;
uniform vec3 uDirectionalColor;
varying vec3 vVertexColor;
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vLightDir;

void main(void) {
    
    float shininess = 10.0;
	// Attenuation constants
	const float constantAtt = 1.0;
	const float linearAtt = 0.0001;
	const float quadraticAtt = 0.01;
	
    vec3 normal = vNormal;
	vec3 lightDir = normalize(vLightDir);
    vec3 viewDir = vViewDir;
    float lambertian = max(dot(lightDir, normal), 0.0);
    float specular = 0.2;
    if(lambertian > 0.0) {
        vec3 reflectDir = reflect(-lightDir, normal);
        float specAngle = max(dot(reflectDir, viewDir), 0.0);
        specular = pow(specAngle, shininess);
    }
    vec3 lightIntensity =  uAmbientColor + lambertian*uDirectionalColor*1.5; //+ specular*uDirectionalColor ;
    //gl_FragColor = vec4(vVertexColor.rgb * lightIntensity, 1.0);
    gl_FragColor = vec4(vNormal , 1.0);
}