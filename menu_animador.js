var sillas = null;

var app = {
  alturaSillas: 1.0,
  cantidadSillas: 6,
  velocidadSillas: 5,
  iniciarAnimacionSillas: function() {
    sillas.iniciarAnimacion();
  },
  detenerAnimacionSillas: function() {
    sillas.detenerAnimacion();
  },
  cantidadDePilares: 8,
  pista: 0,
};

function GUI() {
  // creamos el menu
  var gui = new dat.GUI();

  // definimos una carpeta comandos en la variable f1
  var f1 = gui.addFolder('Sillas');

  //el metodo add recibe un objeto y el nombre del atributo o funcion en forma de STRING
  f1.add(window, 'iniciarObjectos3D').name("Reiniciar");
  f1.add(app, 'iniciarAnimacionSillas').name("Iniciar animación");
  f1.add(app, 'detenerAnimacionSillas').name("Pausar animación");

  f1.open(); // hace que la carpeta f1 inicie abierta

  var f2 = f1.addFolder('Parametros sillas');

  f2.add(app, 'alturaSillas', 1.0, 3.0).name("Altura").step(0.5);
  f2.add(app, 'cantidadSillas', 3, 12).name("Cantidad").step(1);
  f2.add(app, 'velocidadSillas', 5, 10).name("Velocidad").step(0.5);

  f2.open();

  var f3 = gui.addFolder('Parametros montaña rusa');

  f3.add(app, 'cantidadDePilares', 8.0, 20.0).name("Pilares").step(1);
  f3.add(app, 'pista', 0, 2).name("Pista").step(1);

  f3.open();
};

GUI();
