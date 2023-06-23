import Anime_api from "./Anime_api.js";
import { posts } from "./Post_home.js";
import ajax from "./ajax.js";

export  function search(){
   let $formSearch = document.querySelector(".form-search");

   if(!location.hash.includes("#/search")){
    $formSearch.value = localStorage.getItem("searchId")
  }


    document.addEventListener("submit",  e => {           
        e.preventDefault()

        if(e.target.matches("form")){ 
             localStorage.setItem("searchId",$formSearch.value)
             location.hash = `#/search?search=${localStorage.getItem("searchId")}`
             console.log(location.hash)
        }
    });

    document.addEventListener("search",  e => {
  
        if(!e.target.matches(`input[type="search"]`))return false;
        if(!e.target.value)localStorage.removeItem("searchId")
    
    });


}
