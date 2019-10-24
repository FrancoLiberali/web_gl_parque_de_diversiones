var sillas = null;

var app = {
  alturaSillas: 1.0,
  cantidadSillas: 6,
	velocidadSillas: 0.0,
	iniciarAnimacionSillas: function() {
		sillas.iniciarAnimacion();
	},
	// detenerAnimacionSillas: function() {
		// girar = !girar;
	// }
  // detenerSillas: function() {
    // alert("apreto detener");
  // },
};

function GUI() {
  // creamos el menu
  var gui = new dat.GUI();

  // definimos una carpeta comandos en la variable f1
  var f1 = gui.addFolder('Comandos');

  //el metodo add recibe un objeto y el nombre del atributo o funcion en forma de STRING
  f1.add(window, 'iniciarObjectos3D').name("Reiniciar");
  f1.add(app, 'iniciarAnimacionSillas').name("Iniciar animacion sillas");
  // f1.add(app, 'detenerAnimacionSillas').name("Detener animacion sillas");

  f1.open(); // hace que la carpeta f1 inicie abierta

  var f2 = gui.addFolder('Parametros sillas');

  f2.add(app, 'alturaSillas', 1.0, 3.0).name("Altura sillas").step(0.5);
  f2.add(app, 'cantidadSillas', 3, 12).name("Cantidad de sillas").step(1);
  f2.add(app, 'velocidadSillas', 0.0, 3.0).name("Velocidad máxima sillas").step(0.5);

  f2.open();
};

GUI();
