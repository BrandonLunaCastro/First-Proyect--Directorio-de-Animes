import Anime_api from "./modulos/Anime_api.js"
import { posts } from "./modulos/Post_home.js"
import ajax from "./modulos/ajax.js"

let page = Anime_api.page,
     pagina = Anime_api.number_page,
     ApiURL;
        
//////Funciones//////

///URL QUE SIRVE https://kitsu.io/api/edge/anime?filter[text]=naruto&page[limit]=2&page[offset]=0


    //<---FUNCION PETICION--->
    const peticion = async () => { 
    
    const $main = document.querySelector("main"),
   
    {hash} = location,
    $loader = document.querySelector(".loader")    

    $main.innerHTML = null
    if(!hash || hash === "#/home"|| hash === "#/0") {  
        
        console.log("seccion home")
        document.getElementById("back").setAttribute("disabled","")  ;

        page=0;
        pagina=0;
        
        getAnimes(page);

    }else if(hash.includes("#/search")){
        console.log("seccion buscador") 
        page=0;
        pagina=0;
        let query = localStorage.getItem("query")

        if(!query){
            localStorage.removeItem("query");
            return false;
        }
            ApiURL = `${Anime_api.SEARCH}${query}&page[limit]=9&page[offset]=${page}`

           getAnimes(page,ApiURL)
    }else{
      $main.innerHTML =  ` <h1>Aqui cargara al anime seleccionado</h1>`

        let id = localStorage.getItem("PostId")
        //console.log(id)
        ajax({
            url : `https://kitsu.io/api/edge/anime/${id}`,
            cbSuccess:(post) => {
                let html = ""
                console.log(post.data)
            
                
            }
        })

    }
    $loader.style.display = "none"
}

    //<---FUNCION DE PAGINACION--->
    const paginacion =  () => {
            const $form = document.querySelector(".btns")
            let query = localStorage.getItem("query")
           let hash = Anime_api.hash; 
           
            $form.addEventListener("click",  e => { 
                

                if(e.target.matches("#next")){
                    document.getElementById("back").removeAttribute("disabled");
                    page+=9;
                    pagina++;
                    
                    if(!location.hash|| location.hash === "#/home" || location.hash.includes("#/page")){
                        ApiURL = `${Anime_api.ANIMES}?page[limit]=9&page[offset]=${page}`;
                        hash= `#/page=${pagina}`
                    }else if(location.hash.includes("#/search")){
                        ApiURL = `${Anime_api.SEARCH}${query}&page[limit]=9&page[offset]=${page}`;
                        hash=`#/search?search=${query}/${pagina}`
                    }
                   
                    console.log(page)
                    getAnimes(page,ApiURL); 
                    history.pushState(null,"",hash)
            
                }else if(e.target.matches("#back")){
                    page-=9;
                    pagina--;
                    if(page > 0){
                        document.getElementById("back").removeAttribute("disabled");
                    }else{
                        document.getElementById("back").setAttribute("disabled","")
                    }

                    if(!location.hash|| location.hash === "#/home" || location.hash.includes("#/page")){
                        ApiURL = `${Anime_api.ANIMES}?page[limit]=9&page[offset]=${page}`;
                        hash= `#/page=${pagina}`
                    }else if(location.hash.includes("#/search")){
                        ApiURL = `${Anime_api.SEARCH}${query}&page[limit]=9&page[offset]=${page}`;
                        hash=`#/search?search=${query}/${pagina}`
                    }

                    console.log(page)
                    getAnimes(page,ApiURL);
                    history.pushState(null,"",hash);
                }
            })
    }

    /// <---funcion getAnimes ---> 

    const getAnimes = async (page,URL) => {
        
        URL = URL || `${Anime_api.ANIMES}?page[limit]=9&page[offset]=${page}`
         
        await  ajax({
            url: URL,
            cbSuccess:(animes) => {
                console.log(URL)
                let data = animes.data,
                html = "";
                console.log(data)
                data.forEach(el => {
                        html += posts(el.attributes,el.id);
                });
                
                document.querySelector("main").innerHTML = html
              
            }
        })
    };

    /// <---Funcion Search--->

    const search = async () => {
        let $formSearch = document.getElementById("form-search"); 

        document.addEventListener("submit", async e => {
                e.preventDefault()
                if(!e.target.matches("form"))return false;
                
                localStorage.setItem("query",$formSearch.value)
                location.hash=`#/search?search=${localStorage.getItem("query")}`;

                 if(location.hash.includes("#/search")){
                    $formSearch.value = localStorage.getItem("query")
                } 
 
                
                
        });

        document.addEventListener("search",e => {
            if(!e.target.matches(`input[type="search"]`)) console.log("aca",e.target)
            if(!e.target.value)localStorage.removeItem("query")
        })

    };

/////// <-----Funcion Show Anime--->
const showAnime = (props) =>{
        let {} = props


            return `

                  <div class="global-container>
                    <div class="seccion1">
                        <img></img>
                        <nav></nav>
                    </div>
                  </div>
            
            `;
    
  
        }


////Cargas al DOM////
    document.addEventListener("DOMContentLoaded",e => {
            document.querySelector("main").innerHTML = null    

            peticion();
            paginacion();
            search();
            
    })

   window.addEventListener("hashchange",e => {
           
            Anime_api.page = 0
            Anime_api.number_page = 0
            peticion();

  
   })

