const limit = 20;
let totalCount;

let resource;
let params = { page: 1 };// asi la pagina tiene un valor por defecto


const getOffset = (page, limit) => {
    return (page - 1) * limit;
}

//convierte el objeto en query params, lo pone en codigo
const encodeQueryData = (data) => {
    const ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
};

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

    render: (endpoint, template, queryParams) => {
        const urlAPI = () => {
            return `${baseUrl}/${endpoint}?${auth}&${encodeQueryData(queryParams)}` 
        };
        const container2 = document.querySelector(`#marvelComic-row`);
        fetch(urlAPI())
            .then(res => res.json())
            .then((json) => {
                totalCount = json.data.total || 0;
                container2.innerHTML = template(json);
            });
    }
};

const select = document.getElementById('selectType');

const renderAll = () => {
    let queryParams;
    switch (resource) {
        case 'comics':
            queryParams = {
                limit,
                offset: getOffset(params.page, limit),
                ...(params.searchTerm ? { titleStartsWith: params.searchTerm } : null) // si searchTerm tiene algun valor lo agrega al objeto 
            }

            return comicMarvel.render(resource, templateComics, queryParams);
        case 'characters':
            queryParams = {
                limit,
                offset: getOffset(params.page, limit),
                ...(params.searchTerm ? { nameStartsWith: params.searchTerm } : null) // si searchTerm tiene algun valor lo agrega al objeto
            }
            return comicMarvel.render(resource, templateHero, queryParams);
        default:
            return null;
    }
}

select.addEventListener('change', (event) => {
    page = 1;
    params.page = page;
    resource = event.target.value;
    renderAll(resource, page)
});

//###### PAGINACION #######
const forwardAll = document.getElementById('forward-all');
const returnAll = document.getElementById('return-all');
const return1 = document.getElementById('return-one')
const forward1 = document.getElementById('forward-one')

forwardAll.addEventListener('click', (event) => {
    page = totalCount % limit === 0 ? Math.floor(totalCount / limit) : Math.floor(totalCount / limit) + 1;
    params.page = page;
    renderAll()
})

returnAll.addEventListener('click', (event) => {
    page = 1;
    params.page = page;
    renderAll()
})

return1.addEventListener('click', (event) => {
    page = page - 1;
    params.page = page;
    renderAll()
})

forward1.addEventListener('click', (event) => {
    page = page + 1;
    params.page = page;
    renderAll()
})

// Search

const searchInput = document.getElementById('search')

searchInput.addEventListener('change', (event) => {
    params.searchTerm = event.target.value;
    renderAll()
})

// ++++ botn de busqueda+++++++    
const btnComics = document.getElementById('btn')
btnComics.addEventListener('click', () => {

    params = new URLSearchParams(window.location.search);
const resultsTotal = document.getElementById('results');
resultsTotal.innerText = totalCount

})


