import React from'react'
import {TouchableOpacity, SafeAreaView, StyleSheet, TextInput, AsyncStorage, ScrollView, Platform,NativeModules} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Box from "../../../components/UI/Box";
import Text from "../../../components/UI/Text";

import {CheckIcon, Share} from "../../../assets/icons";
import {colors} from "../../../config/colors";




import {connect} from "react-redux";
import *as UIAction from "../../../state/actions/UserInformation";
import HealthNotifications from "../../../utils/HealthNotifications";
import AchievementsList from "../../../config/AchievementsList";
import I18n from "./../../../lang/_18n"

import moment from 'moment'
import "moment/min/locales";
const deviceLanguage =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;


moment.locale(deviceLanguage);



const SetSettings =  (props) => {
    const {navigation, route} = props;

    navigation.setOptions({
        title: I18n.t("settings.titles.informations"),
        headerStyle: {
            elevation: 0,       //remove shadow on Android
            shadowOpacity: 0,
            height: 45,
        },
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 17,
        },
        headerRight: () => (
            <TouchableOpacity style={{paddingRight: 10,paddingLeft:25, paddingVertical: 20}} onPress={() => save()}>
                <CheckIcon color={colors.birlesikKelimeMedium} style={{paddingLeft: 15}}/>
            </TouchableOpacity>
        )
    });

    const save = async () => {
        try{
            const value = {
                'date': date,
                'smokingCountPerDay': smokingCountPerDay,
                'countCigaretteInPocket': countCigaretteInPocket,
                'wasteTime': wasteTime,
                'price': price
            }
            if(smokingCountPerDay > 0 && countCigaretteInPocket >= 0 && wasteTime >0 && price >0 && date){
                await AsyncStorage.multiSet([
                        ['date',value.date.toString()],
                        ['smokingCountPerDay',value.smokingCountPerDay.toString()],
                        ['countCigaretteInPocket',value.countCigaretteInPocket.toString()],
                        ['wasteTime',value.wasteTime.toString()],
                        ['price',value.price.toString()]
                    ],
                    ()=>{}
                )

                UIAction.setDate(date);
                UIAction.setSmokingCountPerDay(smokingCountPerDay);
                UIAction.setCountCigaretteInPocket(countCigaretteInPocket);
                UIAction.setWasteTime(wasteTime);
                UIAction.setPrice(price);
                if(JSON.parse(props.healthNotification) === (true)) {
                    const hn = new HealthNotifications(date);
                    hn.setScheduled();
                }
                if(JSON.parse(props.achievementsNotification) === true) {
                    const an = new AchievementsList(date,smokingCountPerDay,countCigaretteInPocket,price,props.currency);
                    an.setScheduled()
                }
                //navigation.navigate('Settings');
                navigation.goBack();
            } else {
                alert("Lütfen boş alan bırakmayınız.");
            }
        } catch(e) {

        }
    }

    const [date, setDate] = React.useState(new Date(props.date));
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    const [smokingCountPerDay, setSmokingCountPerDay] = React.useState(props.smokingCountPerDay);
    const [countCigaretteInPocket, setCountCigaretteInPocket] = React.useState(props.countCigaretteInPocket);
    const [wasteTime, setWasteTime] = React.useState(props.wasteTime);
    const [price, setPrice] = React.useState(props.price);

    React.useEffect(() => {
        AsyncStorage.setItem("installed",JSON.stringify(true));
    });

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        setShow(Platform.OS === 'ios');
        if (selectedDate > (new Date().getTime())) {
            alert("Sonraki bir tarihi seçemezsiniz")
        } else {
            setDate(currentDate);
        }
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const state = {
        a: 20, b: 20, c: 20, d: 20
    }

    const setNumber = (text) => {
        text = text.replace('.', '');
        text = text.replace(',', '');
        text = text.replace('-', '');
        text = text.replace(' ', '');
        return text;
    }

    const setDecimal = (text) => {

        text = text.replace(",",".");
        text = text.replace('-', '');
        text = text.replace(' ', '');
        return text;
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <Box bg={'white'} mt={15} pt={15}>
                    <Text textAlign={'center'} pb={2} borderBottomWidth={1} borderColor={'#ddd'} color={colors.text_color}>{I18n.t("settings.smoke_count_daily")}</Text>
                    <Box borderWidth={smokingCountPerDay <=0 ? 1 : 0} borderColor={smokingCountPerDay <=0 ? "red" : ""} justifyContent={'center'} alignItems={'center'}>
                        <TextInput

                            onChangeText={(text) => setSmokingCountPerDay(setNumber(text))}
                            defaultValue={props.smokingCountPerDay.toString()} placeholder={'0'}
                            keyboardType={'numeric'}/>
                    </Box>
                </Box>
                <Box bg={'white'} mt={15} pt={15} justifyContent={'center'}>
                    <Text textAlign={'center'} pb={2} borderBottomWidth={1} borderColor={'#ddd'} color={colors.text_color}>{I18n.t("settings.cigarette_count_in_pocket")}</Text>
                    <Box borderWidth={countCigaretteInPocket <=0 ? 1 : 0} borderColor={countCigaretteInPocket <=0 ? "red" : ""} justifyContent={'center'} alignItems={'center'}>
                        <TextInput onChangeText={(text) => setCountCigaretteInPocket(setNumber(text))}
                                   defaultValue={props.countCigaretteInPocket.toString()} as={Text} placeholder={'0'}
                                   keyboardType={'numeric'}/>
                    </Box>
                </Box>
                <Box bg={'white'} mt={15} pt={15} justifyContent={'center'}>
                    <Text textAlign={'center'} pb={2} borderBottomWidth={1} borderColor={'#ddd'} color={colors.text_color}>{I18n.t("settings.duration_smoking")}</Text>
                    <Box borderWidth={wasteTime <=0 ? 1 : 0} borderColor={wasteTime <=0 ? "red" : ""} justifyContent={'center'} alignItems={'center'}>
                        <TextInput onChangeText={(text) => setWasteTime(setNumber(text))} defaultValue={props.wasteTime.toString()} as={Text}
                                   placeholder={'0'} keyboardType={'numeric'}/>
                    </Box>
                </Box>
                <Box bg={'white'} mt={15} pt={15} justifyContent={'center'}>
                    <Text textAlign={'center'} pb={2} borderBottomWidth={1} borderColor={'#ddd'} color={colors.text_color}>{I18n.t("settings.cost_cigarette")}</Text>
                    <Box borderWidth={price <=0 ? 1 : 0} borderColor={price <=0 ? "red" : ""}  justifyContent={'center'} alignItems={'center'}>
                        <TextInput onChangeText={(text) => setPrice(setDecimal(text))} value={price} defaultValue={props.price.toString()} as={Text}
                                   placeholder={'0'} keyboardType={'numeric'}/>
                    </Box>
                </Box>
                <Box bg={'white'} mt={15} pt={15} justifyContent={'center'}>
                    <Text textAlign={'center'} pb={2} borderBottomWidth={1} borderColor={'#ddd'} color={colors.text_color}>{I18n.t("settings.quit_date")}</Text>
                    <Box justifyContent={'center'} alignItems={'center'}>
                        <Box flexDirection={'row'}>
                            <Box flex={1} alignItems={'center'} py={15}>
                                <TouchableOpacity>
                                    <Text fontWeight={'bold'} color={'#3598DB'} onPress={showDatepicker}>{date &&
                                    (
                                        <Text>{
                                            moment(date).format('MMMM Do YYYY')
                                        }</Text>
                                    )}
                                    </Text>
                                </TouchableOpacity>
                            </Box>
                            <Box flex={1} alignItems={'center'} py={15}>

                                <Text fontWeight={'bold'} color={'#3598DB'} onPress={showTimepicker}>
                                    {moment(date).format('HH:mm')}
                                </Text>

                            </Box>
                            {show && (
                                <DateTimePicker

                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={0}
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles= StyleSheet.create({
    item : {
        paddingVertical:10
    },
    bottomLine : {
        height:1,
        marginLeft:3,
        backgroundColor:'#ddd'
    }
})

const mapStateToProps = (state) => {
    const {ui} = state;
    return {
        date: ui.date,
        wasteTime: ui.wasteTime,
        smokingCountPerDay: ui.smokingCountPerDay,
        countCigaretteInPocket: ui.countCigaretteInPocket,
        price: ui.price,
        currency:ui.currency,
        healthNotification: ui.healthNotification,
        achievementsNotification: ui.achievementsNotification
    }
}


export default connect(mapStateToProps)(SetSettings);
