import ajax from "./ajax";

export async function infiniteScroll(url){
    window.addEventListener("scroll",e => {
        let {scrollTop,scrollHeight,clientHeight} = document.documentElement,
        direccionURL,
        id = localStorage.getItem("PostId"),
        page=0

        if(location.hash === "#/personajes"){
            page+=20
            direccionURL = `https://kitsu.io/api/edge/anime/${id}/characters?page[limit]=20&page[offset]=${page}`
        }else if(location.hash === "#/episodios"){
            page
        }

        if(scrollTop + clientHeight >= scrollHeight){
            ajax({
                url: direccionURL,
                cbSuccess:(personajes) =>{
    
                }
            })
    
        }
        
    })
}