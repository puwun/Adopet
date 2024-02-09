var ctr = 0;
var prevDir = '';

document.getElementById('startButton').addEventListener('click', function () {
  window.location.href = '/adopet';
});

document.getElementById('startButton').addEventListener('mouseenter', function () {
  
followCursorImage.style.display = 'none';
followCursorImage.style.display2 = 'none';

});

var customImage = document.getElementById('customImage');
var cursorCoordinates = document.getElementById('cursorCoordinates');
var imageCoordinates = document.getElementById('imageCoordinates');
var directionsDisplay = document.getElementById('directions');
var angleDisplay = document.getElementById('angle');
var tpCoordinates = document.getElementById('tpCoordinates');
var pawPrint = document.getElementById('pawPrint');
var customCursor = document.getElementById('customCursor');
var isMouseMoving = false;
var timeout;

// Create and append the image that follows the cursor
var followCursorImage = document.createElement('img');
followCursorImage.setAttribute('src', '../images/41-unscreen.gif');
followCursorImage.setAttribute('id', 'followCursorImage');
followCursorImage.setAttribute('width', '200px');
followCursorImage.style.position = 'fixed';
followCursorImage.style.zIndex = '9999';
document.body.appendChild(followCursorImage);
followCursorImage.style.display = 'none';

// Create and append the second image that follows the cursor with horizontal mirror effect
var followCursorImage2 = document.createElement('img');
followCursorImage2.setAttribute('src', '../images/41-unscreen.gif');
followCursorImage2.setAttribute('id', 'followCursorImage2');
followCursorImage2.setAttribute('width', '200px');
followCursorImage2.style.position = 'fixed';
followCursorImage2.style.zIndex = '9999';
followCursorImage2.style.transform = 'scaleX(-1)'; // Apply horizontal mirror effect
document.body.appendChild(followCursorImage2);
followCursorImage2.style.display = 'none';

// Initially hide the customImage
customImage.style.display = 'none';

document.addEventListener('mousemove', function (e) {
  cursorCoordinates.innerText = 'Cursor Coordinates: ' + e.clientX + ' , ' + e.clientY;

  // Update the position of followCursorImage to stick to the cursor
  followCursorImage.style.left = (e.clientX - 30) + 'px'; // Shift left by 30 pixels
  followCursorImage.style.top = (e.clientY - 30) + 'px'; // Shift up by 30 pixels

  // Update the position of followCursorImage2 to stick to the cursor
  followCursorImage2.style.left = (e.clientX - 30) + 'px'; // Shift left by 30 pixels
  followCursorImage2.style.top = (e.clientY - 30) + 'px'; // Shift up by 30 pixels

  // Update the position of the custom cursor
  customCursor.style.left = e.clientX + 'px';
  customCursor.style.top = e.clientY + 'px';

  // Hide or show followCursorImage based on the value of ctr
  

  var cursorX = e.clientX;
  var cursorY = e.clientY;
  var tpX = e.clientX - 102;
  var tpY = e.clientY - 125;
  var imageX = customImage.offsetLeft;
  var imageY = customImage.offsetTop;

  var distance = Math.sqrt(Math.pow(tpX - imageX, 2) + Math.pow(tpY - imageY, 2));
  var velocity = distance * 0.01;

  customImage.style.transition = `left ${velocity}s, top ${velocity}s`;

  customImage.style.left = tpX + 'px';
  customImage.style.top = tpY + 'px';

  imageCoordinates.innerText = 'Image Coordinates: ' + customImage.offsetLeft + ' , ' + customImage.offsetTop;

  var deltaX = tpX - imageX;
  var deltaY = tpY - imageY;


  // Update the value of ctr based on the deltaX and deltaY values
  ctr = (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 30) ? 1 : 0;


 // Hide or show the gif-sticking-cursor based on the value of ctr and prevDir
if (ctr === 0) {
  followCursorImage.style.display = 'none';
  followCursorImage2.style.display = 'none';
} else {
  if (prevDir === 'Northwest' || prevDir === 'West' || prevDir === 'Southwest' || prevDir === 'South') {
    followCursorImage.style.display = 'block';
    followCursorImage2.style.display = 'none';
  } else {
    followCursorImage.style.display = 'none';
    followCursorImage2.style.display = 'block';
  }
}


  // Hide or show the customImage based on the value of ctr
  if (ctr === 0) {
    customImage.style.display = 'block';
  } else {
    customImage.style.display = 'none';
  }

if(ctr===0){
  var angleInDegrees = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  angleDisplay.innerText = 'Angle (in degrees): ' + angleInDegrees.toFixed(2);

  var directions = '';
  
  if (angleInDegrees >= -22.5 && angleInDegrees < 22.5) {
    directions = 'East';
    pawPrint.style.transform = 'rotate(90deg)';
  } else if (angleInDegrees >= 22.5 && angleInDegrees < 67.5) {
    directions = 'Southeast';
    pawPrint.style.transform = 'rotate(135deg)';
  } else if (angleInDegrees >= 67.5 && angleInDegrees < 112.5) {
    directions = 'South';
    pawPrint.style.transform = 'rotate(180deg)';
  } else if (angleInDegrees >= 112.5 && angleInDegrees < 157.5) {
    directions = 'Southwest';
    pawPrint.style.transform = 'rotate(225deg)';
  } else if (angleInDegrees >= 157.5 || angleInDegrees < -157.5) {
    directions = 'West';
    pawPrint.style.transform = 'rotate(-90deg)';
  } else if (angleInDegrees >= -157.5 && angleInDegrees < -112.5) {
    directions = 'Northwest';
    pawPrint.style.transform = 'rotate(-45deg)';
  } else if (angleInDegrees >= -112.5 && angleInDegrees < -67.5) {
    directions = 'North';
    pawPrint.style.transform = 'rotate(0deg)';
  } else if (angleInDegrees >= -67.5 && angleInDegrees < -22.5) {
    directions = 'Northeast';
    pawPrint.style.transform = 'rotate(45deg)';
  }
// Store previous direction in prevDir variable
  prevDir = directions;
}

  




  isMouseMoving = true;
  clearTimeout(timeout);

  timeout = setTimeout(function () {
    if (isMouseMoving) {

    } else {
      customImage.style.transition = 'none';
      customImage.style.left = tpX - customImage.width / 2 + 'px';
      customImage.style.top = tpY - customImage.height / 2 + 'px';
      setTimeout(function () {
        customImage.style.transition = `left ${velocity}s, top ${velocity}s`;
      }, 0);

      pawPrint.style.transform = 'rotate(0deg)';
    }

    isMouseMoving = false;
  }, 300);

  changeCustomImageSource(directions);

  tpCoordinates.innerText = 'TP Coordinates: ' + tpX + ' , ' + tpY;
});

function changeCustomImageSource(direction) {
  var imageSources = {
    'North': '../images/46-4--unscreen.gif',
    'South': '../images/46-5--unscreen.gif',
    'Northwest': '../images/46-3--unscreen.gif',
    'Northeast': '../images/46-2--unscreen.gif',
    'Southeast': '../images/46-1--unscreen.gif',
    'Southwest': '../images/46-unscreen.gif',
    'East': '../images/26-unscreen.gif',
    'West': '../images/24-unscreen.gif'
  };

  customImage.src = imageSources[direction] || customImage.src;
  customImage.style.width = '300px';
}