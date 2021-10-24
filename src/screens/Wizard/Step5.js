import React from 'react';
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";
import {StatusBar,AsyncStorage,StyleSheet,View,Image} from "react-native";
import PropTypes from "prop-types";
import InputSpinner from "react-native-input-spinner";
import {setPrice} from "../../state/actions/UserInformation";
import {connect} from "react-redux";
class Step5 extends React.Component {
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
                    <Text color={"white"} my={4} fontSize={20} textAlign={"center"} >Bir paket sigaraya ödediğiniz ücret nedir ?</Text>

                    <Box flexDirection={"row"}>
                    <InputSpinner
                        type={"real"}
                        value={this.props.price}
                        min={1}
                        max={15000}
                        step={0.5}
                        style={styles.spinner}
                        rounded={false}
                        showBorder
                        onChange={(num) => {
                            setPrice(num.toString())
                        }}
                    />

                    </Box>


                </Box>


            </Box>

        )
    }
}
Step5.propTypes = {
    navigation:PropTypes.any
}
const mapStateToProps = (state) => {
    const {ui} = state;
    return {
        price: ui.price,
    }

}
const styles = StyleSheet.create({

    spinner: {
        backgroundColor:'white',
        width: "40%",
        minWidth: 250,
    },

});

export default connect(mapStateToProps)(Step5);
