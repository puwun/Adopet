const search = () => {
    const searchBox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("card-list");
    const card = document.querySelectorAll(".card__article");
    const cname = storeitems.getElementsByTagName("h2");
    
    for(var i = 0; i < cname.length; i++){
        let match = card[i].getElementsByTagName("h2")[0];

        if(match){
            let textvalue = match.textContent || match.innerText

                if(textvalue.toUpperCase().indexOf(searchBox) > -1){
                    card[i].style.display = "";
                    // console.log("working", card[i])
                }else{
                    card[i].style.display = "none";
                    // console.log("not working")
            }
        }


    }
}


// async function searchBirds() {
//     const searchInput = document.getElementById('search-item').value.trim();
//     const url = `/adopt/birds?search=${encodeURIComponent(searchInput)}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       // Display search results on the web page
//       const searchResultsDiv = document.getElementById('searchResults');
//       searchResultsDiv.innerHTML = '';

//       data.forEach(bird => {
//         const birdInfo = document.createElement('div');
//         birdInfo.textContent = `Name: ${bird.name}, Breed: ${bird.breed}, Age: ${bird.age}, Gender: ${bird.gender}`;
//         searchResultsDiv.appendChild(birdInfo);
//       });
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }