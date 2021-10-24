import React from 'react'
import {AsyncStorage,Platform,NativeModules} from 'react-native'
import Box from "../UI/Box";
import Text from "../UI/Text";
import { Stats} from "../../assets/icons";
import {colors} from "../../config/colors";
import I18n from './../../lang/_18n';
import {connect} from 'react-redux';

import TimeToMillis from "../../utils/TimeToMillis";
import DateDifferences from "../../utils/DateDifferences";

import moment from 'moment'
import "moment/min/locales";
import PropTypes from "prop-types";
const deviceLanguage =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;


moment.locale(deviceLanguage);



class MainPageStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.navigation  = this.props.navigation;
        this.state = {
            dateFormat : '',
            currentDate : new Date(),
            date: '',
            smokingCountPerDay :0,
            countInCigaretteInPocket:0,
            wasteTime:0,
            price :20,
            elapsedDays:0,
            elapsedHours:0,
            elapsedMinutes:0,
            elapsedSeconds:0,
            different:0,
            notSmokingCount:0,
            elapsedSavingDay:0,
            elapsedSavingHours:0,
            elapsedSavingMinutes:0,
        }
    }

    componentDidMount() {
        const t = this;
        this.navigation.addListener("blur",() =>{
            clearInterval(t.timer);

        });
        this.navigation.addListener("focus",() =>{
            this.timer = setInterval(
                () => this.tick(),
                1000
            );
            AsyncStorage.multiGet(["date","smokingCountPerDay","countCigaretteInPocket","wasteTime","price"]).then((result) => {
                let diff = (new Date()).getTime() - (new Date(result[0][1])).getTime();
                let df = new DateDifferences(diff);

                let notSmokingCount = Math.floor(diff/(TimeToMillis.hoursToMillis(24)/result[1][1]));
                let savingMoney = notSmokingCount*(result[4][1]/result[2][1]);
                let savingTimeMillis = TimeToMillis.minuteToMillis(result[3][1])*notSmokingCount;
                let st = new DateDifferences(savingTimeMillis);

                this.setState({
                    // elapsedDays : df.elapsedDays> 0 ? df.elapsedDays+" Gün," : '',
                    // elapsedHours: df.elapsedHours >0 ? df.elapsedHours + " Saat," : '',
                    // elapsedMinutes:df.elapsedMinutes > 0 ? df.elapsedMinutes + " Dakika," : '',
                    elapsedDays : df.elapsedDays> 0 ? df.elapsedDays+"" : '0',
                    elapsedHours: df.elapsedHours >0 ? df.elapsedHours + "" : '0',
                    elapsedMinutes:df.elapsedMinutes > 0 ? df.elapsedMinutes + "" : '0',
                    elapsedSeconds:df.elapsedSeconds,
                    notSmokingCount:Math.floor(notSmokingCount),
                    savingMoney:savingMoney.toFixed(2),
                    elapsedSavingDay:st.elapsedDays > 0 ? st.elapsedDays+ " "+I18n.t("day")+ ((st.elapsedMinutes>0 || st.elapsedHours>0) && ",") : '',
                    elapsedSavingMinutes: st.elapsedMinutes> 0 ? st.elapsedMinutes+ " "+I18n.t("minute"):'',
                    elapsedSavingHours: st.elapsedHours > 0 ? st.elapsedHours + " "+I18n.t("hour") + ((st.elapsedMinutes>0) ? ",": "") :''
                });

            });

        });



    }

    since = (date) => {
        let format = moment(date).format('MMMM Do YYYY, H:mm')
        return format;
    }

    tick() {

        let diff = (new Date()).getTime() - (new Date(this.props.date)).getTime();
        let df = new DateDifferences(diff);
        let notSmokingCount = Math.floor(diff/(TimeToMillis.hoursToMillis(24)/this.props.smokingCountPerDay));
        let savingMoney = notSmokingCount*(this.props.price/this.props.countCigaretteInPocket);

        let savingTimeMillis = TimeToMillis.minuteToMillis(this.props.wasteTime)*notSmokingCount;
        let st = new DateDifferences(savingTimeMillis);

        this.setState({
            // elapsedDays : df.elapsedDays> 0 ? df.elapsedDays+" Gün," : '',
            // elapsedHours: df.elapsedHours >0 ? df.elapsedHours + " Saat," : '',
            // elapsedMinutes:df.elapsedMinutes > 0 ? df.elapsedMinutes + " Dakika," : '',
            elapsedDays : df.elapsedDays> 0 ? df.elapsedDays+"" : '0',
            elapsedHours: df.elapsedHours >0 ? df.elapsedHours + "" : '0',
            elapsedMinutes:df.elapsedMinutes > 0 ? df.elapsedMinutes + "" : '0',
            elapsedSeconds:df.elapsedSeconds,
            notSmokingCount:Math.floor(notSmokingCount),
            savingMoney:savingMoney.toFixed(2),
            elapsedSavingDay:st.elapsedDays > 0 ? st.elapsedDays+ " "+I18n.t("day")+ ((st.elapsedMinutes>0 || st.elapsedHours>0) && ",") : '',
            elapsedSavingMinutes: (st.elapsedMinutes === 0) ? '': (st.elapsedMinutes+ " "+I18n.t("minute")),
            elapsedSavingHours: st.elapsedHours > 0 ? st.elapsedHours + " "+I18n.t("hour") + ((st.elapsedMinutes>0) ? ",": "") :''
        });




    }
    componentWillUnMount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <Box >
                <Box borderTopLeftRadius={7} borderTopRightRadius={7} height={35} flexDirection={'row'} bg={'#43B39D'} alignItems={'center'}>
                    <Stats width={25} style={{marginLeft:10}} color='white'/>
                    <Text  textAlign={'center'} color={"white"} fontWeight={'normal'} >  {this.props.date && I18n.t("mainpage.since",{"date":this.since(this.props.date)})}</Text>
                </Box>
                <Box  borderBottomLeftRadius={5} borderBottomRightRadius={5} bg={"white"} >
                    {/*<Box  flexDirection='row' py={3} mx={2} borderBottomWidth={1}  borderBottomMargin={3} borderColor={'#ddd'}>*/}
                    {/*    <Text fontWeight={'bold'} color={colors.text_color}>Sigarasız geçirilen zaman</Text>*/}
                    {/*    <Text textAlign={'right'} flex={1} color={'#43B39D'}>{this.state.elapsedDays} {this.state.elapsedHours} {this.state.elapsedMinutes}  {this.state.elapsedSeconds} Saniye</Text>*/}
                    {/*</Box>*/}
                    <Box  flexDirection='row' py={3} mx={2} borderBottomWidth={1}  borderColor={'#ddd'}>
                        <Text fontWeight={'bold'} color={colors.text_color}>{I18n.t("mainpage.not_smoking")}</Text>
                        <Text textAlign={'right'} flex={1} color={'#43B39D'}>{this.state.notSmokingCount}</Text>
                    </Box>
                    <Box  flexDirection='row' py={3} mx={2} borderBottomWidth={1}  borderColor={'#ddd'}>
                        <Text fontWeight={'bold'} color={colors.text_color}>{I18n.t("mainpage.saved_money")}</Text>
                        <Text textAlign={'right'} flex={1} color={'#43B39D'}>{this.state.savingMoney} {this.props.currency}</Text>
                    </Box>
                    <Box  flexDirection='row' py={3} mx={2}>
                        <Text fontWeight={'bold'} color={colors.text_color}>{I18n.t("mainpage.saved_time")}</Text>
                        <Text textAlign={'right'} flex={1} color={'#43B39D'}>{this.state.elapsedSavingDay} {this.state.elapsedSavingHours} {this.state.elapsedSavingMinutes} </Text>
                    </Box>
                </Box>

                <Box mt={2} bg={"white"} py={2} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
                    <Box flex={1} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                        <Text color={'#43B39D'} py={1} fontWeight={"bold"} fontSize={16}>{this.state.elapsedDays === "" ? "0": this.state.elapsedDays}</Text>
                        <Text color={colors.text_color}  fontSize={13}    mt={1} >{I18n.t("day")}</Text>
                    </Box>
                    <Box flex={1} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                        <Text color={'#43B39D'} py={1} fontWeight={"bold"} fontSize={16}>{this.state.elapsedHours === "" ? 0 : this.state.elapsedHours}</Text>
                        <Text color={colors.text_color}  fontSize={13}   mt={1} >{I18n.t("hour")}</Text>
                    </Box>
                    <Box flex={1} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                        <Text color={'#43B39D'} py={1} fontWeight={"bold"} fontSize={16}>{this.state.elapsedMinutes === "" ? 0 : this.state.elapsedMinutes}</Text>
                        <Text color={colors.text_color}  fontSize={13} mt={1} >{I18n.t("minute")}</Text>
                    </Box>
                    <Box flex={1} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                        <Text color={'#43B39D'} py={1} fontWeight={"bold"} fontSize={16}>{this.state.elapsedSeconds === "" ? 0 : this.state.elapsedSeconds}</Text>
                        <Text color={colors.text_color}  fontSize={13} mt={1} >{I18n.t("second")}</Text>
                    </Box>
                </Box>
            </Box>
        )
    }
}
MainPageStatistics.propTypes = {
    navigation:PropTypes.any,


}
const mapStateToProps = (state) => {
    const {ui} = state;
    return {
        date: ui.date,
        wasteTime: ui.wasteTime,
        smokingCountPerDay: ui.smokingCountPerDay,
        countCigaretteInPocket: ui.countCigaretteInPocket,
        price: ui.price,
        currency:ui.currency
    }
}
export default connect(mapStateToProps)(MainPageStatistics);
