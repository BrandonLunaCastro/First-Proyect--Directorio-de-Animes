import Anime_api from "./Anime_api.js";
import character from "./Characters.js";
import ajax from "./ajax.js";
import episodes from "./episodios.js";

export async function infiniteScroll(){
    console.log("entra a infinit scroll")
    window.addEventListener("scroll", async e => {
        let {scrollTop,scrollHeight,clientHeight} = document.documentElement,
        direccionURL,
        contenido,
        id = localStorage.getItem("PostId"),
        $tabcontentPj = document.getElementById("personajesContent"),
        $tabcontentEp = document.getElementById("episodiosContent")
       console.log(Anime_api.page)
       
        if(scrollTop + clientHeight >= scrollHeight){
           Anime_api.page+=20
        
         if(location.hash === "#/personajes"){    
            console.log("entro en personajes")
            direccionURL = `https://kitsu.io/api/edge/anime/${id}/characters?page[limit]=20&page[offset]=${Anime_api.page}`
            contenido = function showPersonaje(info){
                info = info.data 
                console.log(info,"aqui se ve que trae")
                if(info.length === 0){                    
                    $tabcontentPj.innerHTML = `<p class="vacio">Ups parece que aún no hay nada cargado aqui  ¯\_(ツ)_/¯</p>`
                    return false;
                }else {
                     info.forEach((el)=>{ 
                        character(el)
                     }) 
                }          
            }
        } 
        if(location.hash === "#/episodios"){
            console.log("entro en episodios")
            direccionURL = `https://kitsu.io/api/edge/anime/${id}/episodes?page[limit]=20&page[offset]=${Anime_api.page}`
            contenido = function showEpisodios(info){
                         info = info.data
                        let html = ""
                        console.log(info)
                        if(info.length === 0){
                            console.log("vacio")
                            return false;
                        }else{
                            info.forEach((el) => {
                                html += episodes(el)
                             })   
                            $tabcontentEp.insertAdjacentHTML("beforeend",html)
                        }
                         
        }
        }

        document.querySelector(".loader").style.display = "block"
            
        await ajax({
            url: direccionURL,
            cbSuccess:(data) => {
               contenido(data)
            }
        })
    
        document.querySelector(".loader").style.display = "none";
      }
    })
}