// const apiKey = "9ca1976d23ace42021fea1ba2225b7bd";
// https://gateway.marvel.com:443/v1/public/characters?apikey=9ca1976d23ace42021fea1ba2225b7bd
// public 9ca1976d23ace42021fea1ba2225b7bd
// private   8317076127f02840e2a8ace0207c5d934fe6632e


// ++++esta es la funcion de personajes+++++++

// const marvel = {

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
const baseUrl = `https://gateway.marvel.com:443/v1/public`;
const auth = `ts=1&apikey=9ca1976d23ace42021fea1ba2225b7bd&hash=3722a07e43de87305375496f55f99f7a`;
const templateComics = (json) => {
    let contentHTML = '';
    for (const comic of json.data.results) {
        let urlComic = comic.urls[0].url;
        contentHTML += `
          <div class="col-md-3">
              <a href="${urlComic}" target="_blank">
                <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}" class="img-thumbnail"> 
              </a>
              <h3 class="title">${comic.title}"</h3>
          </div> 
          `;
    }
    return contentHTML;
};

const templateHero = (json) => {
    let contentHTML = '';
    for (const hero of json.data.results) {
        let urlHero = hero.urls[0].url;
        console.log('*** hero *** ', hero)
        contentHTML += `
          <div class="col-md-3">
              <a href="${urlHero}" target="_blank">
                <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail"> 
              </a>
              <h3 class="title">${hero.name}</h3>
          </div> 
          `;
    }
    return contentHTML;
};

const comicMarvel = {

    render: (endpoint, offset, limit, template) => {
        const urlAPI = () => {
            return `${baseUrl}/${endpoint}?${auth}&offset=${offset}&limit=${limit}`;
        };
        const container2 = document.querySelector(`#marvelComic-row`);


        fetch(urlAPI(offset = 0, limit = 20, ))
            .then(res => res.json())
            .then((json) => {

                container2.innerHTML = template(json);
            });
    }
};

const select = document.getElementById('selectType');

select.addEventListener('change', (event) => {
    switch (event.target.value) {
      case 'comics':
        return comicMarvel.render(event.target.value, 0, 20, templateComics);
      case 'characters':
        return comicMarvel.render(event.target.value, 0, 20, templateHero); 
      default:
        return null;
    }
});

// https://gateway.marvel.com:443/v1/public/comics?apikey=9ca1976d23ace42021fea1ba2225b7bd


//###### PAGINACION #######
const params = new URLSearchParams(window.location.search);
const return1 = document.getElementById('return-one')
const forward1 = document.getElementById('forward-one')

// setear en parametro de la url

const search = params.get("description");
const type = params.get("type");
const order = params.get("order");
const page = params.get("page");

params.set('page', page + 1)