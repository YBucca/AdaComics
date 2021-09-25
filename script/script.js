const limit = 20;
let totalCount;

let resource;
const params = { page: 1 };// asi la pagina tiene un valor por defecto


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
                <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title || comic.name}" class="img-thumbnail"> 
              </a>
              <h3 class="title">${comic.title || comic.name}"</h3>
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
        window.history.pushState({},"",`?${encodeQueryData(queryParams)}`) //setea en la url
        console.log(urlAPI())
        fetch(urlAPI())
            .then(res => res.json())
            .then((json) => {
                totalCount = json.data.total || 0;
                console.log(json)
                container2.innerHTML = template(json);
            });
    }
    
};

const select = document.getElementById('selectType');

const renderAll = () => {
    const searchName = resource === "comics" ? "titleStartsWith" : "nameStartsWith";
    const queryParams = {
                limit,
                offset: getOffset(params.page, limit),
                ...(params.searchTerm ? { [searchName]: params.searchTerm } : null) // si searchTerm tiene algun valor lo agrega al objeto 
            }

            return comicMarvel.render(resource, templateComics, queryParams);
            
    // esto en principio ya no la usariamos se reemplaza por 139 searchForm
}


// hay que sacar el evento change y usar el del boton del formulario

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
    event.preventDefault();
    page = page + 1;
    params.page = page;
    renderAll()
})

// Search

const searchInput = document.getElementById('search')
// hay que sacar el evento change y usar el del boton del formulario
searchInput.addEventListener('change', (event) => {
    params.searchTerm = event.target.value;
    renderAll()

})


const searchForm = document.getElementById('search-form')
searchForm.addEventListener('submit',(event) =>{
    event.preventDefault();
    const form = event.target;
    
    const params = new URLSearchParams(window.location.search)
    params.set("search", form.search.value);
    params.set("type",form.selectType.value);
    params.set("sort",form.selectSort.value);
    
    window.location.href = "/?" + params.toString();

    console.log(window.location)

    

})
//++++ resultados +++++

// const resultsTotal = document.getElementById('results');
// const resultMarvel = () =>{
//     resultsTotal.innerText = totalCount;
// }


//++++++ filtros +++++++
// const selectFilter = document.getElementById('sortType')

// hay que guardar en una funcion el query para poder ordenarlo por title A-Z y 
// por -title de Z-A 
//en caso de mas nuevos y mas viejos hay que buscarlos por
// modifed mas nuevos -modifed mas viejos. 
