window.onload = init;

function init(){
    var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 5
    })
  });

  map.on('click', function(e){
      console.log(e.coordinate);
      console.log(ol.proj.toLonLat(e.coordinate));
      
  })
  
  var geocoder = new maptiler.Geocoder({
    input: 'search',
    key: 'BqKwpNnya8hizpvG7OlA'
  });
  geocoder.on('select', function(item) {
    console.log('Selected', item);
    map.getView().setCenter(ol.proj.fromLonLat(item.center));
  });

}

  
      


