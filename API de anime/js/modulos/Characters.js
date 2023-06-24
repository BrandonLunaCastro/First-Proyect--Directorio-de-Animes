import ajax from "./ajax.js";
import { personaje } from "./personaje.js";

export default   function  character(elements,bandera = false){
        let {id} = elements,
        $tabcontent = document.getElementById("personajesContent")
    
        ajax({
            url:`https://kitsu.io/api/edge/media-characters/${id}/character`,
            cbSuccess:(persona)=>{
                if(!bandera){
                    let data = persona.data
                    let targeta = personaje(data.attributes)          
                    $tabcontent.appendChild(targeta)
    
                }else{
                    console.log("entro en la bandera true")
                    let data = persona.data,
                    newPersonaje = personaje(data.attributes)
                    $tabcontent.appendChild(newPersonaje);

                }
                
              
            }
        })
}