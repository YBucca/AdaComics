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

const comicMarvel = {
// 18317076127f02840e2a8ace0207c5d934fe6632e9ca1976d23ace42021fea1ba2225b7bd

  render:() => {
    const urlAPI2 ="https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=9ca1976d23ace42021fea1ba2225b7bd&hash=3722a07e43de87305375496f55f99f7a&offset=20&limit=20";
    const container2 = document.querySelector(`#marvelComic-row`);
    let contentHTML2="";

    fetch(urlAPI2)
    .then(res => res.json())
    .then((json)=> {
        for(const comic of json.data.results){
          let urlComic = comic.urls[0].url;
          // console.log("+++ comic.thumbnail +++", comic.thumbnail)
          contentHTML2 += `
          <div class="col-md-3">
              <a href="${urlComic}" target="_blank">
                <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}" class="img-thumbnail"> 
              </a>
              <h3 class="title">${comic.title}"</h3>
          </div> 
          `;
        }
        container2.innerHTML = contentHTML2;
      });
   }
};
comicMarvel.render();


// https://gateway.marvel.com:443/v1/public/comics?apikey=9ca1976d23ace42021fea1ba2225b7bd