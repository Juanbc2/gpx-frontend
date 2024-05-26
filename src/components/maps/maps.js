import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => {
  const greatPlaceStyle = {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: 24,
    padding: "15px 10px",
    display: "inline-flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    fontWeight: "bold",
  };

  return <div style={greatPlaceStyle}>{text}</div>;
};

// function convertDMSToDD(degrees, minutes, direction) {
//   let dd = Number(degrees) + minutes / 60;

//   if (direction === "S" || direction === "W") {
//     dd = dd * -1;
//   }

//   return dd;
// }

// function convertCoordinate(coordinate) {
//   const [latDMS, lngDMS] = coordinate.split("\t");

//   const [latD, latM, latDir] = latDMS.match(/(\d+)°(\d+\.\d+),([NS])/).slice(1);
//   const [lngD, lngM, lngDir] = lngDMS.match(/(\d+)°(\d+\.\d+),([EW])/).slice(1);

//   const lat = convertDMSToDD(Number(latD), Number(latM), latDir);
//   const lng = convertDMSToDD(Number(lngD), Number(lngM), lngDir);

//   return { lat, lng };
// }

const Maps = ({ coords, userCoords }) => {
  const [mapState, setMapState] = React.useState({
    center: coords[0],
    zoom: 15,
  });

  const handleApiLoaded = (map, maps) => {
    const path = coords.map(
      (location) => new maps.LatLng(location.lat, location.lng)
    );

    new maps.Polyline({
      path,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: map,
    });

    const userPath = userCoords.map(
      (location) => new maps.LatLng(location.lat, location.lng)
    );

    new maps.Polyline({
      path: userPath,
      geodesic: true,
      strokeColor: "#0000FF",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: map,
    });

    // Dibujar un círculo alrededor de cada punto
    coords.forEach((location) => {
      new maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: location,
        radius: location.radius, // Cambia esto al radio que desees
      });
    });
  };

  const handleDrag = (mapProps) => {
    setMapState({
      center: mapProps.center,
      zoom: mapProps.zoom,
    });
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "" }}
      defaultCenter={mapState.center}
      defaultZoom={mapState.zoom}
      center={mapState.center}
      onChange={handleDrag}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
    >
      <div>
        {coords.map((location, index) => (
          <AnyReactComponent
            key={index}
            lat={location.lat}
            lng={location.lng}
          />
        ))}
        {userCoords.map((location, index) => (
          <AnyReactComponent
            key={index}
            lat={location.lat}
            lng={location.lng}
          />
        ))}
      </div>
    </GoogleMapReact>
  );
};

export default Maps;
