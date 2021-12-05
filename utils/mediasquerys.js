export function mediasQuerys () {
if (window.matchMedia("(max-width: 1280px) and (max-height: 800px)").matches){
    document.body.style.zoom = 0.81;
}
if (window.matchMedia("(max-width: 1115px) and (max-height: 625px)").matches){
    document.body.style.zoom = 0.68;
}
if (window.matchMedia("(max-width: 1024px) and (max-height: 600px)").matches){
    document.body.style.zoom = 0.65;
}
if (window.matchMedia("(max-width: 540px) and (max-height: 720px)").matches){
    document.body.style.zoom = 0.56;
}
if (window.matchMedia("(max-width: 411px) and (max-height: 731px)").matches){
    document.body.style.zoom = 0.48;
}
if (window.matchMedia("(max-width: 360px) and (max-height: 640px)").matches){
    document.body.style.zoom = 0.42;
}
if (window.matchMedia("(max-width: 600px)").matches){
    document.body.style.zoom = 0.5;
}
if (window.matchMedia("(max-width: 500px)").matches){
    document.body.style.zoom = 0.45;
}
if (window.matchMedia("(max-width: 450px)").matches){
    document.body.style.zoom = 0.42;
}
if (window.matchMedia("(max-width: 411px)").matches){
    document.body.style.zoom = 0.4;
}
if (window.matchMedia("(max-width: 280px)").matches){
    document.body.style.zoom = 0.32;
}
}