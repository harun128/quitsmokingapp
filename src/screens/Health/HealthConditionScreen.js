import React from 'react';
import {TouchableOpacity,StatusBar} from 'react-native';
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";
import {HealthConditions} from "../../config/HealthConditions";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import {Clock} from "../../assets/icons";
import {connect} from "react-redux";
import DateDifferences from "../../utils/DateDifferences";
import I18n from "./../../lang/_18n";

class HealthConditionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigation.setOptions({
                headerTitle:"",
                headerStyle : {
                    backgroundColor: '#E84C3D',
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
                    <Box></Box>
                )
            }
        );

        this.state = {
            id: this.props.route.params.id,
            condition : {},
            percentage:0,
            tickTockSecond:0,
            elapsedDays:0,
            elapsedHours:0,
            elapsedMinutes:0,
            elapsedSeconds:0,
        }
        StatusBar.setBarStyle("light-content");
        StatusBar.setBackgroundColor("#E84C3D");
    }

    componentDidMount(): void {
        HealthConditions.forEach((value) => {
           if(value.id == this.state.id){
               this.setState({condition:value});
                this.state.condition=value;
               return;
           }
        });

        let quitDate = new Date(this.props.date).getTime();
        let time = this.state.condition?.time;
        let now = (new Date(Date.now())).getTime();

        let diff = now - (time+quitDate);

        if(diff < 0) {
            let percentage = 100 - ((100* Math.abs(diff))/time);
            this.setState({percentage:percentage});

        }else {
            this.state.percentage=100;
        }
        this.timer = setInterval(() => this.ticktock(),1000);
    }

    ticktock = () => {

        if(this.state.percentage<100) {
            let diff = ((new Date(Date.now())).getTime() - ((new Date(this.props.date)).getTime()+ this.state.condition.time))
            if(diff < 0) {
                let different = Math.abs(diff) -1000;

                let df = new DateDifferences(different);
                this.setState({
                    elapsedDays: df.elapsedDays < 0 ? 0 : df.elapsedDays,
                    elapsedHours: df.elapsedHours < 0 ? 0 : df.elapsedHours,
                    elapsedMinutes: df.elapsedMinutes < 0 ? 0: df.elapsedMinutes,
                    elapsedSeconds: df.elapsedSeconds < 0 ? 0 : df.elapsedSeconds,
                });
            }
        } else{
            clearInterval(this.timer);
        }
    }
    componentWillUnmount(): void {
        clearInterval(this.timer);
    }

    render(){
        return (
                <Box flex={1} alignItems='center' flexDirection={'row'} justifyContent={'center'} bg={'#E84C3D'}>
                    <Box flexDirection={"column"} alignItems={'center'}>
                        <AnimatedCircularProgress
                            ref={(ref) => this.circularProgress = ref}
                            size={150}
                            width={8}
                            fill={this.state?.percentage}
                            tintColor="white"
                            backgroundColor="#353D29"
                        >
                            {(fill) => (
                                <Text fontSize={2} color={'white'}  >
                                    { (100 * fill / 100).toFixed(1) }%
                                </Text>
                            )}
                        </AnimatedCircularProgress>

                        <Text color={'white'} mt={4} fontSize={15} textAlign={'center'} width={'100%'}>
                            {this.state.condition.condition}
                        </Text>

                        <TouchableOpacity activeOpacity={.75} style={{minWidth:'87%', marginTop:30}}>
                            <Box mt={20} borderBottomLeftRadius={5} borderBottomRightRadius={5}>
                                <Box borderTopLeftRadius={7} borderTopRightRadius={7} height={35} flexDirection={'row'} bg={'#34495e'}  alignItems={'center'}>
                                    <Clock width={25} style={{marginLeft:10}} color='white'/>
                                    <Text  ml={10} textAlign={'center'} color={"white"} fontWeight={'normal'} >{I18n.t("health.remaining_time")}</Text>
                                </Box>
                            </Box>
                            <Box flexDirection={'row'} py={1} bg={'white'} justifyContent={'center'}  alignItems={'center'} borderBottomLeftRadius={5} borderBottomRightRadius={5}>
                                <Box flexDirection={'column'} flex={1} alignItems={'center'} borderRightWidth={1} borderColor={'#34495e'} >
                                    <Text>{this.state.elapsedDays}</Text>
                                    <Text mt={1}>{I18n.t("day")}</Text>
                                </Box>
                                <Box flexDirection={'column'}  flex={1} alignItems={'center'} borderRightWidth={1} borderColor={'#34495e'}>
                                    <Text>{this.state.elapsedHours}</Text>
                                    <Text mt={1}>{I18n.t("hour")}</Text>
                                </Box>
                                <Box flexDirection={'column'} flex={1} alignItems={'center'} borderRightWidth={1} borderColor={'#34495e'}>
                                    <Text>{this.state.elapsedMinutes}</Text>
                                    <Text mt={1}>{I18n.t("minute")}</Text>
                                </Box>
                                <Box flexDirection={'column'} flex={1} alignItems={'center'} borderRightWidth={1}  borderColor={'white'}>
                                    <Text>{this.state.elapsedSeconds}</Text>
                                    <Text mt={1}>{I18n.t("second")}</Text>
                                </Box>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                </Box>
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
        price: ui.price
    }
}

export default connect(mapStateToProps)(HealthConditionScreen);



