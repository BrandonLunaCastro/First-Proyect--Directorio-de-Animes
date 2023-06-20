document.addEventListener("click",async e => {     
    //sinopsis
    if(e.target.matches("#sinopsis")){
        
/*         console.log("funciona")
     

      
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
