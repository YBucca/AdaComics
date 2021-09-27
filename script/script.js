const limit = 20;
let totalCount;

let resource;
const params = { page: 1 };// asi la pagina tiene un valor por defecto

const getParams =  () => {
  const params = new URLSearchParams(window.location.search)
  const search = params.get("search");
  const type = params.get("type");
  const sort = params.get("sort");
  const page = params.get("page");

  return { search, type, sort, page}
}

const getOffset = (page, limit) => {
    if (page)
      return (page - 1) * limit;
    else
      return 0
}

// convierte el objeto en query params, lo pone en codigo
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
      console.log('*** urlAPI *** ', urlAPI())
      const container2 = document.querySelector(`#marvelComic-row`);
      // window.history.pushState({},"",`?${encodeQueryData(queryParams)}`) //setea en la url
      console.log(urlAPI())
      fetch(urlAPI())
      .then(res => res.json())
      .then((json) => {
          console.log('*** json *** ', json)
          totalCount = json.data.total || 0;
          console.log(json)
          container2.innerHTML = template(json);
          resultMarvel()
      });
    }
    
};

const select = document.getElementById('selectType');

const renderAll = () => {
    const { search, type, sort, page } = getParams();
    const searchName = type === "comics" ? "titleStartsWith" : "nameStartsWith";
    let orderBy;
    if (type === "comics" && sort === 'a-z') {
      orderBy = 'title'
    } else if (type === "comics" && sort === 'a-z') {
      orderBy = '-title'
    } else if (type === "comics" && sort === 'old-new') {
      orderBy = '-modified'
    } else if (type === "comics" && sort === 'new-old') {
      orderBy = 'modified'
    } else if (type === "character" && sort === 'a-z') {
      orderBy = 'name'
    } else if (type === "character" && sort === 'a-z') {
      orderBy = '-name'
    } else if (type === "character" && sort === 'old-new') {
      orderBy = '-modified'
    } else if (type === "character" && sort === 'new-old') {
      orderBy = 'modified'
    }
    console.log('sort')
    const queryParams = {
      limit,
      offset: getOffset(page, limit),
      ...(search ? { [searchName]: search } : null), // si searchTerm tiene algun valor lo agrega al objeto 
      ...(sort? { orderBy }: null)
    }

    if (type)
      return comicMarvel.render(type, templateComics, queryParams);

    // esto en principio ya no la usariamos se reemplaza por 139 searchForm
}

// select.addEventListener('submit', (event) => {
//     page = 1;
//     params.page = page;
//     resource = event.target.value;
//     renderAll(resource, page)
     
// });

// Search

const searchInput = document.getElementById('search')
// searchInput.addEventListener('submit', (event) => {
//     params.searchTerm = event.target.value;
//     renderAll()

// })


const searchForm = document.getElementById('search-form')
searchForm.addEventListener('submit',(event) =>{
  event.preventDefault();
  const form = event.target;
  
  const params = new URLSearchParams(window.location.search)
  params.set("search", form.search.value);
  params.set("type",form.selectType.value);
  params.set("sort",form.selectSort.value);
  params.set("page", 1);
  
  window.location.href = "/?" + params.toString();

  console.log(window.location)

})

renderAll();

//###### PAGINACION #######
const forwardAll = document.getElementById('forward-all');
const returnAll = document.getElementById('return-all');
const return1 = document.getElementById('return-one')
const forward1 = document.getElementById('forward-one')

forwardAll.addEventListener('click', (event) => {
    renderAll()
})

returnAll.addEventListener('click', (event) => {
    renderAll()
})

return1.addEventListener('click', (event) => {
    renderAll()
})

forward1.addEventListener('click', (event) => {
    renderAll()
})

  

//++++ resultados +++++

const resultsTotal = document.getElementById('results');
const resultMarvel = () =>{
    resultsTotal.innerText = totalCount;
}


//++++++ filtros +++++++
// const selectFilter = document.getElementById('sortType')

// hay que guardar en una funcion el query para poder ordenarlo por title A-Z y 
// por -title de Z-A 
//en caso de mas nuevos y mas viejos hay que buscarlos por
// modifed mas nuevos -modifed mas viejos. 
