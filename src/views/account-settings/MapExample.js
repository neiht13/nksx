import React, {useEffect} from "react";

function MapExample(props) {
  const {currentUser, markers, circles, center, zoom, height, address} = props
  const mapRef = React.useRef(null);

  useEffect(()=>{
    var container = L.DomUtil.get('map');
    if(container != null){
      container._leaflet_id = null;
    }
    let map = L.map('map').setView([center.lat, center.lng], zoom);

    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 17,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: '<a href="https://maps.google.com">Google Maps</a> &copy; <a href="http://vnptdongthap.com.vn/">VNPT Đồng Tháp</a>'
    }).addTo(map);

    markers && markers.forEach(marker =>{
      let m = L.marker([parseFloat(marker.lat), parseFloat(marker.lng)]).addTo(map)
      m.bindPopup(address).openPopup();
      m._icon.style.filter = "hue-rotate(120deg)"


    })

    circles && circles.forEach(circle=>{
     L.circle([parseFloat(circle.lat), parseFloat(circle.lng)], {
        color: 'red',
        fillColor: circle.color || '#f03',
        fillOpacity: 0.5,
        radius: circle.radius || 300
      }).addTo(map);
    })

  },[])

  return (
    <>
      <div id="map" style={{height:  height}}></div>
    </>
  );
}

export default MapExample;
