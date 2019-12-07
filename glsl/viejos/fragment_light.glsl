precision highp float;

varying vec3 vNormal;
varying vec3 vPosWorld;
varying highp vec3 vColor;

varying vec3 v_surfaceToLight;

void main(void) {

	vec3 normal = normalize(vNormal);
	vec3 lightVec = normalize(vec3(0.0, 0.0, 1.0));							// vector fuente de luz
	
	float sun_light = dot(lightVec,normal);
	
	vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
	float faro_1_light = dot(normal, surfaceToLightDirection);

	gl_FragColor = vec4(vColor,1.0);
	if(faro_1_light < 0.0) faro_1_light *= -1.0; //modulo
	
	gl_FragColor.rgb *= faro_1_light;
}

