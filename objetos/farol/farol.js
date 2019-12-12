 
function Farol() {
  Objeto3D.call(this, false, true); //Objeto3D.call(this, conTapa);

  this.crearFarol = function() {

    var palo = new Cilindro(false, true, 2.0, 0.06);
    var pantalla = new Esfera();

    var h = 2.0;
    //palo.escalar(0.15, h, 0.15);
    this.agregarHijo(palo);
    pantalla.transladar(0.0, h+0.19, 0.0);
    this.agregarHijo(pantalla);
    this.rotar(Math.PI/2, vec3.fromValues(1.0,0.0,0.0));
    //palo.light = false;
  }

  this.crearFarol();
  this.setupWebGLBuffers();
}
