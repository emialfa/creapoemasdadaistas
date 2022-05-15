let contador = 0; 
let elementoArrastradoActual = false;

export function start(e) {
  e.dataTransfer.effectAllowed = "move"; // Define el efecto como mover (Es el por defecto)
  e.dataTransfer.setData("Data", e.target.id, e.target.className); // Coje el elemento que se va a mover
  e.dataTransfer.setDragImage(e.target, 0, 0); 
  e.target.style.opacity = "0.4";
  elementoArrastradoActual = e.target.id;
}

export function end(e) {
  e.target.style.opacity = "";
  return (e.target.childNodes[0].textContent)
}

export function end1(e) {
  e.target.parentNode.removeChild(e.target)
}

export function enter(e) {
  if(!elementoArrastradoActual) return false;
  e.preventDefault();
  e.target.style.boxShadow = 'inset 0 0 0 1px #555';
}

export function leave(e) {
  e.preventDefault();
  e.target.style.boxShadow = ""
}

export function over(e) {
  e.preventDefault();
  if(!elementoArrastradoActual) return false;
  var id = e.target.id; // Elemento sobre el que se arrastra
  var clase = e.target.className;
  // return false para que se pueda soltar
  if (clase == "blanksheet__dropzone") {
    return false;
  }
  if (clase == "blanksheet__container") {
    return false; 
  }
  if (clase == "blanksheet__container") {
    return false; 
  }
  if (id == "cajaSustantivos") {
    return false; 
  }
  if (id == "cajaAdjetivos") {
    return false; 
  }
  if (id == "sustantivos") {
    return false; 
  }
  if (clase == "tarjeta__contenido1") {
    return false; 
  }

  if (id == "eliminar") {
    return false; 
  }
}

/**
 *
 * Mueve el elemento
 *
 **/
export function drop(e) {
  if(!elementoArrastradoActual) return false;
  var elementoArrastrado = e.dataTransfer.getData("Data");
  console.log(elementoArrastrado)
  var elementoClonado = document.getElementById(elementoArrastrado).cloneNode(true)
  elementoClonado.id = "ElemClonado" + elementoArrastrado; // Se cambia el id porque tiene que ser unico
  e.target.appendChild(elementoClonado); 

  elementoClonado.style.boxShadow = "none";
  elementoClonado.style.opacity = "";
  elementoClonado.setAttribute("draggable", "true");  
  elementoClonado.addEventListener("dragstart", start);  
  elementoClonado.addEventListener("dragend", end1);  

  e.target.style.border = 'none';
  e.target.style.boxShadow = 'none'
  elementoClonado.childNodes[0].style.cursor = 'pointer'
  let posElem = e.target.getBoundingClientRect()

  document.getElementById('blanksheetNotification').style.display = 'none'
 
  // Posicion absoluta del raton
  let x = e.pageX - posElem.left;
  
  elementoClonado.style.position = "absolute";
  elementoClonado.style.left = x + "px";
  elementoClonado.style.boxShadow = 'none';
  if(elementoArrastradoActual) elementoArrastradoActual = false;
}

/**
 *
 * Elimina el elemento que se mueve
 *
 **/
export function eliminar(e) {
  var elementoArrastrado = document.getElementById(e.dataTransfer.getData("Data")); // Elemento arrastrado
  elementoArrastrado.parentNode.removeChild(elementoArrastrado); // Elimina el elemento
}

/**
 *
 * Clona el elemento que se mueve
 *
 **/
export function clonar(e) {
  var elementoArrastrado = document.getElementById(e.dataTransfer.getData("Data")); // Elemento arrastrado

  elementoArrastrado.style.opacity = "";

  var elementoClonado = elementoArrastrado.cloneNode(true); // Se clona el elemento
  elementoClonado.id = "ElemClonado" + contador; // Se cambia el id porque tiene que ser unico
  contador += 1;
  elementoClonado.style.position = "static"; 
  e.target.appendChild(elementoClonado); // Se añade el elemento clonado
  e.target.style.border = ""; // Quita el borde del "cuadro clonador"
}
