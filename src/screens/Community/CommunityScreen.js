import React from 'react'
import Box from "../../components/UI/Box";

import {StatusBar} from "react-native";
import {TouchableOpacity,Image} from "react-native";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Messages from "./Messages";
import MyProfile from "./MyProfile";
import Login from "./Login";

import CommunityMessagesScreen from "./CommunityMessagesScreen";
const Tab = createMaterialTopTabNavigator();
import {connect} from "react-redux";
import {global} from "../../config/global";
import I18n from "./../../lang/_18n"

const CommunityScreen =(props)  =>{
    const {navigation,country} = props
    React.useEffect(() =>{
        navigation.setOptions({
                headerTitle:I18n.t("community.title"),
                headerStyle : {
                    backgroundColor: '#FAB045',
                    elevation: 0,       //remove shadow on Android
                    shadowOpacity: 0,
                    height:45,
                },
                headerTitleStyle: {
                    fontWeight: 'normal',
                    fontSize:17,
                    alignSelf:'center'
                },
                headerTintColor: '#fff',
                headerRight :() => (
                    <TouchableOpacity onPress={() => navigation.navigate("Countries")}>
                        <Box mr={2}>
                            <Image style={{borderRadius:999,width:25,height:25}} source={{uri:global.url+"images/flags/"+country.img}}/>
                        </Box>
                    </TouchableOpacity>
                )
            }
        );
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor("#FAB045");
    })

    return (
        <Tab.Navigator
            initialRouteName="Feed"
            tabBarOptions={{
                activeTintColor: '#FAB045',
                inactiveTintColor: '#7f8c8d',
                style: {
                    backgroundColor: '#ecf0f1',
                    borderBottomColor: 'red',
                },
                labelStyle: {
                    textAlign: 'center',
                    fontWeight: 'bold'
                },
                indicatorStyle: {
                    borderBottomColor: '#FAB045',
                    borderBottomWidth: 2,
                },
            }}>
            <Tab.Screen
                name="Topluluk"
                component={CommunityMessagesScreen}
                options={{
                    tabBarLabel: I18n.t("community.grup_chat"),
                    // tabBarIcon: ({ color, size }) => (
                    //   <MaterialCommunityIcons name="home" color={color} size={size} />
                    // ),
                }}  />
            <Tab.Screen
                name="Messages"
                component={Messages}
                options={{
                    tabBarLabel: I18n.t("community.messages"),
                    // tabBarIcon: ({ color, size }) => (
                    //   <MaterialCommunityIcons name="settings" color={color} size={size} />
                    // ),
                }} />
            <Tab.Screen
                name="Profilim"
                component={props.token ? MyProfile:Login}
                options={{
                    tabBarLabel:  props.token ? I18n.t("community.my_profile") : I18n.t("community.sign_in")
                    // tabBarIcon: ({ color, size }) => (
                    //   <MaterialCommunityIcons name="settings" color={color} size={size} />
                    // ),
                }} />
        </Tab.Navigator>
    );
}

const mapStateToProps =(state) => {
    const {us} = state;
    return {
        token:us.token,
        email:us.email,
        image:us.image,
        country :us.country
    }
}


export default connect(mapStateToProps)(CommunityScreen);


