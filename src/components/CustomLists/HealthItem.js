import React from 'react';
import {TouchableOpacity} from "react-native-gesture-handler";
import Box from "../UI/Box";
import Text from "../UI/Text";
import CircleProgress from "../progress/CircleProgress";
import {ArrowRightIcon} from "../../assets/icons";

class HealthItem extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            percentage:0
        }
        let date = new Date(this.props.date).getTime();
        let time = this.props.time;
        let now = (new Date(Date.now())).getTime();

        let diff = now - (time+date);

        if(diff < 0) {
            let percentage = 100 - ((100* Math.abs(diff))/time);
            this.state.percentage = percentage;
        }else {
            this.state.percentage=100;
        }
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={this.props.onPress}>
                <Box flexDirection={'row'} alignItems={'center'} borderBottomWidth={1} borderColor={'#ddd'} py={2}>
                    <CircleProgress flex={0} circleHeight={58} style={{ marginLeft:8, marginRight:12}}  percentage={this.state.percentage} />
                    <Box flexDirection={'column'} flex={1}>
                        <Text >{this.props.condition}</Text>
                        <Text color={'#777'} mt={1}>{this.props.needTime}</Text>
                    </Box>
                    <ArrowRightIcon flex={0} style={{marginRight:3}} color={"red"}/>
                </Box>
            </TouchableOpacity>
        )
    }
}

export default HealthItem
