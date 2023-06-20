import ajax from "./ajax.js"

export async function openTab(propiedades){

    let tabs = Array.from(document.querySelectorAll(".tabs__item")),
    panels = Array.from(document.querySelectorAll(".panel__items")),
    id = localStorage.getItem("PostId"),
    {title,synopsis} = propiedades
    
  
    
    document.getElementById("tabs").addEventListener("click",async e=> {
        //tab-sinopsis   
        if(e.target.matches("#sinopsis")){
                location.hash = "/sinopsis"
                
                let $tabcontent = document.getElementById("sinopsisContent");
                let index = tabs.indexOf(e.target)

                tabs.map(tab => tab.classList.remove("active"))
                tabs[index].classList.add("active")
                
                panels.map(panel => panel.classList.remove("is-active"))
                panels[index].classList.add("is-active")
            
               //$tabcontent.innerHTML = null

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
            if(e.target.matches("#personajes")){
               
                let index = tabs.indexOf(e.target)
               
                tabs.map(tab => tab.classList.remove("active"))
                tabs[index].classList.add("active")
            
                panels.map(panel => panel.classList.remove("is-active"))
                panels[index].classList.add("is-active")
            }
            if(e.target.matches("#episodios")){
        
                let index = tabs.indexOf(e.target)
        
                tabs.map(tab => tab.classList.remove("active"))
                tabs[index].classList.add("active")
        
                panels.map(panel => panel.classList.remove("is-active"))
                panels[index].classList.add("is-active")
        
            }
    })           

}

