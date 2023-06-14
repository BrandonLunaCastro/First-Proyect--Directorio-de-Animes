import Anime_api from "./Anime_api.js"
import { posts } from "./Post_home.js";
import ajax from "./ajax.js"

export async function nextPage(){

    const $next = document.getElementById("next"),
    $back = document.getElementById("back"),
    $main = document.querySelector("main")

    let page =  Anime_api.page
    
/*     if(location.hash.includes("#/search")){
        document.querySelector(".btns").style.display = "none"
    }else{
        document.querySelector(".btns").style.display = "flex"
    } */


        document.addEventListener("click", async e => {
            if( page === 1 )$back.setAttribute("disabled","")
        
            if(e.target.matches("#next")){
                page++
                document.querySelector(".loader").style.display = "block";
                await ajax({
                      url:`${Anime_api.ANIMES}?page[limit]=9&page[offset]=${page}`,
                     cbSuccess:(animes)=> {
                        let data = animes.data,
                        html = "";
                        console.log(animes.data);
                        data.forEach(anime => {
                                html += posts(anime.attributes)
                        });
                        $main.innerHTML = html
                      }
                });
           
                location.hash = `#/${page}`;
                $back.removeAttribute("disabled");
                console.log(location.hash)
            }else if (e.target.matches("#back")){
                page--
                await ajax({
                    url:`${Anime_api.ANIMES}?page=${page}&limit=9`,
                         cbSuccess:(animes)=> {
                            let data = animes.data,
                            html = "";
                            console.log(animes.data);
                            data.forEach(anime => {
                                    html += posts(anime)
                            });
                            $main.innerHTML = html
                          }
                    });
            }
            
        })
    }

