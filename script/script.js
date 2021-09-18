// const baseUrL= "";
// const apiKey = "9ca1976d23ace42021fea1ba2225b7bd";

// https://gateway.marvel.com:443/v1/public/characters?apikey=9ca1976d23ace42021fea1ba2225b7bd
// public 9ca1976d23ace42021fea1ba2225b7bd
// private   8317076127f02840e2a8ace0207c5d934fe6632e


// ++++esta es la funcion de personajes+++++++

// const marvel = {
// // 18317076127f02840e2a8ace0207c5d934fe6632e9ca1976d23ace42021fea1ba2225b7bd

//   render:() => {
//     const urlAPI ="https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9ca1976d23ace42021fea1ba2225b7bd&hash=3722a07e43de87305375496f55f99f7a&offset=20&limit=20";
//     const container = document.querySelector(`#marvel-row`);
//     let contentHTML="";

//     fetch(urlAPI)
//     .then(res => res.json())
//     .then((json)=> {
//         for(const hero of json.data.results){
//           let urlHero = hero.urls[0].url;
//           console.log("+++ hero.thumbnail +++", hero.thumbnail)
//           contentHTML += `
//           <div class="col-md-3">
//               <a href="${urlHero}" target="_blank">
//                 <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail"> 
//               </a>
//               <h3 class="title">${hero.name}"</h3>
//           </div> 
//           `;
//         }
//         container.innerHTML = contentHTML;
//       });
//    }
// };
// marvel.render();



//  +++++   este es la funcion de comic +++++++++

// const comicMarvel = {
// // 18317076127f02840e2a8ace0207c5d934fe6632e9ca1976d23ace42021fea1ba2225b7bd

//   render:() => {
//     const urlAPI2 ="https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=9ca1976d23ace42021fea1ba2225b7bd&hash=3722a07e43de87305375496f55f99f7a&offset=20&limit=20";
//     const container2 = document.querySelector(`#marvelComic-row`);
//     let contentHTML2="";

//     fetch(urlAPI2)
//     .then(res => res.json())
//     .then((json)=> {
//         for(const comic of json.data.results){
//           let urlComic = comic.urls[0].url;
//           // console.log("+++ comic.thumbnail +++", comic.thumbnail)
//           contentHTML2 += `
//           <div class="col-md-3">
//               <a href="${urlComic}" target="_blank">
//                 <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}" class="img-thumbnail"> 
//               </a>
//               <h3 class="title">${comic.title}"</h3>
//           </div> 
//           `;
//         }
//         container2.innerHTML = contentHTML2;
//       });
//    }
// };
// comicMarvel.render();


// https://gateway.marvel.com:443/v1/public/comics?apikey=9ca1976d23ace42021fea1ba2225b7bd





//###### PAGINACION #######
// const params = new URLSearchParams(window.location.search);

// const return1 = document.getElementById('return-one')
// const forward1 = document.getElementById('forward-one')
// let offset = 1;
// let limit = 19;

// return1.addEventListener("click", () => {
//   if (offset != 1) {
//     offset -= 20; // le quito 20
//     // removeChildNodes(pokemonContainer);
//     fetchMarvel(offset, limit);
//   }
// });

// forward1.addEventListener("click", () => {
//   offset += 20;
//   fetchMarvel(offset, limit);
// });
// setear en parametro de la url

// const search = params.get("description");
// const type = params.get("type");
// const order = params.get("order");
// const page = params.get("page");

// params.set('page', page+1)



///#### intento UNO de paginación 

// function fetchMarvel(offset, limit){
//   for (let i= offset; i <= offset + limit; i++){
//     fetchMarvel(i);
//   }
// }

// fetchMarvel(offset, limit);




// intento DOS 
const urlAPI2 ="https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=9ca1976d23ace42021fea1ba2225b7bd&hash=3722a07e43de87305375496f55f99f7a";
const container2 = document.querySelector(`#marvelComic-row`);
   

  async function comicMarvel(url) {
    try{
      container2.innerHTML = `<img class ="loader" src="../assets/loader.svg">`;

      let res = await fetch(url),
      json = await res.json(),
      contentHTML2="",
      $previus,
      $nextLink;
      
     console.log(json);

     if(!res.ok) throw {status: res.status, statusText: res.statusText}

     for(let i = 0; i < json.data.results.length;i++){

      console.log(json.data.results[i])
       try{

          let res = await fetch(json.data.results[i].urls[i].url), /// como traer la url ???***
         
          comic = await res.json();
          
          if(!res.ok) throw {status: res.status, statusText: res.statusText}

          contentHTML2 += `
          <div class="col-md-3">
              <a href="${urlComic}" target="_blank">
                <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}" class="img-thumbnail"> 
              </a>
              <h3 class="title">${comic.title}"</h3>
          </div> `;
       }catch (err){
        let message = err.statusText || "Error";
        contentHTML2 += `<figure>
        <figcation>Error ${err.status}:${message}</figcation>
          </figure>`;
       }
     }
    container2.innerHTML = contentHTML2;
    
    }catch (err) {
      let message = err.statusText || "Error";
      container2.innerHTML = `<p> Error ${err.status}: ${message}</p>`;
    }
  }



document.addEventListener("DOMContentLoaded", e => comicMarvel(urlAPI2))