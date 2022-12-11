var dropdown=document.querySelectorAll(".dropdown");
dropdown.forEach(element => element.addEventListener("click",function(){
    for(var drop of dropdown){
            if (drop!=element){
                var content=drop.lastElementChild;
                var icon=drop.firstElementChild;
                icon.classList.add("normal-ef");
                icon.classList.remove("rotate-ef");
                content.classList.remove("dropdown-ef");
                content.classList.add("dropup-ef");
            }
        }
    
    var content=element.lastElementChild;
    var icon=element.firstElementChild;
    if (content.clientHeight==0){
        icon.classList.add("rotate-ef");
        icon.classList.remove("normal-ef");
        content.classList.add("dropdown-ef");
        content.classList.remove("dropup-ef");
        

        
    }
    else{
        icon.classList.add("normal-ef");
        icon.classList.remove("rotate-ef");
        content.classList.remove("dropdown-ef");
        content.classList.add("dropup-ef");
    }
    
}));