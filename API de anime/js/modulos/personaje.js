export function personaje(props){

    let {canonicalName,image} = props
  
    let $figure = document.createElement("figure"),
    $img = document.createElement("img"),
    $figcaption = document.createElement("figcaption"),
    imagen = image ? image.original : "assets/files/no-image-available.jpeg"


    $figure.appendChild($img)
    $figure.appendChild($figcaption)
    $figure.classList.add("character")

    $img.setAttribute("src",`${imagen}`);
    $img.alt = canonicalName;
    $figcaption.textContent = canonicalName.length > 15 ?canonicalName.slice(0,15)+"..." : canonicalName

    return $figure;
}