import ajax from "./ajax.js";
import { personaje } from "./personaje.js";

export default  async function  character(id){

        ajax({
            url:`https://kitsu.io/api/edge/anime-characters/${id}/character`,
            cbSuccess:(persona)=>{
                let data = persona.data,
                html = ""
               
                console.log(data.attributes);
;
                document.querySelector(".contenido").insertAdjacentHTML("afterend",
                personaje(data.attributes))
            }
        })


}