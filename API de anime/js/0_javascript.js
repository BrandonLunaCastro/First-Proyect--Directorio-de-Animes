import Anime_api from "./modulos/Anime_api.js"
import character from "./modulos/Characters.js";
import { posts } from "./modulos/Post_home.js"
import ajax from "./modulos/ajax.js"

let page = Anime_api.page,
     pagina = Anime_api.number_page,
     ApiURL;
        
//////Funciones//////


    //<---FUNCION PETICION--->
    const peticion = async () => { 
    document.querySelector(".btns").style.display = "flex"
    const $main = document.querySelector("main"),
    {hash} = location,
    $loader = document.querySelector(".loader")    
    document.querySelector("header").classList.remove("position-header")
    
    $main.innerHTML = null
    if(!hash || hash === "#/home"|| hash === "#/0") {  
        
        console.log("seccion home")
        document.getElementById("back").setAttribute("disabled","")  ;

        page=0;
        pagina=0;
        
        getAnimes(page);

    }else if(hash.includes("#/search")){
        console.log("seccion buscador") 
        document.querySelector(".btns").style.display = "flex"
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
        $main.innerHTML =  ` <h1>Aqui cargara al anime seleccionado</h1>`;
        
        document.querySelector("header").classList.add("position-header");
        document.querySelector(".btns").style.display = "none";  
          
        let id = localStorage.getItem("PostId")
      
        ajax({
            url : `https://kitsu.io/api/edge/anime/${id}`,
            cbSuccess:(post) => {
                let html = ""
                console.log(post.data)
                let data = post.data
                html+= showAnime(data.attributes)
                
                $main.innerHTML = html
            }
        })

   
    }
    $loader.style.display = "none"
}

    //<---FUNCION DE PAGINACION--->
    const paginacion =  () => {
            const $form = document.querySelector(".btns")

            $form.addEventListener("click",  e => { 
                
                let query = localStorage.getItem("query"),
                hash = Anime_api.hash; 
                
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
        let {coverImage,posterImage,titles,synopsis} = props
        

        let img = coverImage
         ?  coverImage.original 
         : "assets/files/no-image-available.jpeg",
        titulo = titles.en ? titles.en : titles.en_jp

            document.addEventListener("click",e => {
             
                if(e.target.matches("#sinopsis")){
                    e.preventDefault();
                   document.querySelector(".contenido").innerHTML = `<p class="sinopsis">${synopsis.replace( /\(Source: [a-zA-Z\s?]+\)/g , "")}</p>`// `${synopsis.replace( /\(Source: [a-zA-Z\s?]+\)/g , "")}`
                }
                 if(e.target.matches("#categorias")){
                    e.preventDefault();
                  /*   ajax({
                        url: ``,
                    }) */

                    document.querySelector(".contenido").innerHTML= `<p class="sinopsis">Aqui carga las categorias</p>`
                }
                if(e.target.matches("#personajes")){
                    e.preventDefault();
                    console.log("aqui van los personajes");
                    let id = localStorage.getItem("PostId")

                    ajax({
                        url:`https:kitsu.io/api/edge/anime/${id}/relationships/anime-characters`,
                        cbSuccess:(info)=>{
                                console.log(info.data)
                                let data = info.data
                            
                                data.forEach((el)=>{
                                   // console.log(el.id)
                                    character(el.id)
                                })
                               

                            }
                    })
                
                }

            })
            

            return `
           
                <img class="banner" src="${img}">
                    <div class="shadow"></div>
                   

                        <nav>
                             <ul>
                              <li><a id="sinopsis" href="#/sinopsis">Sinopsis</a></li>
                              <li><a id="personajes" href="#/personajes">Personajes</a></li>
                              <li><a id="categorias" href="#/categorias">Categorias</a></li>
                              <li><a id="info"  href="#/Informacion">Informacion</a></li>
                             </ul>
                        </nav> 
                        <section>
                        <figure class="portada">    
                            <img  src="${posterImage.original}" >
                            <figcaption>${titulo}</figcaption>   
                        </figure>   
                        <div class="contenido"></div>
                        </section>
            `;
    
  
        }

///https://kitsu.io/api/edge/anime/1555/anime-characters ruta que sirve para los characters 
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

