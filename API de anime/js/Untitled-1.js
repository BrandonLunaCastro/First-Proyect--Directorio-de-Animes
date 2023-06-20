document.addEventListener("click",async e => {     
    //sinopsis
    if(e.target.matches("#sinopsis")){
        
/*         console.log("funciona")
     
        const $ul = document.createElement("ul"),
        $p = document.createElement("p");
        $p.textContent = "Categorias :"

        let $tabcontent = document.getElementById("sinopsis");
      
        
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

        $tabcontent.innerHTML = `
                        <p > <strong class="title">${titulo}</strong>${year}</p> 
                        <p class="sinopsis">${synopsis.replace( /\(Source: [a-zA-Z\s?]+\)/g , "")}</p>
  
                        `;

        $p.classList.add("paragraph")
        $ul.classList.add("list-categories")

        $tabcontent.appendChild($ul)
        $tabcontent.appendChild($p) */
      
}
    //episodios
       
     if(e.target.matches("#episodios")){
        $contenido.innerHTML ="Aqui cargaran los episodios"
        
        
     
    }

    //personajes
    if(e.target.matches("#personajes")){
        e.preventDefault();
        location.hash = "/personajes"

        document.querySelector(".contenido").innerHTML = null;
        console.log("aqui van los personajes");
        
        const $contenido = document.querySelector(".contenido");

        await ajax({
            url:`https://kitsu.io/api/edge/anime/${id}/characters?page[limit]=20`,  //https://kitsu.io/api/edge/anime/${id}/relationships/anime-characters?page[limit]=10
            cbSuccess:(info)=>{
                    let data = info.data
                    console.log(data)
                    if(data.length === 0){                    
                        $contenido.innerHTML = `<p class="vacio">Ups parece que aún no hay nada cargado aqui  ¯\_(ツ)_/¯</p>`
                    }else {
                        $contenido.innerHTML = `<h3>Aqui carga la seccion de personajes</h3>`
                         data.forEach((el)=>{ 
                            character(el)
                         }) 
                    }

                          
                }
        })
    
    }

})
