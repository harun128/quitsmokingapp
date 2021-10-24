import React from 'react';
import {TouchableOpacity,Image} from "react-native";
import Box from "../UI/Box";
import Text from "../UI/Text";
class AchievementItem extends React.Component{
    constructor(props) {
        super(props);

        let diff = this.props.now - this.props.time;

        this.state = {
            completed :  (diff > 0)
        }
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={this.props.onPress}>
                <Box flexDirection={'row'} alignItems={'center'} height={90} borderBottomWidth={1} borderColor={'#ddd'} pl={2}>
                    <Image

                        resizeMode={"contain"}
                        style={{width:45,  marginLeft:10, marginVertical:10,opacity:this.state.completed ? 1 : 0.2}}
                        source={this.props.image}
                    />
                    <Box flexDirection={"column"} >
                        <Text color={"#27ae60"} fontWeight={"bold"} ml={3}>{this.props.title}</Text>
                        <Text color={'#aaa'} ml={3} mt={2} mr={4}>{this.props.achievement}</Text>
                    </Box>
                </Box>
            </TouchableOpacity>
        )
    }
}

export default AchievementItem
