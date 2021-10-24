import React from 'react';
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";
import {SafeAreaView, TouchableOpacity, ScrollView, StatusBar,StyleSheet} from "react-native";
import {colors} from "../../config/colors";

import {connect} from "react-redux";
import TextInput from "../../components/UI/TextInput";
import {updateProfile} from "./../../state/actions/UserSession"
import I18n from "./../../lang/_18n"

class EditProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            location : this.props.location,
            profileDescription: this.props.description
        }
    }

    updateProfile() {
        let {props} = this;
        updateProfile(this.state.location,this.state.profileDescription,this.props.token,function(result) {
            if(result.success == true) {
                StatusBar.setBackgroundColor("#FAB045");
                props.navigation.goBack();
            }else {
            }
        });
    }

    componentDidMount(): void {
        this.props.navigation.setOptions({
                headerTitle:I18n.t("community.edit_profile"),
                headerStyle : {
                    backgroundColor: '#FAB045',
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
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor("#FAB045");
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                <Box flexDirection={'column'} justifyContent={'center'} alignItems={'center'}  mt={5}>
                    <Text mb={2} color={colors.text_color}>{I18n.t("community.location")}</Text>
                    <TextInput
                        onChangeText={(value) => this.setState({location:value})}
                        px={3} value={this.state.location} style={styles.input}/>
                    <Text mb={2}  color={colors.text_color}>{I18n.t("community.introduce_yourself")}</Text>
                    <TextInput style={styles.input}
                       onChangeText={(value) => this.setState({profileDescription:value})}
                        px={3}
                        value={this.state.profileDescription}
                        multiline={true}
                        numberOfLines={8}
                        />
                    <TouchableOpacity onPress={() => this.updateProfile()}>
                        <Box bg={"#FAB045"} borderRadius={8} py={3} px={5} mt={4} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
                            <Text color={"#fff"} fontWeight={"bold"}>
                                {I18n.t("community.save")}
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const mapStateToProps =(state) => {
    const {us} = state;
    return {
        token:us.token,
        location:us.location,
        description:us.profileDescription
    }
}

const styles = StyleSheet.create({
    input : {
        marginBottom:8,
        textAlign:'left',
        backgroundColor: 'white',
        width:'85%',
        marginHorizontal:100
    }
});

export  default connect(mapStateToProps)(EditProfile)
