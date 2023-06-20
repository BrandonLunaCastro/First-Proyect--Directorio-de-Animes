export function openTab(event, section){
    let $tabContent = document.querySelectorAll(".tabContent"),
    $tabsLinks = document.querySelectorAll(".tabs-links");

     for(let i = 0 ; i<$tabContent.length; i++){
        $tabContent[i].style.display = "none";
    }

    for(let i = 0 ; i< $tabsLinks.length ; i++){
            $tabsLinks[i].classList.remove("active")
    }

    document.getElementById(section).style.display = "block"
    event.currentTarget.classList.add("active")
}


