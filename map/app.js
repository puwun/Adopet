let map;
    function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 19.0760, lng: 72.8777 },
        zoom: 10,
    });
    const vetMarker = new google.maps.Marker([{
        position: {lat:18.96608,lng: 72.8120},
        map:map,
        title:"K-9 Pet Clinic",
        draggable: false,
        icon: "blue.png"
    },{
    position: {lat:19.0543, lng: 72.8916},
    map:map,
    title:"Supervets Clinic and Diagnotics",
    draggable: false,
    icon: "blue.png"
    },{
    position: {lat:19.2282, lng:72.9758},
        map:map,
        title:"Vetic Pet Clinic",
        draggable: false,
        icon: "blue.png"
    }]);
    
    const adoptionMarker = new google.maps.Marker([{
        position: {lat:19.2153, lng:72.8343},
        map:map,
        title:"Mumbai pet point",
        draggable: false,
        icon: "green.png"
    },{
    position: {lat:19.1918, lng:72.8054},
    map:map,
    title:"YODA Rehabilitation Centre for Animals",
    draggable: false,
    icon: "green.png"
    },{
    position: {lat:18.9934, lng:72.8491},
        map:map,
        title:"The Welfare Of Stray Dogs",
        draggable: false,
        icon: "green.png"
    }]);
}