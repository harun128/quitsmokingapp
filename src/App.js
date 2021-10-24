import  React from 'react';

import {NativeModules, Platform, StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import HomeScreen from "./screens/Home/Home";
import SettingsScreen from "./screens/Settings/Settings";
import SetSettingsScreen from "./screens/Settings/SetSettings/SetSettings"
import NotificationSettings from "./screens/Settings/Notifications/NotificationSettings";
import CurrencyScreen from "./screens/Settings/Currency/CurrencyScreen";
import HealthScreen from "./screens/Health/HealthScreen";
import HealthConditionScreen from "./screens/Health/HealthConditionScreen"
import AchievementsScreen from "./screens/Achievements/AchievementsScreen";
import CommunityScreen from "./screens/Community/CommunityScreen";
import Register from "./screens/Community/Register";
import EditProfile from "./screens/Community/EditProfile"
import UserProfile from "./screens/Community/UserProfile";

const HomeStack = createStackNavigator();

import { CardStyleInterpolators } from '@react-navigation/stack';
import {Provider} from 'react-redux';


import store from "./state/store";

import Countries from "./screens/Community/Countries";


const config = {
    animation: 'spring',
    config: {
        stiffness: 10000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
};



const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />
            <HomeStack.Screen
                name="Settings"
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
                component={SettingsScreen}/>
            <HomeStack.Screen
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
                name="SetSettings"
                component={SetSettingsScreen}/>
            <HomeStack.Screen
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                }}
                name="NotificationSettings"
                component={NotificationSettings}/>
            <HomeStack.Screen
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
                name="HealthScreen"
                component={HealthScreen}/>
            <HomeStack.Screen
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
                name="HealthConditionScreen"
                component={HealthConditionScreen}/>
            <HomeStack.Screen
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
                name="AchievementsScreen"
                component={AchievementsScreen}/>
            <HomeStack.Screen
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
                name="CommunityScreen"
                component={CommunityScreen}/>
            <HomeStack.Screen
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                }}
                name="EditProfile"
                component={EditProfile}/>
            <HomeStack.Screen
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                }}
                name="Countries"
                component={Countries}/>
            <HomeStack.Screen
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                }}
                name="UserProfile"
                component={UserProfile}/>
            <HomeStack.Screen
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                }}
                name="CurrencyScreen"
                component={CurrencyScreen}/>
            <HomeStack.Screen
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                }}
                name="Register"
                component={Register}/>
        </HomeStack.Navigator>
    );
};


const AppNavigationContainer = () => {
    return (
        <NavigationContainer>
            <HomeStackScreen/>
        </NavigationContainer>
    );
};

class App extends React.Component{

    componentDidMount(): void {
    }
    render() {
        return (
            <Provider store={store}>
                <AppNavigationContainer/>
            </Provider>
        );
    }
};

const styles = StyleSheet.create({
    centered : {
        flex : 1,
        backgroundColor : "#fff",
        alignItems:"center",
        justifyContent : "center"
    }
})

export default  App;
