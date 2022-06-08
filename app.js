const auth = "563492ad6f9170000100000104eee95f211e4d039c8aff2189b0e66a";
const gallary = document.querySelector(".gallary");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");

let searchValue;

"https://api."

async function curatedPhotos(){
    const dataFetch = await fetch("https://api.pexels.com/v1/curated?", {
        method: "GET",
        headers:{
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    console.log(data.photos[0]);
    data.photos.forEach(photos => {
        const gallaryImg = document.createElement("div")
    });
}

curatedPhotos();
