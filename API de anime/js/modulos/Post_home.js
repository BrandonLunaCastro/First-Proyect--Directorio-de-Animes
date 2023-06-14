

export function posts(props){
  let {posterImage,titles} = props;

  //console.log(posterImage,titles)
  let titulo = titles.en ? titles.en : titles.en_jp;

     return `
      <article class="targeta">
       
        <img src="${posterImage.original}"> 
        <h2>${titulo}</h2>
        <p><a href="#">Ver mas...</a>.</p>
       
      
      </article>
    
    
    `;




}