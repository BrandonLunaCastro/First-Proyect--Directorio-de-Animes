import ajax from "./ajax.js";

export default  async function  character(id){

        ajax({
            url:`https://kitsu.io/api/edge/anime-characters/${id}/character`,
            cbSuccess:(persona)=>{
                let data = persona.data
                console.log(data.attributes)
            }
        })


}