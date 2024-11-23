import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, Image } from 'react-native';

import heartImage from "../assets/images/heart.png";

const HEALTH_INDICATORS = [
    { id: 'O2', label: 'O2 Level (%)', type: 'indicator' },
    { id: 'heart_rate', label: 'Beats Per Min', type: 'indicator' },
    { id: 'bpm', label: 'Breaths Per Min', type: 'indicator' },
    { id: 'age', label: 'Age', type: 'info' },
    { id: 'sex', label: 'Sex', type: 'info' },
    { id: 'height', label: 'Height (cm)', type: 'info' },
    { id: 'weight', label: 'Weight (kg)', type: 'info' },
    { id: 'bmi', label: 'BMI', type: 'info' },
];

export default function HealthIndicators() {
    const initialHealthData = [98, 80, 15, 66, 1, 171, 59.7, 20.4];

    const [healthInfo, setHealthInfo] = useState({
        O2: initialHealthData[0],
        heart_rate: initialHealthData[1],
        bpm: initialHealthData[2],
        age: initialHealthData[3],
        sex: initialHealthData[4] === 1 ? 'Male' : 'Female',
        height: initialHealthData[5],
        weight: initialHealthData[6],
        bmi: initialHealthData[7],
    });

    const [healthStatus, setHealthStatus] = useState('Healthy');

    // Update health information based on user input
    const updateHealthInfo = async (id, newValue) => {

        // Clone healthInfo to avoid mutating the state directly
        let tempInfo = { ...healthInfo };
        tempInfo[id] = id === "sex" ? newValue : parseInt(newValue, 10);

        // Check if the value is NaN and set it to an empty string
        if (id !== "sex" && isNaN(tempInfo[id])) {
            tempInfo[id] = '';
        }

        setHealthInfo(tempInfo);

        // Prepare array for API call
        let healthArr = Object.values(tempInfo);
        healthArr[4] = (healthArr[4] === 'Male') ? 1 : -1;


        try {
            // Call the API to get health status
            const response = await fetch(`https://5h4fv0ryd5.execute-api.us-east-1.amazonaws.com/default/getHealthStatus?inputData=${healthArr.join(',')}`);
            const data = await response.json();


            // Update health status based on API response
            setHealthStatus(data.result === "1" ? "Healthy" : "Overdosing");
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Health Information</Text>
                <View style={styles.horizontalLine} />
            </View>

            <View style={styles.heartSection}>
                <Image source={heartImage} style={styles.centeredHeartImage} />
            </View>

            <View style={styles.infoGrid}>
                {/* Render health indicators */}
                {HEALTH_INDICATORS.map((indicator) => (
                    <View style={styles.infoItem} key={indicator.id}>
                        <Text style={styles.infoLabel}>{indicator.label}</Text>

                        {/* Input field for user to update health information */}
                        <TextInput
                            style={styles.infoValue}
                            value={String(healthInfo[indicator.id])}
                            onChangeText={(text) => updateHealthInfo(indicator.id, text)}
                            keyboardType={indicator.id === 'sex' ? 'default' : 'numeric'}
                        />
                    </View>
                ))}
            </View>

            {/* Display health status */}
            <Text style={styles.healthStatus}>
                Health Status: {' '}
                <Text style={healthStatus === 'Healthy' ? styles.healthyText : styles.unhealthyText}>
                    {healthStatus}
                </Text>
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    infoItem: {
        flexBasis: '48%', // Adjusted to smaller size, you can further reduce it
        backgroundColor: '#34495e',
        padding: 15, // Reduced padding for a smaller box
        borderRadius: 12, // Slightly reduced border radius
        marginBottom: 15, // Reduced margin
        alignItems: 'center',
    },

    infoLabel: {
        fontSize: 18, // Slightly reduced font size
        color: '#ecf0f1',
        fontWeight: 'bold',
    },

    infoValue: {
        fontSize: 20, // Adjusted font size
        fontWeight: 'bold',
        color: '#bdc3c7',
    },

    container: {
        flex: 1,
        backgroundColor: '#192734', // Dark blue background
    },
    headerContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    headerText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff', // Emerald green text
    },
    centeredHeartImage: {
        width: 300,
        height: 300,
        marginTop: -100,
        marginBottom: -70,
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 20,
    },

    healthStatus: {
        fontSize: 24, // Increased font size
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#ecf0f1',
        textAlign: 'center', // Center the text
        marginTop: -20
    },
    healthyText: {
        color: '#2ecc71', // Emerald green text for healthy status
    },
    unhealthyText: {
        color: '#e74c3c', // Alizarin red text for unhealthy status
    },




    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 20,
    },

    gridItem: {
        flexBasis: '30%', // Adjust for 3 columns with some space in between
        backgroundColor: '#222',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },

    scrollViewContainer: {
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
    },
    profile: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    profileText: {
        fontSize: 16,
        marginBottom: 8,
    },
    sectionContainer: {
        marginBottom: 20,
    },

    heartSection: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    heartImage: {
        width: 100,
        height: 100,
    },

    heartRateText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },


    horizontalLine: {
        width: 170,
        height: 1,
        backgroundColor: '#fff', // White line
        marginTop: 10,
    },
    sectionHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 8,
        marginBottom: 8,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    indicatorContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
    },
    indicatorItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    firstItem: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    indicatorLabel: {
        fontSize: 16,
    },
    indicatorValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    button: {
        backgroundColor: '#3498db',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

