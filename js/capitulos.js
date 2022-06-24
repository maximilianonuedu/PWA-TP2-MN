// Elementos de DOM

const buttonIndex = document.getElementById('sendButton');
const inputElement = document.getElementById('search');
const inputElementCapitulos = document.getElementById('searchCapitulos');
const main = document.getElementById('main');
var favoritos = document.getElementById('favoritos');
var capitulos = document.getElementById('capitulos');
const sendButtonCapitulos = document.getElementById('sendButtonCapitulos');


window.onload = () => {
    getCapitulos();
}

const fullQuery = () => `
query{
    episodes{
      results{
        id,
        name,
        air_date,
        episode,
        air_date,
        created,      
      }

    }
  }
`

const nameQuery = (name) => `
    query {
        episodes(filter: { name: "${name}" }) {
            results{
                id,
                name,
                air_date,
                episode,
                air_date,
                created,      
              }
        }
    }
`

function fecha (fecha) {
  const date = new Date(fecha);
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  let day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return day + '/' + month + '/' + year;
}

const getCapitulos= () => {
    
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
   
    let salida = '<div class="container items">';

    fetch('https://rickandmortyapi.com/graphql', options)
    .then(function(response) {
        console.log('data01',response);

        return response.json();
    }).then(function(json){
        console.log("data02",json);
        const array = json.data.episodes.results;
        if(array.length === 0){
            salida = '<p>No hay resultados</p>';
        }else{
            for (let i = 0; i < array.length; i++) {
                salida+= 
                `
                <div class="card mb-3" style="width: 18rem;">
                     <img src="imgs/poster.png" class="img-fluid" alt="...">
                     <div class="card-body">
                         <h5 class="card-title">${array[i].name}</h5>
                         <p class="card-text">${array[i].air_date}</p>
                         <p>${array[i].episode} </p>
                         <p>${fecha(array[i].created)} </p>
                     </div>
                 </div>
                 `
             }
             salida+= '</div>';   
        }
        capitulos.innerHTML = salida;
    }).finally(function(){
        loading();
    })
    .catch(function(err){
        console.log('fallo',err);
    })
}

buttonIndex.addEventListener("click", () => {
    console.log('fallo',buttonIndex);
    getCapitulos();
});
