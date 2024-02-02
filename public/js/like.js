// const heartIcon = document.querySelector(".like-button .heart-icon");
// const likesAmountLabel = document.querySelector(".like-button .likes-amount");

// // let likesAmount = 7;

// heartIcon.addEventListener("click", () => {
//   heartIcon.classList.toggle("liked");
//   if (heartIcon.classList.contains("liked")) {
    
//     // likesAmount++;
//   } else {
//     // likesAmount--;
//   }

//   likesAmountLabel.innerHTML = likesAmount;
// });


// Select all like buttons
// const likeButtons = document.querySelectorAll(".like-button");

// likeButtons.forEach(button => {
//   const heartIcon = button.querySelector(".heart-icon");
//   const likesAmountLabel = button.querySelector(".likes-amount");

//   // let likesAmount = 7; // You might want to get this value from your server or a data attribute

//   heartIcon.addEventListener("click", () => {
//     heartIcon.classList.toggle("liked");
//     if (heartIcon.classList.contains("liked")) {
//       // likesAmount++;
//     //   const { subject, feedback } = req.body;
//     //   await User.updateOne({ _id: req.user._id }, { $push: { subject: subject, feedback: feedback } });
//     console.log('----------------------');
//     // console.log(req.body);
  
//     } else {
//       // likesAmount--;
//       console.log('----------------------');
//     // console.log(req.body);
//     }

//     likesAmountLabel.innerHTML = likesAmount;
//   });
// });
//------------------------------------------------



// Select all like buttons
const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach(button => {
  const heartIcon = button.querySelector(".heart-icon");
  // const likesAmountLabel = button.querySelector(".likes-amount");
  const postId = button.dataset.postId; // Assuming the post ID is stored in a data attribute

  heartIcon.addEventListener("click", async () => {
    heartIcon.classList.toggle("liked");
    const isLiked = heartIcon.classList.contains("liked");

    // Make a POST request to the /like route on your server
    const response = await fetch('/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isLiked, postId }), // Send the post ID and whether the post is liked in the request body
    });

    if (!response.ok) {
      console.error('Error:', response.statusText);
      return;
    }

    const data = await response.json();

    // Update the likes amount label with the new likes amount from the server
    likesAmountLabel.innerHTML = data.likesAmount;
  });
});