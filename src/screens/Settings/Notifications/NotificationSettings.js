import React from 'react';
import Box from "../../../components/UI/Box";
import {Switch} from "react-native-gesture-handler";
import Text from "../../../components/UI/Text";
import {TouchableOpacity,SafeAreaView} from "react-native";
import {TouchableEffect} from "react-native-simple-dialogs";
import {connect} from 'react-redux';
import AchievementsList from "../../../config/AchievementsList";
import HealthNotifications from "../../../utils/HealthNotifications";
import {setAchievementsNotification,setHealthNotification} from "../../../state/actions/UserInformation";

import I18n from "./../../../lang/_18n"

class NotificationSettings extends React.Component{

    constructor(props) {
        super(props);
        const {healthNotification,achievementsNotification} = this.props;
        this.state= {
            health:'',
            achievements:''
        }
    }

    componentDidMount(): void {
        this.props.navigation.setOptions({
            title : I18n.t("settings.titles.notification_settings")
        });
        const {healthNotification,achievementsNotification} = this.props;

        this.setState({health:JSON.parse(healthNotification),achievements:JSON.parse(achievementsNotification)});

        // AsyncStorage.multiGet(["healthNotification","achievementsNotification"]).then((result) => {
        //     let healthNotification = JSON.parse(result[0][1]);
        //     let achievementsNotification = JSON.parse(result[1][1]);
        //
        //     if(healthNotification == null || achievementsNotification == null) {
        //         AsyncStorage.setItem("healthNotification",JSON.stringify(true));
        //         AsyncStorage.setItem("achievementsNotification",JSON.stringify(true));
        //         this.setState({health:(true),achievements:(true)});
        //     } else {
        //         this.setState({health:healthNotification,achievements:achievementsNotification});
        //     }
        // });
    }
    setAchievementsState(value) {

        let an = new AchievementsList(this.props.date,this.props.smokingCountPerDay,this.props.countCigaretteInPocket,this.props.price);
        if(value === true) {
            an.setScheduled();
        } else {
            an.removeNotification();
        }
        setAchievementsNotification(JSON.stringify(value));
        this.setState({achievements:value});
    }

    setHealthState(value) {
        let hn = new HealthNotifications(this.props.date);
        if(value === true) {
            hn.setScheduled();
        } else {
            hn.cancelHealthNotification();
        }
        setHealthNotification(JSON.stringify(value));
        this.setState({health:value});
    }

    render() {
        return (
            <SafeAreaView>
                <Box>
                    <TouchableOpacity activeOpacity={0.7}>
                        <Box flexDirection={'row'} alignItems={'center'} my={3} mx={2}  py={3} px={3} justifyContent ={'center'} borderBottomWidth={1} borderColor={'#ddd'} bg={"white"} borderRadius={5}>
                            <Text flex={1}>{I18n.t("settings.health_notification")}</Text>
                            <TouchableEffect>
                                <Switch
                                    onValueChange={(value) => this.setHealthState(value)}
                                    value = {this.state.health}/>
                            </TouchableEffect>
                        </Box>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7}>
                        <Box flexDirection={'row'} alignItems={'center'}  mx={2}  py={3} px={3} justifyContent ={'center'} borderBottomWidth={1} borderColor={'#ddd'} bg={"white"} borderRadius={5}>
                            <Text flex={1}>{I18n.t("settings.achievements_notification")}</Text>
                            <TouchableEffect>
                                <Switch
                                    onValueChange={(value) => this.setAchievementsState(value)}
                                    value = {this.state.achievements}/>
                            </TouchableEffect>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const {ui} = state;
    return {
        date: ui.date,
        wasteTime: ui.wasteTime,
        smokingCountPerDay: ui.smokingCountPerDay,
        countCigaretteInPocket: ui.countCigaretteInPocket,
        price: ui.price,
        achievementsNotification:ui.achievementsNotification,
        healthNotification:ui.healthNotification
    }
}

export default  connect(mapStateToProps)(NotificationSettings)
