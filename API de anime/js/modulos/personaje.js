export function personaje(props){

    let {canonicalName,image} = props

    return `
        <figure class="character">
            <img src="${image.original}" alt="imagen del personaje">
            <figcaption>${canonicalName}</figcaption>
        </figure>
    
    
    `


}