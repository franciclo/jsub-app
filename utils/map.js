import config from '../config.json'
import viveroBg from '../layers/vivero-bg.json'
import viveroCount from '../layers/vivero-count.json'
import clusterBg from '../layers/cluster-bg.json'
import clusterCount from '../layers/cluster-count.json'

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

const viverosStockSource = {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [{
      'type': 'Feature',
      'geometry': { 'type': 'Point', 'coordinates': [] }
    }]
  },
  cluster: true,
  clusterMaxZoom: 22,
  clusterRadius: 15
}

export const initMap = (onLoad) => {
  mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN
  const map = new mapboxgl
    .Map({
      container: 'map',
      style: 'mapbox://styles/franciclo/ciyrc526h002l2rpd4uxnxkph',
      center: mapCenter(),
      zoom: localStorage.location ? 12 : 10,
      minZoom: 10
    })

  map.on('load', function () {
    checkLocation(map)
    map.on('error', e => {
      const msg = e.error.message || e.error
      const info = e.error.stack || e
      console.error('MAPBOX ERROR ', msg, info)
    })
    map.addSource('viveros-stock', viverosStockSource)
    map.addLayer(viveroBg)
    map.addLayer(viveroCount)
    map.addLayer(clusterBg)
    map.addLayer(clusterCount)
    map.once('tiledata', onLoad)
  })
  return map
}
