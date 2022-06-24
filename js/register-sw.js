// Se verifica que el browser admita el Service Worker
if ('serviceWorker' in navigator){
    navigator.serviceWorker.register("sw.js").then((message)=>{
        console.log('El Service Worker esta en funcionamiento');
    });
} else {
    console.log('El Service Worker no es admitido por el Browser');
}



