import React from "react"
import {SafeAreaView,StyleSheet,TouchableOpacity} from "react-native";
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";
import {RegisterIcon,LoginIcon} from "../../assets/icons";
import TextInput from "../../components/UI/TextInput";
import ValidationComponent from 'react-native-form-validator';
import {Login as LoginPost} from "./../../state/actions/UserSession";

import I18n from "./../../lang/_18n"
class Login extends ValidationComponent{
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
            email : "",
            password :"",
        }
    }

    _onLoginButton = () => {
        this.validate({
            password: {minlength:6, required: true},
            email: {email: true,required: true},
        });
        if(this.isFormValid()) {
            LoginPost(this.state.email,this.state.password,(response) => {

            });
        }else {

        }
    }

    render(){
        return(
            <SafeAreaView>

                <Box flexDirection={'column'} alignItems={'center'} pt={4}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate("Register")} activeOpacity={0.8}>
                        <Box flexDirection={'row'} alignItems={"center"} justifyContent={"center"} style={{backgroundColor:"#3498db",paddingVertical:10,paddingHorizontal:100,borderRadius:9}}>
                            <RegisterIcon color={"white"}/>
                            <Text ml={3} fontWeight={'800'} color={"#fff"}>{I18n.t("community.register")}</Text>
                        </Box>
                    </TouchableOpacity>
                    <Box flexDirection={"row"} my={3} borderWidth={1} borderColor={'#ddd'}>

                    </Box>
                    <Box flexDirection={'row'}>
                        <TextInput
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
                                <LoginIcon color={"white"}/>
                                <Text ml={3} fontWeight={'800'} color={"#fff"}>{I18n.t("community.sign_in")}</Text>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                    <Box flexDirection={'column'} flex={1}  mt={3} >
                        <Text color={"#3498db"} textAlign={'left'}>
                            {I18n.t("community.forgot_password")}
                        </Text>
                    </Box>
                </Box>
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

export default Login;

