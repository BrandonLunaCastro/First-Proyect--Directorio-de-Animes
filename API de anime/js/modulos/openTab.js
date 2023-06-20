export function openTab(){

    let tabs = Array.from(document.querySelectorAll(".tabs__item")),
        panels = Array.from(document.querySelectorAll(".panel__items"))
    
    //console.log(tabs, panels)
    


    document.getElementById("tabs").addEventListener("click",e=> {
            if(e.target.matches("#sinopsis")){
                console.log("funciona en" , e.target)
            
                let index = tabs.indexOf(e.target)
            
                tabs.map(tab => tab.classList.remove("active"))
                tabs[index].classList.add("active")
                
                panels.map(panel => panel.classList.remove("is-active"))
                panels[index].classList.add("is-active")
         
            }
            if(e.target.matches("#personajes")){
               
                let index = tabs.indexOf(e.target)
               
                tabs.map(tab => tab.classList.remove("active"))
                tabs[index].classList.add("active")
            
                panels.map(panel => panel.classList.remove("is-active"))
                panels[index].classList.add("is-active")
            }
            if(e.target.matches("#episodios")){
        
                let index = tabs.indexOf(e.target)
        
                tabs.map(tab => tab.classList.remove("active"))
                tabs[index].classList.add("active")
        
                panels.map(panel => panel.classList.remove("is-active"))
                panels[index].classList.add("is-active")
        
            }
    })           

}

