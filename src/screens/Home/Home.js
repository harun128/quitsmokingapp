/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    StatusBar,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    AsyncStorage,
    TouchableOpacity, default as Animated

} from 'react-native';

import Box from './../../components/UI/Box'
import {colors} from './../../config/colors'


import {Settings, Share as ShareIcon} from "./../../assets/icons";
import Share from 'react-native-share';
import ViewShot from "react-native-view-shot";



import MainPageHealthStatus from "./../../components/mainpage/MainPageHealthStatus";
import MainPageStatistics from "./../../components/mainpage/MainPageStatistics";
import MainPageLastMessages from "./../../components/mainpage/MainPageLastMessages";
import MainPageMoneyStatistics from "../../components/mainpage/MainPageMoneyStatistics";


import MainPageAchievements from "../../components/mainpage/MainPageAchievements";
import PushNotification from "react-native-push-notification";

import I18n from "./../../lang/_18n"

class Home extends React.Component  {

    constructor() {
        super();
        AsyncStorage.getItem("installed").then((value) => {
            if(value === null ){
                this.props.navigation.navigate("SetSettings");
            }
        });

    }
    componentDidUpdate(prevProps: Props, prevState: State, prevContext: *): * {

    }

    componentDidMount(): void {

        const t = this;

        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
            },
            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                if(notification.group === "health") {
                    t.props.navigation.navigate("HealthConditionScreen",{id:notification.id});
                }else if(notification.group === "achievement") {
                    t.props.navigation.navigate("AchievementsScreen");
                }

                // process the notification

                // (required) Called when a remote is received or opened, or local notification is opened
                //notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });


        this.props.navigation.setOptions({
                headerTitle:I18n.t("mainpage.title"),
                headerStyle : {
                    backgroundColor: '#3598DB',
                    elevation: 0,       //remove shadow on Android
                    shadowOpacity: 0,
                    height:45,
                },
                headerTitleStyle: {
                    fontWeight: 'normal',
                    fontSize:17,
                    flex:1,
                    textAlign:'center',
                    justifyContent:'center',

                },
                headerTintColor: '#fff',
                headerLeft : () => (
                    <TouchableOpacity style={{paddingLeft:10,paddingRight:15}} onPress={() => {this.props.navigation.navigate("Settings")} }>
                        <Settings color='white'/>
                    </TouchableOpacity>
                ),
                headerRight :() => (
                    <TouchableOpacity onPress={() => this.shareWithScreen()} style={{paddingRight:10, paddingLeft:15}}>
                        <ShareIcon  color='white'/>
                    </TouchableOpacity>
                )
            }
        );
        this.props.navigation.addListener("focus",()=>{
            StatusBar.setBarStyle("light-content");
            StatusBar.setBackgroundColor("#3598DB");
        });


    }

    shareWithScreen =() => {
        this.refs.viewShot.capture().then((uri) => {
             let shareOptions = {
                 title : I18n.t("mainpage.title"),
                 message : 'https://play.google.com/store/apps/details?id=com.stop.quitsmoking',
                 url : uri,
                 failOnCancel: false,
            }
            try {
                const ShareResponse = Share.open(shareOptions);

            }catch(error) {

            }
        })
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <Box style={styles.statistics}>
                        <ViewShot style={{backgroundColor: '#F2F2F2'}} ref="viewShot" options={{format:"jpg",quality:1,backgroundColor:"white"}}   >
                            <MainPageStatistics navigation={this.props.navigation}/>
                            <MainPageHealthStatus navigation={this.props.navigation} onPress={() => this.props.navigation.navigate("HealthScreen")}
                                              title={I18n.t("mainpage.your_health")}/>
                        </ViewShot>
                        <MainPageLastMessages  navigation={this.props.navigation}  onPress={() => {
                            this.props.navigation.navigate("CommunityScreen")
                        }} title={I18n.t("mainpage.recent_messages")}/>
                        <MainPageAchievements navigation={this.props.navigation}
                                              onPress={() => this.props.navigation.navigate("AchievementsScreen")}
                                              title={I18n.t("mainpage.achievements")}/>
                        <MainPageMoneyStatistics/>
                    </Box>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    header : {
        alignItems:'center',
        height:50,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor:colors.header,
        paddingHorizontal:10
    },
    headerTitle: {
        flex :1,
        textAlign:'center',
        color:'white',
        fontSize:18,
        justifyContent: 'center'
    },
    statistics : {
        marginHorizontal: 10,
        marginVertical:10,
        flexDirection: 'column',
    },
    statisticsHeader :{
        flexDirection: 'row',
        height:50,
        alignItems: 'center',
    }
});


export default (Home);


