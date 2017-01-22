import config from '../config.json'

export const getMap = (onLoad) => {
  mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN

  const mapCenter = (() => {
    let loc = [-58.442947, -34.539081]
    if(localStorage.location) {
      try {
        loc = JSON.parse(localStorage.location)
      } catch (err) {
        console.log('invalid location in storage')
        localStorage.removeItem('location')
      }
    }
    return loc
  })()

  const map = new mapboxgl
    .Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: mapCenter,
      zoom: localStorage.location ? 12 : 8,
      minZoom: 8
    })

  map.on('load', function () { onLoad && onLoad(map) });

 if (navigator.geolocation && !localStorage.location) {
   navigator.geolocation.getCurrentPosition(
     function( position ){
       if (localStorage.location) return
       const currentLocation = [
         position.coords.longitude.toFixed(4),
         position.coords.latitude.toFixed(4)
       ]
       localStorage.setItem('location', JSON.stringify(currentLocation))
       map.setCenter(currentLocation)
     },
     null,
     {
       timeout: (30 * 1000),
       enableHighAccuracy: true
     }
   )
 }
}
