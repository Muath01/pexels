const auth = "563492ad6f9170000100000104eee95f211e4d039c8aff2189b0e66a";
const gallary = document.querySelector(".gallary");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let page = 1;
let searchValue;
let fetchLink;
let currentSearch;

//listerners

searchInput.addEventListener("input", updateInput);

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    currentSearch = searchValue
    searchPhotos(searchValue)
})

more.addEventListener("click", loadMore);


function updateInput(e){
    searchValue = e.target.value
}

async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: "GET",
        headers:{
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data){
    data.photos.forEach(photo => {
        console.log(photo)
        const gallaryImg = document.createElement("div");
        gallaryImg.classList.add("gallary-img");
        gallaryImg.innerHTML = `<a href=${photo.url} target="_blank"><img src=${photo.src.large}></a><div class="gallary-info"><a href=${photo.photographer_url} target="_blank">${photo.photographer}</a><a href=${photo.src.original} target=”_blank”>Download</a></div>`;
        gallary.appendChild(gallaryImg);
    });
}

async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=14&page=1";
    console.log("now we're here")
    const data = await fetchApi(fetchLink)
    
    generatePictures(data)
}

async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
    const data = await fetchApi(fetchLink)
    generatePictures(data)
}

function clear(){
    gallary.innerHTML = "";
    searchInput.value = "";
}

async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=14&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data)
}
curatedPhotos();
