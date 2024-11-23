import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from '../components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { appendOrRemoveHelpers, getOverdose } from '../src/dbFunctions';
import { _ID, client } from '../App';

export let isNarcanCarrier = false;

export function setNarcanCarrierState(state) {
    isNarcanCarrier = state;
}
const keyImageMapping = {
    time: require('../assets/images/time5.png'),
    location: require('../assets/images/location2.png'),
    assigned_carrier: require('../assets/images/unit1.png'),
    distance: require('../assets/images/distance1.png'),
    emergency_contact_info: require('../assets/images/phone.png'),
    current_status: require('../assets/images/status.png'),
};

// Custom labels for each key
const keyTextLabelMapping = {
    ID: 'Emergency ID',
    time: 'Time Emergency Received',
    location: 'Location Of Emergency',
    assigned_carrier: 'Assigned Carrier',
    distance: 'Distance to Victim (mi)',
    emergency_contact_info: 'Reporter Phone Number',
    current_status: 'Current Status Of Emergency',
};
export default function Active({ route }) {
    const navigation = useNavigation();
    const [isAccepted, setIsAccepted] = useState(false);
    useEffect(() => {
        (async () => {
            // instantiates accept/cancel button with the correct state
            let res = await getHelperIdx(data[0].ID);

            setIsAccepted(res !== -1);


        })();

    })


    const data = [route.params.itemData]; // Assuming you pass the data as 'items' through navigation
    const acceptCancelEmergency = async () => {
        // Logic for accepting the emergency

        if (isAccepted) {
            removeHelp(data[0].ID);
        }
        else {
            acceptHelp(data[0].ID);
        }

        setIsAccepted(!isAccepted);


    };
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={104} color="#FFFFFF" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    async function getHelperIdx(id) {
        let temp = await getOverdose(client, { id });
        if (temp === null) return;
        let { helper_ids } = temp;
        let idx = -1;
        for (let i = 0; i < helper_ids.length; i++) { // finds index of your id in those helping in overdose event to remove it
            if (helper_ids[i] === _ID) {
                idx = i;
                break;
            }
        }
        return idx;
    }

    async function acceptHelp(id) {
        await appendOrRemoveHelpers(client, { id, helper_id: _ID }); // add yourself as a helper

    }

    async function removeHelp(id) {
        let idx = await getHelperIdx(id);
        if (idx === -1) return;
        await appendOrRemoveHelpers(client, { id, remove_index: idx });
    }

    const renderItem = ({ item }) => (

        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Information</Text>
            </View>

            <View style={styles.separator} />

            {Object.entries(item).map(([key, value]) => {
                if (key === 'ID') {
                    return null; // Skip rendering for 'ID' key
                }
                let renderedValue = value;
                if (key === 'time') {
                    // Format 'time' if the key matches
                    renderedValue = new Date(value).toLocaleTimeString();
                }
                return (
                    <View key={key} style={styles.historyBox}>
                        <View style={styles.innerBox}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={keyImageMapping[key]}
                                    style={styles.defaultImage}
                                />
                            </View>
                            <View style={styles.verticalLine}></View>

                            <View style={styles.textContainer}>
                                <Text style={[styles.text, styles.titleText]}>{keyTextLabelMapping[key]}</Text>
                                <Text style={[styles.text, styles.contentText]}>
                                    {typeof renderedValue === 'number' ? value : `${renderedValue}`}
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            })}
            {
                // only show accept button if registered carrier
                isNarcanCarrier ? <TouchableOpacity
                    style={[styles.acceptButton, isAccepted ? styles.cancelButton : null]}
                    onPress={acceptCancelEmergency}
                >
                    <Text style={styles.acceptButtonText}>
                        {isAccepted ? 'Cancel' : 'Accept'}
                    </Text>
                </TouchableOpacity>
                    : null
            }


        </View>
    );
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.ID.toString()}
            style={styles.container2}
        />
    );
}

const styles = StyleSheet.create({
    backButton: {
        marginLeft: 10,
        padding: 5,
        color: 'white',
    },
    separator: {
        marginVertical: 10,
        height: 3,
        backgroundColor: '#131c25',
    },
    container: {
        backgroundColor: '#131c25',
        paddingHorizontal: 20,
    },
    container2: {
        flex: 1,
        paddingTop: 5,
        backgroundColor: '#131c25',
    },
    historyBox: {
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: '#2b3849',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    innerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    imageContainer: {
        marginRight: 10,
    },
    largerImage: {
        width: 50,
        height: 50,
        borderRadius: 20,
    },
    defaultImage: {
        width: 50,
        height: 50,
        borderRadius: 20,
    },
    textContainer: {
        flex: 1,
    },
    text: {
        color: '#e2e8f0',
        fontFamily: 'Roboto', // Replace with your desired font family
        lineHeight: 24,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 6,
    },
    contentText: {
        fontSize: 16,
        color: '#8491a1',
    },
    verticalLine: {
        height: '100%',
        width: 1,
        backgroundColor: 'white',
        marginHorizontal: 12,
        opacity: 0.5,
    },
    acceptButton: {
        backgroundColor: '#4CAF50', // Green color
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 20,
    },
    acceptButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#E74C3C', // Green color
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 20,
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        marginTop: 40,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#2b3849',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e2e8f0',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
});