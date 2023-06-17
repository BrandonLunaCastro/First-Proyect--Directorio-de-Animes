import ajax from "./ajax.js";
import { personaje } from "./personaje.js";

export default   function  character(elements){
        let {id} = elements,
        $contenido = document.querySelector(".contenido")
        

         ajax({
            url:`https://kitsu.io/api/edge/anime-characters/${id}/character`,
            cbSuccess:(persona)=>{
                let data = persona.data
            
                console.log(personaje(data.attributes));
                const targeta = personaje(data.attributes)
                $contenido.appendChild(targeta)
            }
        })
        
    
    

}