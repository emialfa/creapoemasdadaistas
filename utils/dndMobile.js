let element = '';
const arrElementsCloned = []

export function touchStart(e) {
    if (e.target.parentNode !== element && typeof element !== 'string'){
        element.style.border = 'none';
        e.target.parentNode.style.border = '2px solid darkblue';
        e.target.parentNode.style.opacity = 1;
        element = e.target.parentNode;
    }
    else if (element.length == 0) {
        e.target.parentNode.style.border = '2px solid darkblue';
        e.target.parentNode.style.opacity = 1;
        element = e.target.parentNode;
    }
}

export function touchStartDrop (e) {
    let posElem = e.target.getBoundingClientRect()
    var touchLocation = e.targetTouches[0];
    var zoomLevel = getComputedStyle(document.body).zoom;
    let x;
    CSS.supports("zoom: 1") ? x = touchLocation.pageX/zoomLevel - posElem.left : x = touchLocation.pageX - posElem.left;
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
        const condition = arrElementsCloned.find(cloned => cloned == element.id)
        condition && element.parentNode.removeChild(element)
        element = '';
        e.target.style.boxShadow = 'inset 0 0 0 1px #555';
        setTimeout(() => 
        e.target.style.boxShadow= ''
        , 500)
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


  
        
    