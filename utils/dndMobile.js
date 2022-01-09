import {start, end1} from './draganddrop'
    
    /* listen to the touchMove event,
    every time it fires, grab the location
    of touch and assign it to box */
    
    function preventDefault(e) {
        e.preventDefault();
    }
    let elementId = '';
    let element = '';
    const arrElementsCloned = []
export function touchStart(e) {
        //e.preventDefault()
        //window.addEventListener('touchscroll', (e) => {e.preventDefault(); e.stopPropagation()}, { passive: false })
        console.log(e.target)
        if (e.target.parentNode !== element && typeof element !== 'string'){
            element.style.border = 'none';
            e.target.parentNode.style.border = '2px solid darkblue';
            e.target.parentNode.style.opacity = 1;
            element = e.target.parentNode;
            console.log(element)
        }
        else if (element.length == 0) {
            e.target.parentNode.style.border = '2px solid darkblue';
            e.target.parentNode.style.opacity = 1;
            element = e.target.parentNode;
            console.log(element)
        }
    }

export function touchStartDrop (e) {
    let posElem = e.target.getBoundingClientRect()
    console.log(e.target)
    var touchLocation = e.targetTouches[0];
    var zoomLevel = getComputedStyle(document.body).zoom;
    let x = touchLocation.pageX/zoomLevel - posElem.left;
    const move = arrElementsCloned.find(cloned => cloned == e.target.parentNode.id) ? true : false
    if(move){
        return ''
    }
    else if(arrElementsCloned.find(cloned => cloned == element.id)){
        e.target.appendChild(element);
        element.style.position = 'absolute'
        element.style.left = x + "px";
        element.style.boxShadow = 'none';
        element.style.border = 'none';
        element = '';
        e.target.style.boxShadow = 'inset 0 0 0 1px #555';
        setTimeout(() => 
        e.target.style.boxShadow= ''
        , 500)
        return '';
    }
    else if (typeof element !== 'string'){
        console.log(x)
        const elementCloned = element.cloneNode(true)
        e.target.appendChild(elementCloned)
        elementCloned.id = element.id+'cloned'
        elementCloned.style.position = 'absolute'
        elementCloned.style.left = x + "px";
        elementCloned.style.boxShadow = 'none';
        elementCloned.style.border = 'none';
        elementCloned.style.opacity = 1;
        arrElementsCloned.push(elementCloned.id)
        elementCloned.addEventListener("touchstart", touchStart); 
        const elementText = element.childNodes[0].textContent
        document.getElementById('blanksheetNotification').style.display = 'none'
        console.log(element.id)
        console.log(elementCloned.id)
        console.log(arrElementsCloned)
        const condition = arrElementsCloned.find(cloned => cloned == element.id)
        condition && element.parentNode.removeChild(element)
        element = '';
        e.target.style.boxShadow = 'inset 0 0 0 1px #555';
        setTimeout(() => 
        e.target.style.boxShadow= ''
        , 500)
       console.log(condition)
        return condition ? '' : elementText;
    }
    return '';
}

export function touchStartDelete (e) {
     if(arrElementsCloned.find(cloned => cloned == element.id)){
         const elementToRemove = document.getElementById(element.id)
         elementToRemove.parentNode.removeChild(elementToRemove)
         element = ""
     }
     else {
        const elementText = element.childNodes[0].textContent
        return elementText
     }
}


  export function touchMove(e) {
      // grab the location of touch
      var touchLocation = e.targetTouches[0];
      var box = e.target;
      var wWidth = window.innerWidth
      e.target.style.position = 'fixed'
      if (wWidth < 1429 && wWidth > 1060) {
        console.log(0.8)
        let x = touchLocation.pageX
        let y = touchLocation.pageY

        box.style.left = x * 1.2+ 'px';
        box.style.top = y * 1.2 + 'px';
      }
      else {
      // assign box new coordinates based on the touch.
      box.style.left = touchLocation.pageX + 'px';
      box.style.top = touchLocation.pageY - 15 + 'px';
      }
      let elementMouseIsOver = document.elementFromPoint(touchLocation.pageX, touchLocation.pageY);
      if(elementMouseIsOver) {
      if (elementMouseIsOver.id !== elementId){
        if (elementId.indexOf('blanksheet') >= 0) {
            document.getElementById(elementId).style.boxShadow = 'none';
        }
        elementId = elementMouseIsOver.id;
      }
      if (elementMouseIsOver.id.indexOf('blanksheet') >= 0) {
      elementMouseIsOver.style.boxShadow = 'inset 0 0 0 1px #555';
      }
    }
    }
    
    /* record the position of the touch
    when released using touchend event.
    This will be the drop position. */
    
    export function touchEnd(e) {
        // current box position.
        let pos = document.getElementById('blanksheet').getBoundingClientRect()
        var elementoClonado = e.target.cloneNode(true)
        elementoClonado.id = "ElemClonado" + e.target.id; // Se cambia el id porque tiene que ser unico
        //e.target.appendChild(document.getElementById(elementoArrastrado)); 
        
        elementoClonado.style.boxShadow = "none"; 
        //document.getElementById(elementoArrastrado).style.boxShadow = "none"; 
        e.target.style.border = 'none';
        e.target.style.boxShadow = 'none'
        var box = e.target;
        var x = parseFloat(box.style.left)
        var wWidth = window.innerWidth
        if (wWidth < 1429 && wWidth > 1060) {
            var y = parseFloat(box.style.top) / 1.2
        }
        else {
            var y = parseFloat(box.style.top)
        }
        var elementMouseIsOver = document.elementFromPoint(x, y);
        if(elementMouseIsOver) {
            if (elementMouseIsOver.id.indexOf('blanksheet') >= 0){
            elementMouseIsOver.appendChild(elementoClonado); 
            //elementMouseIsOver.appendChild(e.target)
            elementMouseIsOver.style.boxShadow = 'none'
            let posX = x - pos.left;
            /*e.target.style.boxShadow = 'none'
            e.target.style.left = posX + "px";
            e.target.style.top = '0';*/
            elementoClonado.style.position = 'absolute'
            elementoClonado.style.opacity = "";  
            elementoClonado.style.left = posX + "px";
            elementoClonado.style.top = '0';
            elementoClonado.setAttribute("draggable", "true");  
            elementoClonado.addEventListener("dragstart", start);  
            elementoClonado.addEventListener("dragend", end1);
            elementoClonado.addEventListener("touchmove", touchMove);  
            elementoClonado.addEventListener("touchend", touchEnd1);
            return (e.target.textContent)       
        }
        else {
            if (elementId.indexOf('blanksheet') >= 0) {
                document.getElementById(elementId).style.boxShadow = 'none';
            }
            return (e.target.textContent)        }
        } else {
            if (elementId.indexOf('blanksheet') >= 0) {
                document.getElementById(elementId).style.boxShadow = 'none';
            }
            return (e.target.textContent)
        }
    }

    function touchEnd1(e) {
        touchEnd(e)
        e.target.parentNode.removeChild(e.target)
    }
        
    