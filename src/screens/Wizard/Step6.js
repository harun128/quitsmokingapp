import React from 'react';
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";
import {StatusBar, AsyncStorage, StyleSheet, View, Image, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import InputSpinner from "react-native-input-spinner";
import {setDate,setPrice} from "../../state/actions/UserInformation";
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from "react-redux";
class Step6 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            date : (new Date(this.props.date)),
            mode : 'date'
        }
    }
    componentDidMount(): void {

        this.props.navigation.addListener("focus",()=>{
            StatusBar.setBarStyle("light-content");
            StatusBar.setBackgroundColor("#ddd");
        });
    }

    showMode = (currentMode) => {
        this.setState({
            show:true,
            mode:currentMode
        })


    }



    showDatepicker = () => {
            this.showMode('date');

    }
    showTimepicker = () => {
        this.showMode('time');

    }
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        console.warn(currentDate);
        this.setState({show : (Platform.OS === 'ios')});
        if (selectedDate > (new Date().getTime())) {
            alert("Sonraki bir tarihi seçemezsiniz")
        } else {
            this.setState({date:currentDate});
            setDate(currentDate.toString());
        }
    };

    render() {
        return(
            <Box >
                <Box justifyContent={"center"}   flexDirection={"column"}  flex={1} >
                    <Text color={"white"} my={4} fontSize={20} textAlign={"center"} >Sigarayı bırakma tarihiniz ?</Text>
                        <Box flexDirection={'row'}   >
                            <Box flex={1}    justifyContent={"center"} alignItems={'center'} >
                                <TouchableOpacity>
                                    {this.state.date &&
                                    (
                                        <Text fontWeight={'bold'} color={'white'}  onPress={this.showDatepicker}>{
                                            this.state.date.toDateString()
                                        }</Text>
                                    )}

                                </TouchableOpacity>
                            </Box>
                            <Box flex={1} alignItems={'center'} >

                                <Text fontWeight={'bold'} textAlign={"right"} flex={1} color={'white'} onPress={this.showTimepicker}>
                                    {this.state.date.getUTCHours() + ":" + this.state.date.getUTCMinutes()}
                                </Text>

                            </Box>
                            {this.state.show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={0}
                                    value={this.state.date}
                                    mode={this.state.mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={this.onChange}
                                />
                            )}
                        </Box>





                </Box>


            </Box>

        )
    }
}
Step6.propTypes = {
    navigation:PropTypes.any
}
const mapStateToProps = (state) => {
    const {ui} = state;
    return {
        date: ui.date,
    }

}
const styles = StyleSheet.create({
    spinner: {
        backgroundColor:'white',
        width: "40%",
        minWidth: 250,
    },
});

export default connect(mapStateToProps)(Step6);
