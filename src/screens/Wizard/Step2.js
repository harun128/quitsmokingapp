import React from 'react';
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";
import {StatusBar,AsyncStorage,StyleSheet,View,Image} from "react-native";
import PropTypes from "prop-types";
import InputSpinner from "react-native-input-spinner";
import {setSmokingCountPerDay} from "../../state/actions/UserInformation";
import {connect} from "react-redux";
class Step2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 25
        }



    }
    componentDidMount(): void {
        this.props.navigation.addListener("focus",()=>{
            StatusBar.setBarStyle("light-content");
            StatusBar.setBackgroundColor("#ddd");
        });

    }
    render() {
        return(
            <Box >
                <Box bg={""} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}  flex={1} >
                    <Text fontSize={20} my={4} color={"#fff"}>Bir günde kaç adet sigara içersiniz ?</Text>


                    <InputSpinner
                        value={this.props.smokingCountPerDay}
                        min={0}
                        max={100}
                        style={styles.spinner}
                        rounded={false}
                        showBorder
                        onChange={(num) => {
                            setSmokingCountPerDay(num.toString())
                        }}
                    />
                </Box>
            </Box>
        )
    }
}
Step2.propTypes = {
    navigation:PropTypes.any
}
const mapStateToProps = (state) => {
    const {ui} = state;
    return {
        smokingCountPerDay: ui.smokingCountPerDay,
    }

}
const styles = StyleSheet.create({

    spinner: {
        backgroundColor:'white',

        width: "auto",
        minWidth: 300,
    },

});

export default connect(mapStateToProps)(Step2);
