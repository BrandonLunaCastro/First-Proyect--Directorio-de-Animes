import Anime_api from "./Anime_api.js";
import character from "./Characters.js";
import ajax from "./ajax.js";
import episodes from "./episodios.js";

export async function infiniteScroll(url){
    console.log("entra a infinit scroll")
    
    window.addEventListener("scroll", async e => {
        let {scrollTop,scrollHeight,clientHeight} = document.documentElement,
        direccionURL,
        contenido,
        id = localStorage.getItem("PostId"),
        $tabcontentPj = document.getElementById("personajesContent"),
        $tabcontentEp = document.getElementById("episodiosContent"),
        $loader = document.querySelector(".loader"),
        vacio = false;

        if(scrollTop + clientHeight >= scrollHeight){
            Anime_api.page+=20  
           
         if(location.hash === "#/personajes"){        
            $loader.style.display = "block" 
          console.log("entro a personajes")
            direccionURL = `https://kitsu.io/api/edge/anime/${id}/characters?page[limit]=20&page[offset]=${Anime_api.page}`
            contenido = function showPersonaje(info){
                info = info.data 
                console.log(info)
                     info.forEach((el)=>{ 
                        character(el);
                     }); 
            }
        }else if(location.hash === "#/episodios"){       
            direccionURL = `https://kitsu.io/api/edge/anime/${id}/episodes?page[limit]=20&page[offset]=${Anime_api.page}`
            contenido = function showEpisodios(info){
                         info = info.data
                        let html = ""
                        info.forEach((el) => {
                            html += episodes(el)
                         })   
                        $tabcontentEp.insertAdjacentHTML("beforeend",html)
                        }
            } else {
             $tabcontentEp.innerHTML = null
             $tabcontentPj.innerHTML = null
             return false;
            }   

                await ajax({
                    url: direccionURL,
                    cbSuccess:(data) => {
                    if(data.data.length === 0){
                        console.log("entro a vacio")
                        return false;
                    }else{
                       return contenido(data);    
                    }    
                    }
                });             
                $loader.style.display="none";
        }
    })
}