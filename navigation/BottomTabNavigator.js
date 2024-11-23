import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme, Image, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import Map from "../screens/map";
import TabTwoScreen from "../screens/overdose";
import map from "../assets/images/map.png"
import history from "../assets/images/activeOD.png"
import health from "../assets/images/health.png"
import HealthIndicators from "../screens/healthIndicators";
import Settings from "../screens/settings";

const BottomTab = createBottomTabNavigator();

function SettingsIcon({ navigation }) {
    return (
        <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate('settings')} // Replace 'SettingsScreen' with the name of your settings screen
        >
            <Ionicons name="settings" size={24} color="black" />
        </TouchableOpacity>
    );
}

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Map"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
                tabBarLabelStyle: { fontSize: 13, color: Colors[colorScheme].text }, // Update label color
                tabBarStyle: {
                    height: 60,
                    backgroundColor: Colors[colorScheme].background
                }, // Set background color
                fontFamily: 'Montserrat',
            }}
        >
            <BottomTab.Screen
                name="Map"
                component={TabOneNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="Map" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Active"
                component={TabTwoNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="History" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Health"
                component={HealthIndicators}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="Health" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="settings" color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
    const { color, name } = props;
    let iconComponent;
    console.log(props)
    switch (name) {
        case 'Map':
            iconComponent = <Image source={map} style={{ width: 50, height: 50, tintColor: color }} />;
            break;
        case 'History':
            iconComponent = <Image source={history} style={{ width: 50, height: 50, tintColor: color }} />;
            break;
        case 'Health':
            iconComponent = <Image source={health} style={{ width: 50, height: 50, tintColor: color }} />;
            break;
        case 'settings':
            iconComponent = <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;

    }

    return iconComponent;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabOneNavigator({ navigation }) {
    return (
        <TabOneStack.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: '#131c25', // Set your desired header background color
                    height: '0%',
                },
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white', // Set your desired header text color
                    fontFamily: 'Montserrat', // Set your desired font family
                },
                headerTitleAlign: 'center', // Align header title to the center
                headerRight: () => <SettingsIcon navigation={navigation} />,
            })}
        >
            <TabOneStack.Screen
                name="TabOneScreen"
                component={Map}
                options={{ headerTitle: "" }}
            />
        </TabOneStack.Navigator>
    );
}

const TabTwoStack = createStackNavigator();


function TabTwoNavigator({ navigation }) {
    return (
        <TabTwoStack.Navigator screenOptions={({ route }) => ({
            headerStyle: {
                backgroundColor: '#131c25', // Set your desired header background color
                height: '0%',
            },
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white', // Set your desired header text color
            },
            headerTitleAlign: 'center', // Align header title to the center
            headerRight: () => <SettingsIcon navigation={navigation} />,
        })}
        >
            <TabTwoStack.Screen
                name="TabTwoScreen"
                component={TabTwoScreen}
                options={{ headerTitle: "Tab Two Title" }}
            />
        </TabTwoStack.Navigator>
    );
}