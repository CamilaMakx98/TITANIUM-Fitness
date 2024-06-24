"use strict"


function generateCaptcha() {
   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let captcha = '';
   for (let i = 0; i < 6; i++) {
       captcha += chars.charAt(Math.floor(Math.random() * chars.length));
   }
   return captcha;
}

function setCaptcha() {
   const captchaText = document.getElementById('captcha-text');
   captchaText.textContent = generateCaptcha();
}

document.addEventListener('DOMContentLoaded', () => {
   setCaptcha();

   const refreshCaptchaBtn = document.getElementById('refresh-captcha');
   refreshCaptchaBtn.addEventListener('click',setCaptcha);

   const form = document.getElementById('form');
   form.addEventListener('submit', (event) => {
       event.preventDefault();

       const nombre = form.nombre.value.trim();
       const genero = form.genero.value.trim();
       const email = form.email.value.trim();
       const telefono = form.telefono.value.trim();
       const texto = form.texto.value.trim();
       const captchaInput = form['captcha-input'].value.trim();
       const captchaText = document.getElementById('captcha-text').textContent;
       const mensaje = document.getElementById('form-result');

       if (captchaInput === captchaText) {     


          document.getElementById('form-result').textContent = 'Formulario enviado correctamente.';
           document.getElementById('form-result').style.color = 'green';
           mensaje.innerHTML = "<p>Se envió correctamente</p>";
       } 
       
       else {

           document.getElementById('form-result').textContent = 'CAPTCHA incorrecto. Inténtalo de nuevo.';
           document.getElementById('form-result').style.color = 'red';
           setCaptcha();
           mensaje.innerHTML = "<p>Captcha incorrecto</p>"; 
           
       }
   });
});