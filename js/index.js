// Elementos de DOM
const buttonIndex = document.getElementById('sendButton');
const inputElement = document.getElementById('search');
const inputElementCapitulos = document.getElementById('searchCapitulos');
const main = document.getElementById('main');
var favoritos = document.getElementById('favoritos');
var capitulos = document.getElementById('capitulos');
const sendButtonCapitulos = document.getElementById('sendButtonCapitulos');

function modalInstall (){
    console.log('modalInstall');
}

window.onload = () => {
    getPersonajes();
    modalInstall ();
}

const fullQuery = () => `
    query {
        characters(page: 2) {
            results {
                id
                name
                status
                species
                type
                gender
                image
            }
        }
    }
`


const nameQuery = (name) => `
    query {
        characters(page: 2, filter: { name: "${name}" }) {
            results {
                id
                name
                status
                species
                type
                gender
                image
            }
        }
    }
`

// function btnDisabled(id){
//     let btn = document.getElementById(id);
//     btn.setAttribute('disabled', 'disabled');
// }

function btnValidacion(id) {
    // console.log('El id es: ' + id);
    let favoritos = localStorage.getItem('favoritos');
    // let fvGUARDADOS_parse = JSON.parse(favoritos);
    // console.log('Guardado en localStorage: ' + fvGUARDADOS_parse);
    if(favoritos != null) {
        let ValidarSiEsta = favoritos.indexOf(id);
        console.log("si da -1 no esta........",ValidarSiEsta);
        if (ValidarSiEsta != -1) {
            console.log('ESTOY EN FAVORITOS CON EL ID: ' + id);
            let botonFavorito = document.querySelector('.agregarFav' + id);
            let botonSacarFavorito = document.querySelector('.borrarFav' + id);
            botonFavorito.className += " no-mostrar";
            botonSacarFavorito.className = botonSacarFavorito.className.replace(" no-mostrar", "");
        }
    }
    
    // let botonFav = `borrarFav${id}`;
    // let btnBorrar = document.querySelector('.'+botonFav);
    // let botonBorrar = `agregarFav${id}`;
    // let btnAgregar = document.querySelector('.'+botonBorrar);
    // if(ValidarSiEsta != -1){
    //     btnAgregar.setAttribute('disabled','true');
    //     btnBorrar.setAttribute('disabled','false'); 
    // }else{     
    //     btnAgregar.setAttribute('disbled','false');
    //     btnBorrar.setAttribute('disabled','true');
    // }
}



function agregarFav(id) {
    if (!localStorage.getItem('favoritos')) {
        let favoritos = [];
        favoritos.push(id);
        console.log("NO HAY LS recibi id y lo agregue",favoritos);
        localStorage.setItem('favoritos',JSON.stringify(favoritos));
        console.log("NO HABIA LS recibi id y lo guarde en LS",favoritos);
        //btnDisabled(id);
        // btnValidacion(id);

    }else{
       let favoritos = localStorage.getItem('favoritos');
       console.log('FAV ACTUALES',favoritos);
       let fvGUARDADOS_parse = JSON.parse(favoritos);
       console.log('antes de INDEXOFF',fvGUARDADOS_parse);
       let ValidarSiEsta = fvGUARDADOS_parse.indexOf(id);
       console.log("valida 0 no esta ",ValidarSiEsta);

       if(ValidarSiEsta === -1){
            fvGUARDADOS_parse.push(id);
            console.log(fvGUARDADOS_parse);
            localStorage.setItem('favoritos',JSON.stringify(fvGUARDADOS_parse));
            console.log('NO ESTA GUSARDADO EN FAVORITOS');
        }else{    
            console.log('YA SE ENCUENTRA EN FAVOTRITOS ESTE PERSONAJE');
        }
        // btnValidacion(id);
    }
    let botonFavorito = document.querySelector('.agregarFav' + id);
    let botonSacarFavorito = document.querySelector('.borrarFav' + id);

    
    botonFavorito.className += " no-mostrar";
    botonSacarFavorito.className = botonSacarFavorito.className.replace(" no-mostrar", "");
}

function borrarFav(id){
    console.log(id);
    let favoritos = localStorage.getItem('favoritos');
    let fvGUARDADOS_parse = JSON.parse(favoritos);
    console.log(fvGUARDADOS_parse);
    var myIndex = fvGUARDADOS_parse.indexOf(id);
    if (myIndex !== -1) {
        fvGUARDADOS_parse.splice(myIndex, 1);
        localStorage.setItem('favoritos',JSON.stringify(fvGUARDADOS_parse));
        console.log('despues del if',fvGUARDADOS_parse);
        if(fvGUARDADOS_parse.length === 0){
            console.log('despuesss',JSON.parse(favoritos).length);
            localStorage.removeItem('favoritos');
        }
    }
    let botonFavorito = document.querySelector('.agregarFav' + id);
    let botonSacarFavorito = document.querySelector('.borrarFav' + id);

    
    botonSacarFavorito.className += " no-mostrar";
    botonFavorito.className = botonSacarFavorito.className.replace(" no-mostrar", "");
    // btnValidacion(id);
    // getPersonajes();
}

const getPersonajes = () => {
    const valorDeInput = inputElement.value;
    console.log(valorDeInput);
    let options;
    if( valorDeInput === ''){
        options = {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                query: fullQuery()
            }),
        }
    }else{
        options = {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                query: nameQuery(valorDeInput)
            }),
        }
    }
    
    fetch('https://rickandmortyapi.com/graphql', options)
    .then(function(response) {
        console.log('data01',response);
        
        return response.json();
    }).then(function(json){
        let salida = '<div class="container items">';
        console.log("data02",json);
        const array = json.data.characters.results;
        if(array.length === 0){
            salida = '<div class="container d-flex justify-content-center text-center items"><span class="material-symbols-outlined">warning</span><p>No hay resultados</p></div>';
        }else{
            for (let i = 0; i < array.length; i++) {
                salida+= 
                `
                <div class="card" style="width: 18rem;">
                     <img class="card-img-top img-circle" src="${array[i].image}">
                     <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h5 class="card-title">${array[i].name}</h5>
                        </div>
                     <p class="card-text">${array[i].status}</p>
                     <p>${array[i].species} </p>
                     <p>${array[i].type} </p>
                     <p>${array[i].gender} </p>
                     </div>
                     <button data-id="${array[i].id}" onclick="agregarFav(${array[i].id});" class="btn justify-content-center align-items-center btn-secondary agregarFav${array[i].id} btn-fav"><span class="material-symbols-outlined">star</span><p>AGREGAR</p></button>
                     <button data-id="${array[i].id}" onclick="borrarFav(${array[i].id})" class="btn justify-content-center align-items-center btn-danger btn-sm borrarFav${array[i].id} no-mostrar"><span class="material-symbols-outlined">delete</span></button>
                 </div>
                 `
                 
                }
             salida+= '</div>';   
        }
        main.innerHTML = salida;
        for (let i = 0; i < array.length; i++) {
            btnValidacion(array[i].id);
        }
    }).finally(function(){
        loading();
    })
    .catch(function(err){
        console.log('fallo',err);
    })
    
}


const personajes = buttonIndex.addEventListener("click", () => {
    getPersonajes();
});
