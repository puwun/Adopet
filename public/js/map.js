const myMap = L.map('map').setView([19.0760, 72.8777 ], 11);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">';
const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(myMap);


function generateList() {
  const ul = document.querySelector('.list');
  eventList.forEach((event) => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const a = document.createElement('a');
    const p = document.createElement('p');
    a.addEventListener('click', () => {
        flyToEvent(event);
    });
    div.classList.add('event-item');
    a.innerText = event.properties.name;
    a.href = '#';
    p.innerText = event.properties.address;

    div.appendChild(a);
    div.appendChild(p);
    li.appendChild(div);
    ul.appendChild(li);
  });
}

generateList();

function makePopupContent(event) {
  return `
    <div>
        <h4>${event.properties.name}</h4>
        <p>${event.properties.address}</p>
        <div class="phone-number">
            <a href="tel:${event.properties.phone}">${event.properties.phone}</a>
        </div>
    </div>
  `;
}
function onEachFeature(feature, layer) {
    layer.bindPopup(makePopupContent(feature), { closeButton: false, offset: L.point(0, -8) });
}

var myIcon = L.icon({
    iconUrl: '../images/dog_loc_pin.png',
    iconSize: [85, 85]
});

const eventLayer = L.geoJSON(eventList, {
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, { icon: myIcon });
    }
});
eventLayer.addTo(myMap);

function flyToEvent(event) {
    const lat = event.geometry.coordinates[1];
    const lng = event.geometry.coordinates[0];
    myMap.flyTo([lat, lng], 15, {
        duration: 2
    });
    setTimeout(() => {
        L.popup({closeButton: false, offset: L.point(0, -8)})
        .setLatLng([lat, lng])
        .setContent(makePopupContent(event))
        .openOn(myMap);
    }, 2450);
}



