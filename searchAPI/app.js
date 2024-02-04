// const form = document.querySelector('#searchForm');
// form.addEventListener('submit', async function (e) {
//     e.preventDefault();
//     // console.log(form.elements.querySelector.value);
// // console.dir(form.elements.query.value)
//     const searchTerm = form.elements.query.value;
//     const config = {params: {q: searchTerm}}
//     const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
//     createImages(res.data);
//     form.elements.query.value = '';
// })

// const createImages = (shows) => {
//     for(let s of shows){
//         if(s.show.image){
//             const img = document.createElement('IMG');
//             img.src = s.show.image.medium;
//             document.body.append(img);
//         }
        
//     }
// }



// function sendData(e){
//     fetch('/articles', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({payload: e.value})  
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       let searchResults = document.getElementById('searchResults');
//       searchResults.innerHTML = '';
//       data.forEach(item => {
//         searchResults.innerHTML += `
//         <div class = "design-content">
//             <!-- item -->
//             <!-- <div class="card"> -->
//             <div class = "design-item">
//               <div class="design-img">
//                 <a href="/articles/${item._id}">
//                   <img src="https://plus.unsplash.com/premium_photo-1663047910718-c8758a6785e9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="article-image">
//                   <!-- <label for="article-link">Article Link</label> -->
//                 </a>
//                 <span><i class="far fa-heart"></i> 22</span>
//                 <span>Adopet</span>
              
//               </div>
              
//               <div class = "design-title">
//                 <div class="card-content">
//                   <h2 class="card-title"><a href="/articles/${item._id}">${item.title}</a></h2>
//                   <p class="card-description">${item.content}</p>
                  
//                 </div>
//               </div>
//             </div>
//           </div>
//         `
//       })
//     })
//   }
  


const search = () => {
    const searchBox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("product-list");
    const product = document.querySelectorAll(".product");
    const pname = storeitems.getElementsByTagName("h2");
    
    for(var i = 0; i < pname.length; i++){
        let match = product[i].getElementsByTagName("h2")[0];

        if(match){
            let textvalue = match.textContent || match.innerText

                if(textvalue.toUpperCase().indexOf(searchBox) > -1){
                    product[i].style.display = "";
                    // console.log("working", product[i])
                }else{
                    product[i].style.display = "none";
                    // console.log("not working")
            }
        }


    }
}