
export function posts(props,id){
  let {posterImage,titles,slug} = props;

  //console.log(posterImage,titles)
  let titulo = titles.en ? titles.en : titles.en_jp;

    document.addEventListener("click",e =>{
      if(!e.target.matches(".targeta a"))return false;
      localStorage.setItem("PostId",e.target.dataset.id);
    })

     return `
      <article class="targeta">
       
        <img src="${posterImage.original}"> 
        <h2>${titulo}</h2>
        <p   ><a class="anime" data-id="${id}" href="#/${slug}">Ver mas...</a>.</p>
       
        
      </article>
    
    
    `;




}