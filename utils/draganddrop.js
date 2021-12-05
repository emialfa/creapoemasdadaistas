let contador = 0; // Variable global para tener poder poner un id unico a cada elemento cuando se clona.
export function start(e) {
  e.dataTransfer.effectAllowed = "move"; // Define el efecto como mover (Es el por defecto)
  let prob=e.dataTransfer.setData("Data", e.target.id, e.target.className); // Coje el elemento que se va a mover
  let peob=e.dataTransfer.setDragImage(e.target, 0, 0); // Define la imagen que se vera al ser arrastrado el elemento y por donde se coje el elemento que se va a mover (el raton aparece en la esquina sup_izq con 0,0)
  e.target.style.opacity = "0.4";
  var id = e.target.id;
  var clase = e.target.className;
  console.log(e.target.id)
  /*if (clase == "cajaart") {
    punto = document.createElement("div");
    punto.innerHTML =
      "<div id='cajael " +
      contador++ +
      " ' " +
      "class='cajaart' draggable='true' ondragstart='start(event)' ondragend='end(event)'>" +
      "<div id='subcajaart" +
      contador++ +
      "' class='subcajaart'><div id='tarjetacontenidoel" +
      contador++ +
      "' class='tarjeta_contenidoel'>" +
      "el" +
      "</div>" +
      "</div></div>" +
      "</div>";
    var cajasignos = document.querySelector("#articulos");
    cajasignos.appendChild(punto);
  }*/
}

export function end(e) {
  e.target.style.opacity = ""; // Pone la opacidad del elemento a 1
  /*e.dataTransfer.clearData("Data");*/
  var id = e.target.id;
  var clase = e.target.className;
  return (e.target.childNodes[0].textContent)
  /*if (clase == "tarjeta__contenido6") {
    punto = document.createElement("div");
    punto.innerHTML =
      "<div id='admiracionr " +
      contador++ +
      " ' " +
      "class='tarjeta__contenido6' draggable='true' ondragstart='start(event)' ondragend='end(event)'>" +
      "!" +
      "</div>" +
      "</div>";
    var cajasignos = document.querySelector("#cajaadmiracion2");
    cajasignos.appendChild(punto);
  }*/
}

export function end1(e) {
  e.target.parentNode.removeChild(e.target)
}
export function enter(e) {
    e.preventDefault();
  //e.target.style.border = "3px dotted #555";
  e.target.style.boxShadow = 'inset 0 0 0 1px #555';
}

export function leave(e) {
  e.preventDefault();
  //e.target.style.border = "";
  e.target.style.boxShadow = ""
}

export function over(e) {
 e.preventDefault();
  var elemArrastrable = e.dataTransfer.getData("Data"); // Elemento arrastrado
  var id = e.target.id; // Elemento sobre el que se arrastra
  var clase = e.target.className;
  // return false para que se pueda soltar
  if (clase == "blanksheet__dropzone") {
    return false; // Cualquier elemento se puede soltar sobre el div destino 1
  }
  /*if ((clase == "cajabase") && (elemArrastrable != id)) {
    return false; // Cualquier elemento se puede soltar sobre el div destino 1
  }
  if ((clase == "caja") && (elemArrastrable != id)){
    return false; // Cualquier elemento se puede soltar sobre el div destino 1
  }
  if ((clase == "tarjeta__contenido")&& (elemArrastrable != id)) {
    return false; // Cualquier elemento se puede soltar sobre el div destino 1
  }
  if ((clase == "flechita")&& (elemArrastrable != id)) {
    return false; // Cualquier elemento se puede soltar sobre el div destino 1
  }
  if ((clase == "singular")&& (elemArrastrable != id)) {
    return false; // Cualquier elemento se puede soltar sobre el div destino 1
  }
  if ((clase == "plural")&& (elemArrastrable != id)) {
    return false; // Cualquier elemento se puede soltar sobre el div destino 1
  }*/
  if (clase == "blanksheet__container") {
    return false; // Cualquier elemento se puede soltar sobre el div destino 1
  }
  if (clase == "blanksheet__container") {
    return false; // Cualquier elemento se puede soltar sobre el div destino 1
  }
  if (id == "cajaSustantivos") {
    return false; // Cualquier elemento se puede soltar sobre el div destino 1
  }
  if (id == "cajaAdjetivos") {
    return false; // Cualquier elemento se puede soltar sobre el div destino 1
  }
  if (id == "sustantivos") {
    return false; // Cualquier elemento se puede soltar sobre el div destino 1
  }

  if (clase == "tarjeta__contenido1") {
    return false; // Cualquier elemento se puede soltar sobre el div destino 1
  }

  if (id == "eliminar") {
    return false; // Cualquier elemento se puede soltar sobre el div destino 1
  }
  /*if ((id == 'Tablero1') && (elemArrastrable != 'arrastrable3')){
				return false; // En el cuadro2 se puede soltar cualquier elemento menos el elemento con id=arrastrable3
			}	
			if (id == 'cuadro3')
				return false;
	
			if (id == 'papelera')
				return false; // Cualquier elemento se puede soltar en la papelera*/
}

/**
 *
 * Mueve el elemento
 *
 **/
export function drop(e) {
  var elementoArrastrado = e.dataTransfer.getData("Data");
  console.log(elementoArrastrado)
  var elementoClonado = document.getElementById(elementoArrastrado).cloneNode(true)
  elementoClonado.id = "ElemClonado" + elementoArrastrado; // Se cambia el id porque tiene que ser unico
  e.target.appendChild(elementoClonado); 
  //e.target.appendChild(document.getElementById(elementoArrastrado)); 

  elementoClonado.style.boxShadow = "none";
  elementoClonado.style.opacity = "";
  elementoClonado.setAttribute("draggable", "true");  
  elementoClonado.addEventListener("dragstart", start);  
  elementoClonado.addEventListener("dragend", end1);  

  //document.getElementById(elementoArrastrado).style.boxShadow = "none"; 
  e.target.style.border = 'none';
  e.target.style.boxShadow = 'none'
  elementoClonado.childNodes[0].style.cursor = 'pointer'
  let posElem = e.target.getBoundingClientRect()

  document.getElementById('blanksheetNotification').style.display = 'none'
  /*const rows = []
  for (let r = 0; r <= posElem.height; r += posElem.height/10){
      rows.push(r);
  }*/

  // Posicion absoluta del raton
  let x = e.pageX - posElem.left;
  /*let y = e.pageY - posElem.top;
  
  let closest = [0, 0];
  rows.map((f, indice)=> {
      if(indice === 0){
        closest[0] = Math.abs(y-f);
        closest[1] = f;
      }
      else if(closest[0] > Math.abs(y - f)){
        closest[0] = Math.abs(y-f);
        closest[1] = f;
        console.log(closest)
      }
  })*/
  elementoClonado.style.position = "absolute";
  elementoClonado.style.left = x + "px";
  elementoClonado.style.boxShadow = 'none';
  //document.getElementById(elementoArrastrado).style.position = "absolute";
  //document.getElementById(elementoArrastrado).style.left = x + "px";

}

/**
 *
 * Elimina el elemento que se mueve
 *
 **/
export function eliminar(e) {
  var elementoArrastrado = document.getElementById(
    e.dataTransfer.getData("Data")
  ); // Elemento arrastrado
  elementoArrastrado.parentNode.removeChild(elementoArrastrado); // Elimina el elemento
}

/**
 *
 * Clona el elemento que se mueve
 *
 **/
export function clonar(e) {
  var elementoArrastrado = document.getElementById(
    e.dataTransfer.getData("Data")
  ); // Elemento arrastrado

  elementoArrastrado.style.opacity = ""; // Dejamos la opacidad a su estado anterior para copiar el elemento igual que era antes

  var elementoClonado = elementoArrastrado.cloneNode(true); // Se clona el elemento
  elementoClonado.id = "ElemClonado" + contador; // Se cambia el id porque tiene que ser unico
  contador += 1;
  elementoClonado.style.position = "static"; // Se posiciona de forma "normal" (Sino habria que cambiar las coordenadas de la posición)
  e.target.appendChild(elementoClonado); // Se añade el elemento clonado
  e.target.style.border = ""; // Quita el borde del "cuadro clonador"
}

/*function dropclon(e) {
  var elementoArrastrado = e.dataTransfer.getData("Data"); // Elemento arrastrado
  e.target.appendChild(document.getElementById(elementoArrastrado)); // Quita el borde

  var cajasignos = document.querySelector("#cajapuntos");
  var signos = document.createElement("div");
  tarjeta.innerHTML =
    "<div id=', " +
    elemento +
    " ' " +
    "class='tarjeta__contenido1' draggable='true' ondragstart='start(event)' ondragend='end(event)'>" +
    "," +
    "</div>" +
    "</div>";

  signos.appendChild(cajasignos);

  // e.target.style.border = "";
  tamContX = $("#" + e.target.id).width();
  tamContY = $("#" + e.target.id).height();

  tamElemX = $("#" + elementoArrastrado).width();
  tamElemY = $("#" + elementoArrastrado).height();

  posXCont = $("#" + e.target.id).position().left;
  posYCont = $("#" + e.target.id).position().top;

  // Posicion absoluta del raton
  x = e.layerX;
  y = e.layerY;

  // Si parte del elemento que se quiere mover se queda fuera se cambia las coordenadas para que no sea asi
  if (posXCont + tamContX <= x + tamElemX) {
    x = posXCont + tamContX - tamElemX;
  }

  if (posYCont + tamContY <= y + tamElemY) {
    y = posYCont + tamContY - tamElemY;
  }

  document.getElementById(elementoArrastrado).style.position = "absolute";
  document.getElementById(elementoArrastrado).style.left = x + "px";
  document.getElementById(elementoArrastrado).style.top = y + "px";
}*/