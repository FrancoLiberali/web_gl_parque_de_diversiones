precision highp float;

uniform vec3 uAmbientColor;
uniform vec3 uDirectionalColor;
varying vec3 vVertexColor;
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

uniform float noiseScale;
uniform sampler2D uSampler0;
uniform sampler2D uSampler1;
uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

// Perlin Noise						
						
vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) 
{
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec3 P)
{
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

	vec4 gx0 = ixy0 * (1.0 / 7.0);
	vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
	gx0 = fract(gx0);
	vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
	vec4 sz0 = step(gz0, vec4(0.0));
	gx0 -= sz0 * (step(0.0, gx0) - 0.5);
	gy0 -= sz0 * (step(0.0, gy0) - 0.5);

	vec4 gx1 = ixy1 * (1.0 / 7.0);
	vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
	gx1 = fract(gx1);
	vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
	vec4 sz1 = step(gz1, vec4(0.0));
	gx1 -= sz1 * (step(0.0, gx1) - 0.5);
	gy1 -= sz1 * (step(0.0, gy1) - 0.5);

	vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
	vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
	vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
	vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
	vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
	vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
	vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
	vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

	vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
	g000 *= norm0.x;
	g010 *= norm0.y;
	g100 *= norm0.z;
	g110 *= norm0.w;
	vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
	g001 *= norm1.x;
	g011 *= norm1.y;
	g101 *= norm1.z;
	g111 *= norm1.w;

	float n000 = dot(g000, Pf0);
	float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
	float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
	float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
	float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
	float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
	float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
	float n111 = dot(g111, Pf1);

	vec3 fade_xyz = fade(Pf0);
	vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
	vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
	float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
	return 2.2 * n_xyz;
}

			
			
			// ***************************************************************************
			
			
			
void main(void) {
	// uSampler0: tierra
	// uSampler1: tierraSeca
	// uSampler2: pasto
			   
	float c=cnoise(vTextureCoord.xyx*2.0);
			  
	//gl_FragColor = vec4(c,c,c,1.0);

	vec4 textureColor0 = texture2D(uSampler0,vTextureCoord*3.0);
	vec4 textureColor1 = texture2D(uSampler1,vTextureCoord*3.0);
	vec4 textureColor2 = texture2D(uSampler2,vTextureCoord*3.0);

	vec3 tierra = vec3(0.0);

	float pct = 0.25;

	// Mix uses pct (a value from 0-1) to
	// mix the two colors
	tierra = mix(textureColor0.xyz, textureColor1.xyz, pct);
	

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
    //gl_FragColor = vec4(vec3(0.0,1.0,0.0) * lightIntensity, 1.0);
    //gl_FragColor = vec4(vVertexColor.rgb * lightIntensity, 1.0);

    //gl_FragColor = vec4(vNormal , 1.0);

	//gl_FragColor = 	textureColor0;
	gl_FragColor = (vec4(tierra,1.0)*c+textureColor2*(1.0-c)) * vec4(lightIntensity, 1.0);
}