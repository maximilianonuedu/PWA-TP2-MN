
const datafavoritos = document.getElementById('datafavoritos');
function borrarFav(id){
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
    getFavoritos();
}

function getFavoritos() {
    
    if(!localStorage.getItem('favoritos')){
        datafavoritos.innerHTML = 'No hay personajes guadados como favoritos';
    }else{
        let favoritos = localStorage.getItem('favoritos');
       
        let fvGUARDADOS_parse = JSON.parse(favoritos);
        const nameQuery = (ArrayFavoritos) => `
            query {
                charactersByIds(ids:[${ArrayFavoritos}]) {
                    id
                    name
                    status
                    species
                    type
                    gender
                    image
                }
            }
        `
        options = {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                query: nameQuery(fvGUARDADOS_parse)
            }),
        }
        fetch('https://rickandmortyapi.com/graphql', options)
        .then(function(response) {
            console.log('data01',response);
            
            return response.json();
        }).then(function(json){
            console.log("data02",json);
            const itemsFavs = json.data.charactersByIds;
            console.log('data03',itemsFavs);
            
            let favs = '<div class="container items">';
            for (let i = 0; i < itemsFavs.length; i++) {
                favs+= `
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${itemsFavs[i].image}">
                    <div class="card-body">
                        <h5 class="card-title">${itemsFavs[i].name}</h5>
                        <p class="card-text">${itemsFavs[i].status}</p>
                        <p>${itemsFavs[i].species} </p>
                        <p>${itemsFavs[i].type} </p>
                        <p>${itemsFavs[i].gender} </p>
                    </div>
                    <button id="${itemsFavs[i].id}" onclick="borrarFav(${itemsFavs[i].id})" class="btn  d-flex justify-content-center align-items-center btn-danger btn-sm btn-fav"><span class="material-symbols-outlined">delete</span><p>BORRAR</p></button>
                </div>
                `
            }
            favs+= '</div>'; 
            datafavoritos.innerHTML = favs;
        }).finally(function(){
            loading();
        })
        .catch(function(err){
            console.log('fallo',err);
        })
        favoritos.innerHTML = 'hay personajes guadados como favoritos';
    }
}
getFavoritos();