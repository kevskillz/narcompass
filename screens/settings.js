import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, Switch } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { _RADIUS, setRadius } from './map';
import { isNarcanCarrier, setNarcanCarrierState } from './Active';
import { getUser } from '../src/dbFunctions';
import { _ID, client } from '../App';

// Define sections and their corresponding items
const SETTINGS_SECTIONS = [
  {
    header: 'Preferences',
    items: [
      { id: 'increased radius', icon: 'wifi', label: 'Use Expanded Radius', type: 'radius' },
      { id: 'carrier', icon: 'bell', label: 'Is Narcan Carrier', type: 'carrier' },
    ],
  },
];

export default function Settings() {
  // State for user profile information
  const [userName, setUserName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [age, setAge] = useState(0);

  // State for Narcan carrier, dark mode, and radius mode
  const [narcanCarrier, setNarcanCarrier] = useState(isNarcanCarrier);
  const [darkMode, setDarkMode] = useState(false);
  const [radiusMode, setRadiusMode] = useState(_RADIUS === 2 ? false : true);

  useEffect(() => {
    // Fetch user information on component mount
    (async () => {
      let { name, phoneNumber, age } = await getUser(client, { id: _ID });
      // initalize values based on user info stored in database
      setUserName(name);
      setPhoneNum(phoneNumber);
      setAge(age);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Profile Information */}
        <View style={styles.profile}>
          <Image
            source={{ // sample image
              uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80', 
            }}
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileNum}>Phone Number: {phoneNum}</Text>
          <Text style={styles.profileNum}>Age: {age}</Text>
        </View>

        {/* Settings Sections */}
        {SETTINGS_SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {/* Render each setting item */}
              {items.map(({ id, label, icon, type }) => (
                <View style={styles.rowWrapper} key={id}>
                  <TouchableOpacity onPress={() => {}}>
                    <View style={styles.row}>
                      <FeatherIcon color="#616161" name={icon} style={styles.rowIcon} size={22} />
                      <Text style={styles.rowLabel}>{label}</Text>
                      <View style={styles.rowSpacer} />
                      
                      {type === 'carrier' && (
                        // update on carrier based on state of switch
                        <Switch
                          value={narcanCarrier} 
                          onValueChange={(value) => {
                            setNarcanCarrierState(value);
                            setNarcanCarrier(value);
                          }}
                        />
                      )}
                      {type === 'radius' && (
                        // update on expanded radius based on state of switch
                        <Switch
                          value={radiusMode}
                          onValueChange={async (value) => {
                            if (value) setRadius(10); // sets expanded radius of 10 miles
                            else setRadius(2); // sets expanded radius to 2 miles
                            setRadiusMode(value);
                          }}
                        />
                      )}
                      {/* Add other setting types as needed */}
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#090909',
  },
  profileNum: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  rowValue: {
    fontSize: 17,
    color: '#616161',
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});