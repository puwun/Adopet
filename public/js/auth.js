document.querySelector('.img-btn').addEventListener('click', function()
	{
		document.querySelector('.cont').classList.toggle('s-signup')
	}
);


(function () {
'use strict'

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.prototype.slice.call(forms)
  .forEach(function (form) {
	form.addEventListener('submit', function (event) {
	  if (!form.checkValidity()) {
		event.preventDefault()
		event.stopPropagation()
	  }
	  form.classList.add('was-validated')
	}, false)
  })
})()


// document.addEventListener('DOMContentLoaded', () => {
// 	const formContainer = document.querySelector('.cont');
// 	const signInForm = formContainer.querySelector('.sign-in');
//     const signUpForm = formContainer.querySelector('.sign-up');
//     const signUpButton = formContainer.querySelector('.m-up');
//     const signInButton = formContainer.querySelector('.m-in');
	
// 	formContainer.addEventListener('click', e => {})
// });