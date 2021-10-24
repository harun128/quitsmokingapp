import React from 'react';
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";
import {StatusBar, TouchableOpacity,Image} from "react-native";
import {Settings, Share} from "../../assets/icons";
import PropTypes from 'prop-types'
import CircleProgress from "../../components/progress/CircleProgress";

class Step1 extends React.Component {

    componentDidMount(): void {

    }

    constructor(props) {
        super(props);

    }

    render() {
        return(
            <Box  justifyContent={"center"} alignItems={"center"} flexDirection={"column"} flex={1}>
                <Image
                    style={{resizeMode:'stretch',width:100,height:100,color:'white'}}
                    source={require('./../../assets/images/Wizard/Welcome.png')}
                />
                <Text fontSize={20} color={"#fff"}>Tebrikler Başlamak için ilk adımı attınız</Text>
            </Box>
        )
    }
}
Step1.propTypes = {
    navigation:PropTypes.any
}




export default Step1
