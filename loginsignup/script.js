document.querySelector('.img-btn').addEventListener('click', function()
	{
		document.querySelector('.cont').classList.toggle('s-signup')
	}
);


document.addEventListener('DOMContentLoaded', () => {
	const formContainer = document.querySelector('.cont');
	const signInForm = formContainer.querySelector('.sign-in');
    const signUpForm = formContainer.querySelector('.sign-up');
    const signUpButton = formContainer.querySelector('.m-up');
    const signInButton = formContainer.querySelector('.m-in');
	
	formContainer.addEventListener('click', e => {})
});