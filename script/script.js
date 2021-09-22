const limit = 20;
let totalCount;
let resource;
let searchTerm;
let serchParam;

const getOffset = (page, limit) => {
    return (page - 1) * limit;
}

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

    render: (endpoint, template, offset, searchParam) => {
        const urlAPI = () => {
            return `${baseUrl}/${endpoint}?${auth}&offset=${offset}&limit=${limit}${searchParam}`;
        };
        const container2 = document.querySelector(`#marvelComic-row`);
        fetch(urlAPI(offset))
            .then(res => res.json())
            .then((json) => {
                totalCount = json.data.total || 0;
                container2.innerHTML = template(json);
            });
    }
};

const select = document.getElementById('selectType');

const renderAll = (resource, page, searchTerm) => {
    switch (resource) {
        case 'comics':
            serchParam = searchTerm? `&titleStartsWith=${searchTerm}` : '';
            return comicMarvel.render(resource, templateComics, getOffset(page, limit), serchParam);
        case 'characters':
            serchParam = searchTerm? `&nameStartsWith=${searchTerm}` : '';
            return comicMarvel.render(resource, templateHero, getOffset(page, limit), serchParam);
        default:
            return null;
    }
}

select.addEventListener('change', (event) => {
    page = 1;
    resource = event.target.value;
    renderAll(resource, page)
});

//###### PAGINACION #######

const params = new URLSearchParams(window.location.search);
const forwardAll = document.getElementById('forward-all');
const returnAll = document.getElementById('return-all');
const return1 = document.getElementById('return-one')
const forward1 = document.getElementById('forward-one')

forwardAll.addEventListener('click', (event) => {
    page = totalCount % limit === 0 ? Math.floor(totalCount / limit) : Math.floor(totalCount / limit) + 1;
    renderAll(resource, page)
})

returnAll.addEventListener('click', (event) => {
    page = 1;
    renderAll(resource, page)
})

return1.addEventListener('click', (event) => {
    page = page - 1;
    renderAll(resource, page)
})

forward1.addEventListener('click', (event) => {
    page = page + 1;
    renderAll(resource, page)
})

let page = params.get("page") || 1;

// Search

const searchInput = document.getElementById('search')

searchInput.addEventListener('change', (event) => {
  searchTerm = event.target.value;
  renderAll(resource, page, searchTerm)
})
// const params = new URLSearchParams(window.location.search);

const btnComics = document.getElementById('btn')
const setParams = () => {
   
    const params = new URLSearchParams(window.location.search);

    const searchInput = document.getElementById('search');
    const selectType = document.getElementById('selectType');
    const sortType = document.getElementById('sortType');

    console.log(searchInput.value)
    console.log(selectType.value)
    console.log(sortType.value)
    params.set('search', searchInput.value)
    params.set('type', selectType.value)
    params.set('sort', sortType.value)
    
    window.location.href = `${window.location.pathname}?${params.toString()}`


}
btnComics.addEventListener('click', setParams)


// const search = params.get("s");
// const page = params.get("page");
// const order = params.get("order");

// params.set(`page`,page + 1)
// params.set(`order`,-name)
