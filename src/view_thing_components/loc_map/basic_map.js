import mapboxgl from 'mapbox-gl'
import CONFIG from 'config/common'

mapboxgl.accessToken = CONFIG.basemap.map_token

/**
 * Create a basic mapbox-gl map
 * @param {$store} [store] - Used to set error/loading messages
 * @returns {mapboxgl.Map}
 */
const basic_map = (div_id) => {
  const map = new mapboxgl.Map({
    container: div_id,
    style: CONFIG.basemap.default_centre.style,
    center: CONFIG.basemap.default_centre.coords,
    zoom: CONFIG.basemap.default_centre.zoom
  })

  // disable zooming with mouse scroll. now you can scroll
  map.scrollZoom.disable()

  // catch basic errors
  map.on('error', (e) => {
    console.warn('🗺 Basic map error:', e)
  })

  map.addControl(new mapboxgl.NavigationControl())

  return map
}

export {basic_map}
