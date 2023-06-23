import ajax from "./ajax.js";
import { personaje } from "./personaje.js";

export default   function  character(elements){
        let {id} = elements,
        $tabcontent = document.getElementById("personajesContent")
        
        if(id.length === 0){
            document.querySelector(".loader").style.display = "none"
        }

        ajax({
            url:`https://kitsu.io/api/edge/media-characters/${id}/character`,
            cbSuccess:(persona)=>{
                let data = persona.data
                let targeta = personaje(data.attributes)          
                $tabcontent.appendChild(targeta)
                
               window.addEventListener("scroll",e=>{
                let {scrollTop,scrollHeight,clientHeight} = document.documentElement;
                    if(scrollTop+clientHeight >= scrollHeight){
                        const newTargeta = personaje(data.attributes)
                        console.log(newTargeta)
                        $tabcontent.insertAdjacentHTML("beforeend",newTargeta)
                    }
                }) 
            }
        })
}