import React from 'react'
import Box from "../UI/Box";
import Text from "../UI/Text";

import {Pulse} from "../../assets/icons";
import CircleProgress from "../progress/CircleProgress";
import {colors} from "../../config/colors";
import {TouchableOpacity,AsyncStorage} from "react-native";
import {HealthConditions} from "../../config/HealthConditions";
import PropTypes from 'prop-types'

class MainPageHealthStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            condition : '',
            percentage:0,
        }
    }

    componentDidMount(): void {
        this.props.navigation.addListener("focus" ,() =>{
            AsyncStorage.getItem("date").then((quitDate) =>{
                let date = new Date(quitDate).getTime();
                let now = (new Date(Date.now())).getTime();
                HealthConditions.some((value,index) => {
                    let diff = now - (date +value.time);
                    if(diff < 0) {
                        let percentage = 100 - ((100* Math.abs(diff))/value.time);
                        this.state.percentage = percentage;
                        this.state.condition = value;
                        this.setState({
                            percentage:percentage,
                            condition:value
                        });
                        return true;
                    }else {

                    }
                });
                if(this.state.condition === '') {

                    this.setState({condition:HealthConditions[15],percentage:100});
                }
            })
        });
    }

    componentWillUnmount(): void {

    }

    render() {
        return (
            <TouchableOpacity activeOpacity={.75} onPress={this.props.onPress} >
                <Box mt={3}  borderBottomLeftRadius={5} borderBottomRightRadius={5}>
                    <Box borderTopLeftRadius={7} borderTopRightRadius={7} height={35} flexDirection={'row'} bg={'#E84C3D'}  alignItems={'center'}>
                        <Pulse width={25} style={{marginLeft:10}} color='white'/>
                        <Text  ml={10} textAlign={'center'} color={"white"} fontWeight={'normal'} >{this.props.title}</Text>
                    </Box>
                </Box>
                <Box flexDirection={'row'} py={10} bg={'white'}  alignItems={'center'} borderBottomLeftRadius={5} borderBottomRightRadius={5}>
                    <CircleProgress  style={{marginVertical:5, marginHorizontal:5}}  percentage={this.state?.percentage} />
                    <Text flex={1} ml={2} color={colors.text_color}>{this.state?.condition?.condition}</Text>
                </Box>
            </TouchableOpacity>
        )
    }
}

MainPageHealthStatus.propTypes = {
    navigation:PropTypes.any,
    title: PropTypes.string
}

export default (MainPageHealthStatus);

