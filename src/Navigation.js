import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from "./screens/Home/Home";
import Settings from "./screens/Settings/Settings";
import NotificationSettings from "./screens/Settings/Notifications/NotificationSettings";


const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName="Anasayfa">
            <HomeStack.Screen
                name="Home"
                component={Home}
                options={{tabBarLabel: 'Home!'}}
            />
            <HomeStack.Screen name="Settings" component={Settings} />
            <HomeStack.Screen name="NotificationSettings" component={NotificationSettings} />
        </HomeStack.Navigator>
    );
};

const AppNavigationContainer = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Settings">
                <Drawer.Screen name="Home" component={HomeStackScreen} />
                <Drawer.Screen name="Settings" component={Settings} />
                <Drawer.Screen name="NotificationSettings" component={NotificationSettings} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigationContainer
