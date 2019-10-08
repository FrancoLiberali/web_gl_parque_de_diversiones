function iniciarObjectos3D() {
  // es un contenedor
  var sillas = new Objeto3D(false, true);
  var cilindro = new Cilindro(false, false);
  cilindro.escalar(1.0, 0.30, 1.0);
  cilindro.transladar(0.0, 0.2, 0.0);
  sillas.agregarHijo(cilindro);
  var conoAbajo = new Cono(false, false);
  conoAbajo.escalar(1.0, 0.20, 1.0);
  conoAbajo.rotar(Math.PI, vec3.fromValues(0.0, 0.0, 1.0));
  conoAbajo.transladar(0.0, 0.2, 0.0);
  sillas.agregarHijo(conoAbajo);

  var conoArriba = new Cono(false, false);
  conoArriba.escalar(1.0, 0.20, 1.0);
  conoArriba.transladar(0.0, 0.30 + 0.2, 0.0);
  sillas.agregarHijo(conoArriba);

  animados.push(sillas);
}
