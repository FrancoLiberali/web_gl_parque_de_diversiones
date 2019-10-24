iniciarObjectos3D = function() {
  sillas = new Sillas(app.alturaSillas, app.cantidadSillas);
  animados = [sillas];
}

function Sillas(h, cant_sillas) {
  // es un contenedor
  Objeto3D.call(this, false, true);

  this.crearSillas = function() {
    var primerCilindro = new Cilindro(false, false);
    primerCilindro.escalar(0.25, 0.5, 0.25);
    this.agregarHijo(primerCilindro);

    var primerCono = new Cono(false, false, 15);
    primerCono.escalar(0.25, 1.0, 0.25);
    primerCono.transladar(0.0, 0.5, 0.0);
    this.agregarHijo(primerCono);

    var segundoCilindro = new Cilindro(false, false);
    segundoCilindro.escalar(0.25 * 0.85, 0.1, 0.25 * 0.85);
    segundoCilindro.transladar(0.0, 0.5 + 0.15, 0.0);
    this.agregarHijo(segundoCilindro);

    var segundoCono = new Cono(false, false, 10);
    segundoCono.escalar(0.25 * 0.85, 0.5, 0.25 * 0.85);
    segundoCono.transladar(0.0, 0.5 + 0.15 + 0.1, 0.0);
    this.agregarHijo(segundoCono);

    this.girable = new Objeto3D(false, true);
    this.girable.transladar(0.0, 0.5 + 0.15 + 0.1 + 0.05, 0.0);
    this.agregarHijo(this.girable);

    var tercerCilindro = new Cilindro(true, true);
    tercerCilindro.escalar(0.25 * 0.85 * 0.9, 1.0 * h, 0.25 * 0.85 * 0.9);
    this.girable.agregarHijo(tercerCilindro);

    TAMAÑO_ROTABLE = 1.2;
    this.rotable = new Objeto3D(false, true);
    this.rotable.transladar(0.0, 1.0 * h + 0.05, 0.0);
    this.girable.agregarHijo(this.rotable);

    var escable = new Objeto3D(false, false);
    escable.escalar(TAMAÑO_ROTABLE, 1.0, TAMAÑO_ROTABLE);
    this.rotable.agregarHijo(escable);

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

    this.sillasCables = []
    var i;
    var anguloDiscretizacion = 2 * Math.PI / cant_sillas;
    TAMAÑO_SILLA = 0.2;
    EXTRA_TAMAÑO_CABLE = 0.3;
    TAMAÑO_CABLE = h + EXTRA_TAMAÑO_CABLE;
    DISTANCIA_CABLE_CENTRO = 0.9;
    for (i = 0; i < cant_sillas; i++) {
      var sillaCable = new Objeto3D(false, true);
      this.rotable.agregarHijo(sillaCable);
      var angulo = i * anguloDiscretizacion;
      sillaCable.rotar(-angulo, vec3.fromValues(0.0, 1.0, 0.0));
      sillaCable.transladar( DISTANCIA_CABLE_CENTRO * Math.cos(angulo), 0.0, DISTANCIA_CABLE_CENTRO * Math.sin(angulo));
      this.sillasCables.push(sillaCable);

      var cable = new Cilindro(false, false);
      cable.escalar(0.02, TAMAÑO_CABLE, 0.02);
      cable.transladar(0.0, -TAMAÑO_CABLE, 0.0);
      sillaCable.agregarHijo(cable);

      var silla = new Silla(true);
      silla.escalar(TAMAÑO_SILLA, TAMAÑO_SILLA, TAMAÑO_SILLA);
      silla.rotar(Math.PI / 2, vec3.fromValues(0.0, 0.0, 1.0));
      silla.transladar(0.0,  -TAMAÑO_CABLE, 0.0);
      silla.transladar(TAMAÑO_SILLA / 2, -TAMAÑO_SILLA, -0.025);
      sillaCable.agregarHijo(silla);
    }
  }
  this.crearSillas();

  this.girar = false;
  this.iniciarAnimacion = function() {
    this.girar = !this.girar;
  }


  var angulo_rotable;
  MAXIMO_ANGULO_ROTABLE = 0.1;
  this.animar = function() {
    var velocidad_angular = 0.1;
    if (this.girar) {
      var delta_angulo_rotable = Math.random() / 200 - 0.0025;
      // mantener el rotable con un angulo entre -0.1 y 0.1
      if (angulo_rotable > MAXIMO_ANGULO_ROTABLE && delta_angulo_rotable > 0 ||
        angulo_rotable < -MAXIMO_ANGULO_ROTABLE && delta_angulo_rotable < 0) {
        delta_angulo_rotable = -delta_angulo_rotable;
      }
      angulo_rotable += delta_angulo_rotable;
      this.girable.rotar(velocidad_angular, vec3.fromValues(0.0, -1.0, 0.0));
      this.rotable.rotar(delta_angulo_rotable, vec3.fromValues(0.0, 0.0, 1.0));
      _.each(this.sillasCables, function(sillaCable) {
        sillaCable.setRotacion(velocidad_angular, vec3.fromValues(0.0, 0.0, 1.0));
      });
    }
  }
}
