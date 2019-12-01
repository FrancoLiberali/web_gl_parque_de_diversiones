precision mediump float;

varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

uniform sampler2D uSampler0;

void main(void) {
	vec4 textureColor = texture2D(uSampler0, vec2(vTextureCoord.s, vTextureCoord.t));
	gl_FragColor = textureColor;
}