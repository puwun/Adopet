const search = () => {
    const searchBox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("card-list");
    const card = document.querySelectorAll(".design-content");
    const cname = document.getElementsByTagName("h2");
    
    for(var i = 0; i < cname.length; i++){
        let match = card[i].getElementsByTagName("h2")[0];
        console.dir(match)

        if(match){
            let textvalue = match.textContent || match.innerText

                if(textvalue.toUpperCase().indexOf(searchBox) > -1){
                    card[i].style.display = "";
                    console.dir(card[i].style.display)
                    console.log("working", card[i])
                }else{
                    card[i].style.display = "none";
                    console.dir(card[i].style.display)
                    console.log("not working")
            }
        }


    }
}