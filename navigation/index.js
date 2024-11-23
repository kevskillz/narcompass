// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import history from "../screens/overdose";
import active from "../screens/Active";
import LinkingConfiguration from "./LinkingConfiguration";

import { Amplify } from "@aws-amplify/core";
import amplifyConfig from '../src/amplifyconfiguration.json'



Amplify.configure(amplifyConfig);

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
        <Stack.Screen name="ActiveDetails"
                      component={active}
                      options={{
                        title: 'Active Screen',
                        headerStyle: {
                          backgroundColor: '#131c25',
                        },
                        headerTitleStyle: {
                          color: '#FFFFFF',
                        },
                        headerTintColor: '#FFFFFF',
                      }}
        />
        <Stack.Screen name="History" component={history} />

    </Stack.Navigator>
  );
}

