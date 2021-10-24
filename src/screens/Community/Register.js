import React from "react"
import {SafeAreaView, StyleSheet, TouchableOpacity,ScrollView} from "react-native";
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";
import {RegisterIcon} from "../../assets/icons";
import TextInput from "../../components/UI/TextInput";
import ValidationComponent from 'react-native-form-validator';
import {RegisterPost} from "./../../state/actions/UserSession";
import { showMessage } from "react-native-flash-message";
import I18n from "./../../lang/_18n"
import FlashMessage from "react-native-flash-message";
class Register extends ValidationComponent{
    messages = {
        en: {
            email: "Mail address is not verified.",
            required: "This field is required to be filled.",
            minlength: "Password field must contain a minimum of 7 characters.",
            maxlength:"asd"
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            emailFocus :false,
            passwordFocus:false,
            userNameFocus:false,
            email : "",
            password :"",
            username: "",
        }
        this.props.navigation.setOptions({
                headerTitle:I18n.t("community.register"),
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
                    <Box>
                    </Box>
                )
            }
        );
    }

    _onLoginButton = () => {

        this.validate({
            password: {minlength:3, required: true},
            email: {email: true,required: true},
            username: {required:true,minlength:3}
        });
        if(this.isFormValid()) {
            RegisterPost(this.state.email,this.state.password,this.state.username,(data) => {
                if(data.success === true) {
                    showMessage({
                        message: I18n.t("community.register_success"),
                        description: I18n.t("community.can_login"),
                        type: "success",
                        duration:3500,
                    });
                    this.setState({email:"",username:"",password:""});

                } else {
                    showMessage({
                        message: I18n.t("community.error"),
                        description: data.message,
                        type: "warning",
                        duration:3500,
                    });
                }
            })

        }else {
        //alert("asd");
        }
    }

    render(){
        return(
            <SafeAreaView>
                <FlashMessage position="top" />
                <ScrollView>
                <Box flexDirection={'column'} alignItems={'center'} pt={5}>
                    <Box flexDirection={"row"} my={3} borderWidth={1} borderColor={'#ddd'}>
                    </Box>
                    <Box flexDirection={'row'}>
                        <TextInput
                            value={this.state.username}
                            onFocus={() => {this.setState({usernameFocus:true})}}
                            onBlur={() => {this.setState({usernameFocus:false})}}
                            style={this.state.usernameFocus ? styles.focusInput : styles.input}
                            onChangeText = {(value) => {this.setState({username:value.trim()})}}
                            placeholder={I18n.t("community.username")}
                        />

                    </Box>
                    {this.isFieldInError('username') && this.getErrorsInField('username').map(errorMessage => <Text color={"red"} my={1}>{errorMessage}</Text>) }
                    <Box flexDirection={'row'}>
                        <TextInput
                            value={this.state.email}
                            onFocus={() => {this.setState({emailFocus:true})}}
                            onBlur={() => {this.setState({emailFocus:false})}}
                            style={this.state.emailFocus ? styles.focusInput : styles.input}
                            onChangeText = {(value) => {this.setState({email:value.trim()})}}
                            placeholder={I18n.t("community.email")}
                        />
                    </Box>
                    {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text color={"red"} my={1}>{errorMessage}</Text>) }
                    <Box flexDirection={'row'}>
                        <TextInput
                            value={this.state.password}
                            onFocus={() => {this.setState({passwordFocus:true})}}
                            onBlur={() => {this.setState({passwordFocus:false})}}
                            onChangeText = {(value) => {this.setState({password:value.trim()})}}
                            secureTextEntry={true}
                            style={this.state.passwordFocus ? styles.focusInput : styles.input}
                            placeholder={I18n.t("community.password")} />
                    </Box>
                    {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text color={"red"} my={1}>{errorMessage}</Text>) }
                    <Box flexDirection={'row'} mt={10}>
                        <TouchableOpacity  activeOpacity={0.8} onPress={this._onLoginButton}>
                            <Box flexDirection={'row'} alignItems={"center"} justifyContent={"center"} style={{backgroundColor:"#16a085",paddingVertical:10,paddingHorizontal:100,borderRadius:9}}>
                                <RegisterIcon color={"white"}/>
                                <Text ml={3} fontWeight={'800'} color={"#fff"}>{I18n.t("community.register")}</Text>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                    <Box flexDirection={'column'} flex={1}  mt={3} >
                    </Box>
                </Box>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth:1,
        borderColor: '#fff',
        flex:1,
        marginHorizontal:50,
        marginBottom:10,
        borderRadius:6,
        paddingHorizontal:8,
        textAlign:'center',
        backgroundColor:'#fff'
    },
    focusInput: {
        borderWidth:1,
        borderColor:'#FAB045',
        flex:1,
        marginHorizontal:50,
        marginBottom:10,
        borderRadius:6,
        paddingHorizontal:8,
        textAlign:'center',
        backgroundColor:'#fff'

    }
})

export default Register;

