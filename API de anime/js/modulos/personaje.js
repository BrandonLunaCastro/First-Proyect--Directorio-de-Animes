export function personaje(props){

    let {canonicalName,image} = props
  
    const $figure = document.createElement("figure"),
    $img = document.createElement("img"),
    $figcaption = document.createElement("figcaption")


    $figure.appendChild($img)
    $figure.appendChild($figcaption)
    $figure.classList.add("character")

    $img.setAttribute("src",`${image.original}`);
    $img.alt = "imagen del personaje";
    $figcaption.textContent = canonicalName;

    return $figure;

    
}