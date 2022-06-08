const auth = "563492ad6f9170000100000104eee95f211e4d039c8aff2189b0e66a";
const gallary = document.querySelector(".gallary");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

//listerners

searchInput.addEventListener("input", updateInput);

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    searchPhotos(searchValue)
})

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

async function curatedPhotos(){
    const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=14&page=1")
    data.photos.forEach(photo => {
        const gallaryImg = document.createElement("div");
        gallaryImg.classList.add("gallary-img");
        gallaryImg.innerHTML = `<img src=${photo.src.large}></img><p>${photo.photographer}</p>`;
        gallary.appendChild(gallaryImg);
    });
}

async function searchPhotos(query){
    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`)
    data.photos.forEach(photo => {
        const gallaryImg = document.createElement("div");
        gallaryImg.classList.add("gallary-img");
        gallaryImg.innerHTML = `<img src=${photo.src.large}></img><p>${photo.photographer}</p>`;
        gallary.appendChild(gallaryImg);
    });
}

curatedPhotos();
