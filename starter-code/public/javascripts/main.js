let map;
const markers = [];

function getPlaces() {
  axios.get('/places/api')
    .then((response) => {
      placePlaces(response.data.places);
    })
    .catch((error) => {
      console.log(error);
    });
}

function placePlaces(places) {
  places.forEach((place) => {
    if (place.location.coordinates.length) {
      console.log('->', place.location.coordinates);
      const center = {
        lat: place.location.coordinates[1],
        lng: place.location.coordinates[0]
      };
      const pin = new google.maps.Marker({
        position: center,
        map: map,
        title: place.name
      });
      markers.push(pin);
    }
  });
}

window.onload = () => {
  const ironhackBCN = {
    lat: 41.386230,
    lng: 2.174980
  };

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ironhackBCN
  });

  let center = {
    lat: undefined,
    lng: undefined
  };
};