var titlearray = ["css", "js", "python", "java", "android", "jquery", "ruby"];
var descriptionarray = ["css style", "js program", "python code", "java objects", "android program", "jquery objects", "ruby code"];

var dynamicContainer = document.querySelector('#container');

for (var i = 0; i < titlearray.length; i++) {
  var card = document.createElement('div');
  card.id = `cards${i}`;
  card.classList.add('boxes');

  var boxContent = document.createElement('div');
  boxContent.classList.add('box-content');

  var title = document.createElement('h2');
  title.textContent = titlearray[i];

  var description = document.createElement('p');
  description.textContent = descriptionarray[i];

  var readMoreLink = document.createElement('a');
  readMoreLink.href = '#';
  readMoreLink.classList.add('showmore');
  readMoreLink.textContent = 'Read More';

  boxContent.appendChild(title);
  boxContent.appendChild(description);
  boxContent.appendChild(readMoreLink);

  card.appendChild(boxContent);

  dynamicContainer.appendChild(card);

  // Set background image
  var bgimg = document.getElementById(`cards${i}`);
  bgimg.style.backgroundImage = `url('img/${titlearray[i]}.jpg')`;
}

