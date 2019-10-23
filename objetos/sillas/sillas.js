function iniciarObjectos3D() {
  var h = 1;
  var cant_sillas = 3;
  // es un contenedor
  var sillas = new Objeto3D(false, true);
  //
  var primerCilindro = new Cilindro(false, false);
  primerCilindro.escalar(0.25, 0.5, 0.25);
  sillas.agregarHijo(primerCilindro);

  var primerCono = new Cono(false, false, 15);
  primerCono.escalar(0.25, 1.0, 0.25);
  primerCono.transladar(0.0, 0.5, 0.0);
  sillas.agregarHijo(primerCono);

  var segundoCilindro = new Cilindro(false, false);
  segundoCilindro.escalar(0.25 * 0.85, 0.1, 0.25 * 0.85);
  segundoCilindro.transladar(0.0, 0.5 + 0.15, 0.0);
  sillas.agregarHijo(segundoCilindro);

  var segundoCono = new Cono(false, false, 10);
  segundoCono.escalar(0.25 * 0.85, 0.5, 0.25 * 0.85);
  segundoCono.transladar(0.0, 0.5 + 0.15 + 0.1, 0.0);
  sillas.agregarHijo(segundoCono);

  girable = new Objeto3D(false, true);
  girable.transladar(0.0, 0.5 + 0.15 + 0.1 + 0.05, 0.0);
  sillas.agregarHijo(girable);

  var tercerCilindro = new Cilindro(true, true);
  tercerCilindro.escalar(0.25 * 0.85 * 0.9, 1.0 * h, 0.25 * 0.85 * 0.9);
  girable.agregarHijo(tercerCilindro);

  TAMAÑO_ROTABLE = 1.2;
  rotable = new Objeto3D(false, true);
  rotable.transladar(0.0, 1.0 * h + 0.05, 0.0);
  girable.agregarHijo(rotable);

  var escable = new Objeto3D(false, false);
  escable.escalar(TAMAÑO_ROTABLE, 1.0, TAMAÑO_ROTABLE);
  rotable.agregarHijo(escable);

  var cuartoCilindro = new Cilindro(false, false);
  cuartoCilindro.escalar(1.0, 0.15, 1.0);
  escable.agregarHijo(cuartoCilindro);
  var conoAbajo = new Cono(false, false);
  conoAbajo.escalar(1.0, 0.15, 1.0);
  conoAbajo.rotar(Math.PI, vec3.fromValues(0.0, 0.0, 1.0));
  escable.agregarHijo(conoAbajo);
  var conoArriba = new Cono(false, false);
  conoArriba.escalar(1.0, 0.15, 1.0);
  conoArriba.transladar(0.0, 0.15, 0.0);
  escable.agregarHijo(conoArriba);

  var sillasCables = [];
  var i;
  var anguloDiscretizacion = 2 * Math.PI / cant_sillas;
  TAMAÑO_SILLA = 0.2;
  EXTRA_TAMAÑO_CABLE = 0.3;
  TAMAÑO_CABLE = h + EXTRA_TAMAÑO_CABLE;
  DISTANCIA_CABLE_CENTRO = 0.9;
  for (i = 0; i < cant_sillas; i++) {
    var sillaCable = new Objeto3D(false, true);
    rotable.agregarHijo(sillaCable);
    var angulo = i * anguloDiscretizacion;
    sillaCable.transladar( DISTANCIA_CABLE_CENTRO * Math.cos(angulo), 0.0, DISTANCIA_CABLE_CENTRO * Math.sin(angulo));
    sillasCables << sillaCable;

    var cable = new Cilindro(false, false);
    cable.escalar(0.02, TAMAÑO_CABLE, 0.02);
    cable.transladar(0.0, -TAMAÑO_CABLE, 0.0);
    sillaCable.agregarHijo(cable);

    var silla = new Silla(true);
    silla.escalar(TAMAÑO_SILLA, TAMAÑO_SILLA, TAMAÑO_SILLA);
    silla.rotar(Math.PI / 2, vec3.fromValues(0.0, 0.0, 1.0));
    silla.transladar(0.0,  -TAMAÑO_CABLE, 0.0);
    silla.transladar(TAMAÑO_SILLA / 2, -TAMAÑO_SILLA, -0.025);
    silla.rotar(-angulo, vec3.fromValues(0.0, 1.0, 0.0));
    sillaCable.agregarHijo(silla);
  }

  animados.push(sillas);
}
