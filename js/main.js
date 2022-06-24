var navbar = document.getElementById('navbar');
var menuText = document.querySelectorAll('#menuText .nav-item a');
var logo = document.getElementById('logo');
var logooff = document.getElementById('logooff');
var carga = document.getElementById('carga');
var navbar = document.querySelector('.menu-icon');

const loading = () => {
    setTimeout(function() {
        carga.classList.remove('d-flex');
        carga.classList.add('d-none');
    },1000);
    carga.classList.remove('d-none');
    carga.classList.add('d-flex');
}


window.onload = function() {
    loading();
}

window.addEventListener('offline', event => {
    console.log('Estoy Offline!!');
    navbar.classList.add('bg-dark');
    logo.classList.add('d-none');
    logooff.classList.remove('d-none');
    logooff.classList.add('d-flex');
    navbar.style.color = 'black';
    for (let i = 0; i < menuText.length; i++) {
        menuText[i].classList.add('sinConexion');
        
    }
    //menuText.classList.add('sinConexion');

})


window.addEventListener('online', event => {
    console.log('Estoy online!!');
    logo.classList.remove('d-none');
    logo.classList.add('d-flex');
    logooff.classList.remove('d-flex');
    logooff.classList.add('d-none');
    navbar.classList.remove('bg-dark');
    navbar.style.color = '#0c79b7';
    for (let i = 0; i < menuText.length; i++) {
        menuText[i].classList.remove('sinConexion');
        
    }
    //menuText.classList.remove('sinConexion');

})

if (!navigator.onLine){
    console.log('No hay conexion');
}

