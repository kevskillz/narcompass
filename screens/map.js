import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { Text, View } from '../components/Themed';
import { onCreateOverdoses, onDeleteOverdoses, onUpdateOverdoses } from '../src/graphql/subscriptions';
import { createLocation, createOverdose, deleteOverdose, getLocation, getOverdose, getUser, listLocations, updateLocation } from '../src/dbFunctions';
import { client, _ID } from '../App';
import Toast from 'react-native-toast-message';
import narcanImage from "../assets/images/narcan2PNG.png";
import { MaterialIcons } from "@expo/vector-icons";
import Geocoding from 'react-native-geocoding';
import { isNarcanCarrier } from './Active';

// Initialize Geocoding with API key (public for testing purposes and demo)
Geocoding.init(process.env.GOOGLE_MAPS_API_KEY);

// Reverse geocode function to get address from latitude and longitude
export const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await Geocoding.from(latitude, longitude);
    const address = response.results[0].formatted_address;
    return address;
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
  }
};

const TEST_LAT = 40.1466;
const TEST_LONG = -75.27131;

// location data of  current user and nearby users experiencing overdose
export let locationData = [
  { id: _ID, title: 'Current Location', coordinate: { latitude: TEST_LAT, longitude: TEST_LONG } }, // updates this default pose to match current location
];

export let _RADIUS = 2.0; // 2 miles

// Set the radius for location filtering
export function setRadius(radius) {
  _RADIUS = radius;
}

// Calculate distance between two coordinates
export function getDistance(longitude, latitude) {
  return Math.sqrt((Math.pow((latitude - locationData[0].coordinate.latitude), 2) + Math.pow((longitude - locationData[0].coordinate.longitude), 2)) * 3958.8);
}

export default function Map() {
  const showToast = (message) => {
    Toast.show({
      type: 'customToast',
      position: 'top',
      topOffset: 35,
      visibilityTime: 20000,
      props: { message },
    });
  }

  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const [reportButtonColor, setReportButtonColor] = useState('green');
  const [reportButtonText, setReportButtonText] = useState('Report');

  // Handle button press for reporting overdose or canceling help
  async function handleReportButtonPress() {
    if (reportButtonText === 'Report') {
      await createOverdose(client, { id: _ID, timestamp: new Date().getMilliseconds(), active: true }); // creates overdose in database
      showToast("Overdose help requested!");
      setReportButtonColor('red');
      setReportButtonText('Cancel');
    } else {
      await deleteOverdose(client, { id: _ID }); // removes overdose is database
      showToast("Help cancelled!");
      setReportButtonColor('green');
      setReportButtonText('Report');
    }
  };

  // Variables for tracking state changes
  let first = true;
  let lastNumHelpers = -1;

  // Refresh location markers on the map
  async function refreshLocations() {
    const newMarkers = [locationData[0]];

    try {
      const locations = await listLocations(client, {});


      for (item of locations) {
        const { id, latitude, longitude } = item;
        let overdoseData = await getOverdose(client, { id }); // if current user reported overdose
        if (overdoseData === null) continue;

        const { active, helper_ids } = overdoseData;


        if (id === _ID) { // if on current user in database

          if (!active) continue;
          if (lastNumHelpers === helper_ids.length) continue;

          lastNumHelpers = helper_ids.length; // gets number of helpers on the way

          let message = `${helper_ids.length} helping!`;
          showToast(message);
          continue;
        }

        if (getDistance(longitude, latitude) > _RADIUS) continue; // if distance of other user outside set radius, ignore

        const { name } = await getUser(client, { id });

        if (active) { // if an overdose is active

          newMarkers.push({ id, title: name, coordinate: { latitude, longitude } });

          let address = await reverseGeocode(latitude, longitude);
          if (isNarcanCarrier && _RADIUS === 10) showToast(address); // alerts user with overdose registered as carrier
        }

        if (helper_ids.includes(_ID)) { // if set as helping user, create route
          setOrigin(locationData[0].coordinate);
          setDestination({ latitude, longitude });
        }
      };

    } catch (error) {
      console.error(error);
    }
    // update locationData with new overdose data
    locationData.splice(0, locationData.length);
    locationData = [...newMarkers]

    setMarkers(newMarkers);

  }

  useEffect(() => {


    // Subscribe to all updates on overdose events
    const subscribeToOverdoseEvents = (query) => {
      return client.graphql({ query }).subscribe({
        next: async ({ _data }) => {
          await refreshLocations();
        },
        error: (error) => console.error(error),
      });
    };

    const subscribeCreateOverdose = subscribeToOverdoseEvents(onCreateOverdoses);
    const subscribeDeleteOverdose = subscribeToOverdoseEvents(onDeleteOverdoses);
    const subscribeUpdateOverdose = subscribeToOverdoseEvents(onUpdateOverdoses);


    // Request location permission and watch user's location 
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      await refreshLocations(); // refresh locations on ititialize

      // continously update own posiiton to DB. For demo purposes, this is hardcoded so you can see the sample data
      let locationSubscription = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Highest }, async (location) => {
        // real data
        // let latitude = location.coords.latitude;
        // let longitude = location.coords.longitude;

        // using hardcoded data
        let latitude = TEST_LAT;
        let longitude = TEST_LONG;

        if (first) {
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          });
          first = false;
        }
        // does not update for demo purposes, but uncommenting this will allow it to update based on real time locaton
        locationData[0].coordinate = { latitude, longitude };
        let existingLocation = await getLocation(client, { id: _ID });
        let timestamp = new Date().getMilliseconds();

        // create location if does not exist, else update it
        if (existingLocation === null) {
          await createLocation(client, { id: _ID, longitude, latitude, timestamp });

        } else {
          await updateLocation(client, { id: _ID, longitude, latitude, timestamp });

        }
      });
    })();



  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      <TouchableOpacity
        style={[styles.reportButton, { backgroundColor: reportButtonColor }]}
        onPress={handleReportButtonPress}
      >
        <Text style={styles.reportButtonText}>{reportButtonText}</Text>
      </TouchableOpacity>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
      >
        {markers.map(marker => (
          <Marker
            key={marker.title}
            coordinate={marker.coordinate}
            title={marker.title}
            pinColor={'red'}
          />
        ))}
        {origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey="API_KEY"
            strokeWidth={3}
            strokeColor="red"
          />
        )}
      </MapView>
      <Toast config={toastConfig} />
    </View>
  );
}
const styles = StyleSheet.create({
  reportButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 100, // Set the width to the desired size
    height: 100, // Set the height to the same value as width for a circle
    borderRadius: 50, // Half of the width/height to make a circle
    overflow: 'hidden', // Ensure circular shape
    backgroundColor: '#131c25', // Background color
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure the button is above other components
  },

  reportButtonText: {
    color: '#FFFFFF', // Text color
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 0,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 0,
    height: 2,
    width: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: 'System',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1C2D40',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Ensure the image fits within the circle
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  infoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#131c25',
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Ensure the icon fits within the circle
  },
});
const toastConfig = {

  customToast: ({ props }) => (
    <View
      style={{
        backgroundColor: '#131c25',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '85%',
      }}
    >
      <View style={styles.circle}>
        <Image source={narcanImage} style={styles.image} />
      </View>
      <Text
        style={{
          flex: 1, // To center the address text within the box
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
          marginLeft: 10,
          textAlign: 'center', // Center the text horizontally
        }}
      >
        {props.message}
      </Text>

      <TouchableOpacity style={styles.infoCircle}>
        {/* Information symbol */}
        <MaterialIcons name="info" size={40} color="#FFFFFF" />
      </TouchableOpacity>

    </View>
  ),
};