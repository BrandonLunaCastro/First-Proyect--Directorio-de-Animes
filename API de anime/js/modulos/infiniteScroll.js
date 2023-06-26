import Anime_api from "./Anime_api.js";
import character from "./Characters.js";
import ajax from "./ajax.js";
import episodes from "./episodios.js";

export async function infiniteScroll(url){
    console.log("entra a infinit scroll")
    let   direccionURL,
    contenido,
    id = localStorage.getItem("PostId"),
    $tabcontentPj = document.getElementById("personajesContent"),
    $tabcontentEp = document.getElementById("episodiosContent"),
    $loader = document.querySelector(".loader")

    window.addEventListener("scroll", async e => {
   
        let {scrollTop,scrollHeight,clientHeight} = document.documentElement
        console.log(scrollTop)
              
        if(scrollTop > 100 && !location.hash.includes("#/home")){
            console.log("paso")
            document.querySelector(".position-header").style["background-color"] = "#800000" 
        }else{
            document.querySelector(".position-header").style["background-color"] = "transparent" 
        }

        if(scrollTop + clientHeight >= scrollHeight ){
            Anime_api.page+=20             
         if(location.hash === "#/personajes"){        
          console.log("entro a personajes")
            direccionURL = `https://kitsu.io/api/edge/anime/${id}/characters?page[limit]=20&page[offset]=${Anime_api.page}`
            contenido = function showPersonaje(info){
                info = info.data 
                console.log(info)
                     info.forEach((el)=>{ 
                        character(el,true);
                     }); 
            }
        }else if(location.hash === "#/episodios"){       
            direccionURL = `https://kitsu.io/api/edge/anime/${id}/episodes?page[limit]=20&page[offset]=${Anime_api.page}`
            contenido = function showEpisodios(info){
                         info = info.data
                         console.log(info)
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
                        contenido(data);    
                    }    
                    }
                });             
   
        }
    })
}