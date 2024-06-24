"use strict";

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".btn_menu").addEventListener("click", desplegarMenu);

    function desplegarMenu() {
        document.querySelector(".botonera").classList.toggle("mostrar");
    }

    let isTitle = true;
    
    setInterval(() => {
        let inicio = document.querySelector("#inicio");
        if (inicio) {
            inicio.innerHTML = isTitle ? "TITANIUM Fitness" : "¡BIENVENIDO!";
            isTitle = !isTitle;
        }
    }, 2000);

    setInterval(() => {
        let actv = document.querySelector("#activ");
        if (actv) {
            actv.innerHTML = isTitle ? "Actividades" : "¡Empieza a entrenar!";
            isTitle = !isTitle;
        }
    }, 2000);

    setInterval(() => {
        let salud = document.querySelector("#salud");
        if (salud) {
            salud.innerHTML = isTitle ? "Salud" : "Asesórate con nosotros";
            isTitle = !isTitle;
        }
    }, 2000);

    setInterval(() => {
        let contacto = document.querySelector("#contacto");
        if (contacto) {
            contacto.innerHTML = isTitle ? "Contacto" : "¡Comunícate ahora!";
            isTitle = !isTitle;
        }
    }, 2000);
});
