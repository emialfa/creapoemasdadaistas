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


  
        
    