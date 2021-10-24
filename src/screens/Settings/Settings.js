import React from'react'
import {
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    AsyncStorage, StatusBar
} from 'react-native';

import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";

import ConfirmDialog from "react-native-simple-dialogs/src/ConfirmDialog";
import * as UserInformationAction from './../../state/actions/UserInformation'

import HealthNotifications from "../../utils/HealthNotifications";
import AchievementsList from "../../config/AchievementsList";

import {setToken,setEmail,setProfileDescription,setUserId,setUserName,setLocation,setImage} from "../../state/actions/UserSession";
import I18n from './../../lang/_18n';
import {connect} from 'react-redux';
const Settings = (props) => {
    const {navigation,route} = props;

    const [confirm,setAlert] = React.useState(false);
    const [dialogVisible,setDialogVisible] = React.useState(false);

    const [confirmLogout,setLogoutAlert] = React.useState(false);
    const [logoutVisible,setLogoutDialogVisible] = React.useState(false);
       navigation.setOptions({
           title:I18n.t("settings.titles.settings"),
           headerStyle : {
               elevation: 0,       //remove shadow on Android
               shadowOpacity: 0,
               height:45,
           },
           headerTitleStyle: {
               fontWeight: 'normal',
               fontSize:17,
           },
       });
    const showAlert = () => {
        setAlert(true);

    };

    const hideAlert = () => {

    };
    React.useEffect(() => {

        navigation.addListener("focus",()=>{
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('#ccc');
        });
    });

    async function againStart(){
        setAlert(false);
        await AsyncStorage.setItem("date", (new Date(Date.now()).toString()));
        UserInformationAction.setDate((new Date(Date.now()).toString()));
        AsyncStorage.multiGet(["healthNotification","achievementsNotification"]).then((result) => {
            let notificationHealth = JSON.parse(result[0][1]);
            let notificationAchievement = JSON.parse(result[1][1]);
            console.warn(notificationHealth+"-"+notificationAchievement);
            if(notificationHealth === true) {
                let hn = new HealthNotifications((new Date(Date.now()).toString()));
                hn.setScheduled();
            }
            if(notificationAchievement === true) {
                let an = new AchievementsList((new Date(Date.now()).toString()),props.smokingCountPerDay,props.countCigaretteInPocket,props.price,props.currency);
                an.setScheduled();
            }
        });
    }


    return (
        <SafeAreaView>
            <Box>
                <Text py={20} ml={2} color={'#2D3E50'}>{I18n.t("settings.titles.application_settings")}</Text>
                <Box bg={'white'}>
                    <TouchableOpacity  style={styles.item}  onPress={() => navigation.navigate("SetSettings")}>
                        <Text ml={3}>{I18n.t("settings.titles.informations")}</Text>
                    </TouchableOpacity>
                    <Box mx={3} bg={'#ddd'} height={1} ></Box>

                    <TouchableOpacity style={styles.item} onPress={() => showAlert("dede")}>
                        <Text ml={3} >{I18n.t("settings.titles.start_over")}</Text>
                        <ConfirmDialog
                            title={I18n.t("settings.will_reset")}
                            message={I18n.t("settings.are_you_sure")}
                            visible={confirm}
                            onTouchOutside={() => setDialogVisible(false)}
                            positiveButton={{
                                title: I18n.t("yes"),
                                onPress: () => {
                                     againStart().then(r => {
                                         alert(I18n.t("settings.reset_success"));
                                     });


                                }

                            }}
                            negativeButton={{
                                title: I18n.t("no"),
                                onPress: () => {
                                    setAlert(false);
                                }
                            }}
                        />
                    </TouchableOpacity>
                </Box>

                <Text py={20} ml={2} color={'#2D3E50'}>{I18n.t("settings.titles.preferences_permissions")}</Text>
                <Box bg={'white'}>
                    <TouchableOpacity  style={styles.item} onPress={() => navigation.navigate("NotificationSettings")} >
                        <Text ml={3}>{I18n.t("settings.titles.notifications")}</Text>
                    </TouchableOpacity>
                    <Box mx={3} bg={'#ddd'} height={1} ></Box>
                    <TouchableOpacity onPress={() => navigation.navigate("CurrencyScreen")} style={styles.item}>
                        <Text ml={3}>{I18n.t("settings.titles.currency")}</Text>
                    </TouchableOpacity>
                </Box>

                <Text py={20} ml={2} color={'#2D3E50'}>{I18n.t("settings.titles.community")}</Text>
                <Box bg={'white'}>
                    {props.token !== null &&
                    <TouchableOpacity onPress={() => setLogoutAlert(true)}  style={styles.item} >
                        <Text ml={3}>{I18n.t("settings.titles.logout")}</Text>
                        <ConfirmDialog
                            title={I18n.t("settings.will_logout")}
                            message={I18n.t("settings.are_you_sure")}
                            visible={confirmLogout}
                            onTouchOutside={() => setLogoutDialogVisible(false)}
                            positiveButton={{
                                title: I18n.t("yes"),
                                onPress: () => {
                                    setLogoutAlert(false);
                                    setToken(null);
                                    setEmail("");
                                    setImage("default.png");
                                    setUserName("");
                                    setUserId("");
                                    setProfileDescription("")
                                    setLocation("");
                                    alert(I18n.t("settings.logout_success"));
                                }

                            }}
                            negativeButton={{
                                title: I18n.t("no"),
                                onPress: () => {
                                    setLogoutAlert(false);
                                }
                            }}
                        />
                    </TouchableOpacity>
                    }
                    {(props.token === null || props.token === "null") &&
                    <TouchableOpacity onPress={() => {navigation.navigate("CommunityScreen")}}  style={styles.item}>
                        <Text ml={3}>{I18n.t("settings.titles.login")}</Text>
                    </TouchableOpacity>
                    }
                </Box>
            </Box>
        </SafeAreaView>
    );
};

const styles= StyleSheet.create({
    item : {
        paddingVertical:10
    },
    bottomLine : {
        borderBottomWidth:1,
        marginLeft:3,
        backgroundColor:'#ddd'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    button: {
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#AEDEF4",
    },
    text: {
        color: '#fff',
        fontSize: 15
    }
})

const mapStateToProps = (state) => {
    const {ui,us} = state;
    return {
        date: ui.date,
        wasteTime: ui.wasteTime,
        smokingCountPerDay: ui.smokingCountPerDay,
        countCigaretteInPocket: ui.countCigaretteInPocket,
        price: ui.price,
        token: us.token,
        currency : ui.currency,
    }
}

export default connect(mapStateToProps)(Settings);
