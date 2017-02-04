import config from '../config.json'

function mapCenter() {
  let loc = [-58.442947, -34.539081]
  if(localStorage.location) {
    try {
      loc = JSON.parse(localStorage.location)
    } catch (err) {
      loc = [-58.442947, -34.539081]
      localStorage.removeItem('location')
    }
  }
  return loc
}

function checkLocation (map) {
  if (!navigator.geolocation) return
  navigator.geolocation.getCurrentPosition(
    function( position ){
      const currentLocation = [
        position.coords.longitude.toFixed(4),
        position.coords.latitude.toFixed(4)
      ]
      if (localStorage.location === JSON.stringify(currentLocation)) return
      localStorage.setItem('location', JSON.stringify(currentLocation))
      map.setCenter(currentLocation)
      map.setZoom(12)
    },
    null,
    {
      timeout: (30 * 1000),
      enableHighAccuracy: true
    }
  )
}

const viveroSourceLayer = {
  id: 'viveros-data',
  type: 'circle',
  source: {
    type: 'vector',
    url: 'mapbox://franciclo.60hn6rea'
  },
  'source-layer': 'viveros-dpwoee',
  paint: {
    'circle-color': '#f0f',
    'circle-radius': 18
  }
}

export const initMap = (onLoad) => {
  mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN
  const map = new mapboxgl
    .Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: mapCenter(),
      zoom: localStorage.location ? 12 : 10,
      minZoom: 10
    })

  map.on('load', function () {
    checkLocation(map)
    map.on('error', e => { console.error('MAPBOX ERROR ', e.error.message, e.error.stack) })
    map.addLayer(viveroSourceLayer)
    map.once('tiledata', () => { onLoad(map) })
  })
}
