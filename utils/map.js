import config from '../config.json'

export const getMap = (center, onLoad) => {
  mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN
  const map = new mapboxgl
    .Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center,
      zoom: 9
    })
  map.on('load', function () { onLoad(map) });
}


export const show = () => getLock(getOptions()).show()

export const logout = () => getLock().logout({ returnTo: getBaseUrl() })
