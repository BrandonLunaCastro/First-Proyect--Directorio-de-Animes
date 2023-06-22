import character from "./Characters.js";
import ajax from "./ajax.js"
import episodes from "./episodios.js";
import { infiniteScroll } from "./infiniteScroll.js";


export async function openTab(propiedades){

    let tabs = Array.from(document.querySelectorAll(".tabs__item")),
    panels = Array.from(document.querySelectorAll(".panel__items")),
    id = localStorage.getItem("PostId"),
    {titles,synopsis,startDate} = propiedades,
    titulo = titles.en ? titles.en : titles.en_jp,
    year = new Date(startDate).getFullYear()
    
    let $tabcontent= document.getElementById("sinopsisContent"),
    $tabcontentPj = document.getElementById("personajesContent"),
    $tabcontentEp = document.getElementById("episodiosContent")
 


  setTimeout(() => {
    document.getElementById("sinopsis").click();    
  }, 100);
    
    document.getElementById("tabs").addEventListener("click",async e=> {
        //tab-sinopsis   
        if(e.target.matches("#sinopsis")){
                
                history.pushState(null,null,"#/sinopsis")

                 $tabcontent.innerHTML = null
                 $tabcontentEp.innerHTML = null
                 $tabcontentPj.innerHTML = null 
           
                let index = tabs.indexOf(e.target)

                tabs.map(tab => tab.classList.remove("active"))
                tabs[index].classList.add("active")
                
                panels.map(panel => panel.classList.remove("is-active"))
                panels[index].classList.add("is-active")
            
               console.log(location.hash)  

               $tabcontent.innerHTML = `<p><strong class="title">${titulo}</strong>${year}</p> `

                const $ul = document.createElement("ul"),
                $p = document.createElement("p");
                $p.textContent = "Categorias :"
                
                //solicitamos las categorias
                await ajax({
                    url:`https://kitsu.io/api/edge/anime/${id}/categories`,
                    cbSuccess:(categories)=> {
                          let data = categories.data;
                            data.forEach((el)=>{
                                const $li = document.createElement("li");
                                $li.textContent = el.attributes.title
                                $ul.appendChild($li)
                            })
                    }
                })
                

                $tabcontent.insertAdjacentHTML("beforeend", `<p class="sinopsis">${synopsis.replace( /\(Source: [a-zA-Z\s?]+\)/g , "")}</p>`);
        
                $p.classList.add("paragraph");
                $ul.classList.add("list-categories");

                $tabcontent.appendChild($p); 
                $tabcontent.appendChild($ul);

            }
            //personajes
            if(e.target.matches("#personajes")){

                history.pushState(null,null,"#/personajes")
                $tabcontentEp.innerHTML = null
                let index = tabs.indexOf(e.target) 
               
                tabs.map(tab => tab.classList.remove("active"))
                tabs[index].classList.add("active")
            
                panels.map(panel => panel.classList.remove("is-active"))
                panels[index].classList.add("is-active")
                console.log(location.hash)
               $tabcontentPj.innerHTML = null
             
               await ajax({
                    url:`https://kitsu.io/api/edge/anime/${id}/characters?page[limit]=20`,  //https://kitsu.io/api/edge/anime/${id}/relationships/anime-characters?page[limit]=10
                    cbSuccess:(info)=>{
                            let data = info.data
                            console.log(data)
                            if(data.length === 0){                    
                                $tabcontentPj.innerHTML = `<p class="vacio">Ups parece que aún no hay nada cargado aqui  ¯\_(ツ)_/¯</p>`
                            }else {
                                $tabcontentPj.innerHTML = `<h3>Aqui carga la seccion de personajes</h3>`
                                 data.forEach((el)=>{ 
                                    character(el)
                                 }) 
                            }        
                    }
                })
                infiniteScroll();
            }
            //episodios
            if(e.target.matches("#episodios")){
                history.pushState(null,null,"#/episodios")
                let index = tabs.indexOf(e.target)

                $tabcontentEp.innerHTML = null

                tabs.map(tab => tab.classList.remove("active"))
                tabs[index].classList.add("active")
        
                panels.map(panel => panel.classList.remove("is-active"))
                panels[index].classList.add("is-active")
                console.log(location.hash)

                await ajax({
                    url: `https://kitsu.io/api/edge/anime/${id}/episodes?page[limit]=20`,
                    cbSuccess:(episodios)=>{
                         console.log(episodios)
                         let data = episodios.data,
                         html = ""
                         data.forEach((el) => {
                            html += episodes(el)
                         })   
                        $tabcontentEp.innerHTML = html
                   }
            })   
            infiniteScroll();
        }
    })           

}

