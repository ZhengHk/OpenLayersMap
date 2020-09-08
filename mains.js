window.onload = init;

function init(){
    let map = new ol.Map({
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

  
  console.log('test');
  let geocoder = new maptiler.Geocoder({
    input: 'search',
    key: 'BqKwpNnya8hizpvG7OlA'
  });
  geocoder.on('select', function(item) {
    console.log('Selected', item);
    map.getView().setCenter(ol.proj.fromLonLat(item.center));
    console.log(item.bbox);

    let tempArray = item.bbox;
    tempArray[4] = item.bbox[0];
    let coordinates = 
      [
        [
          ol.proj.fromLonLat([item.bbox[0],
          item.bbox[1]])
        ],
        [
          ol.proj.fromLonLat([item.bbox[2],
            item.bbox[1]])
        ],
        [
          ol.proj.fromLonLat([item.bbox[2],
            item.bbox[3]])
        ],
        [
          ol.proj.fromLonLat([item.bbox[0],
            item.bbox[3]])
        ],
        [
          ol.proj.fromLonLat([item.bbox[0],
            item.bbox[1]])
        ]
      ]
    let poly = new ol.geom.Polygon(coordinates);
    console.log(poly);
    map.getView().fit(poly);
    
    let layer = new ol.layer.Vector({
      source: new ol.source.Vector({
          features: [
              new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat(item.center))
              })
          ]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1],
          src: './data/174-free-google-maps-pointer.png',
          scale: 0.1,
        }),
      }),
  });
  
  map.on('click', function(e){
    console.log(e.coordinate);
    console.log(ol.proj.toLonLat(e.coordinate));
    map.removeLayer(layer);
})

 
  map.addLayer(layer);
  });
  console.log('After');

}


      


