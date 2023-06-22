import Anime_api from "./Anime_api.js";
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
            direccionURL = `https://kitsu.io/api/edge/anime/${id}/characters?page[limit]=20&page[offset]=${Anime_api.page}`
            contenido = function showPersonaje(){

            }
        }else if(location.hash === "#/episodios"){
            
            direccionURL = `https://kitsu.io/api/edge/anime/${id}/episodes?page[limit]=20&page[offset]=${Anime_api.page}`
            contenido = function showEpisodios(info){
                         info = info.data
                        let html = ""
                        console.log(info)
                        if(info.length === 0){
                            return false;
                        }else{
                            info.forEach((el) => {
                                html += episodes(el)
                             })   
                            $tabcontentEp.insertAdjacentHTML("beforeend",html)
                        }
                         
        }

        document.querySelector(".loader").style.display = "block;"

            await ajax({
                url: direccionURL,
                cbSuccess:(data) => {
                    contenido(data)
                }
            })
        }
      }
    })
}