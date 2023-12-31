export default function episodes(props){
    //console.log(props.attributes)
    let {canonicalTitle,thumbnail,number} = props.attributes,
    img = thumbnail ? thumbnail.original : "assets/files/no-image-available.jpeg",
    titulo = canonicalTitle 
                   ? canonicalTitle.length > 20 
                   ? canonicalTitle.slice(0,20)+"..." 
                   : canonicalTitle
                   : "No hay titulo disponible"
    return `
    <article class="container-episodes">
        <img src="${img}" alt="${titulo}">
        <p><strong>Episodio ${number}</strong> ${titulo}</p>
    </article>
    `;
}