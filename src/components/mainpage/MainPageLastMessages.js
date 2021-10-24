import React from 'react'
import Box from "../UI/Box";
import Text from "../UI/Text";
import {Chat} from "../../assets/icons";
import {TouchableOpacity, Animated,StyleSheet,AsyncStorage} from "react-native";
import {global} from "../../config/global";
import NetInfo from "@react-native-community/netinfo";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
class MainPageLastMessages extends React.Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            messages : [],
            message : null,
            animation : new Animated.Value(1),
        }
    }

    componentDidMount(): void {
        let t = this;
        this.navigation.addListener("focus",() =>{
            clearInterval(t.timer);
            AsyncStorage.getItem("country").then((value) => {
                let country = JSON.parse(value);
                NetInfo.fetch().then(state => {
                    if(state.isConnected === true) {
                        fetch(global.lastMessages, {
                            method: 'POST',
                            body: JSON.stringify({
                                id: country.id,
                            })
                        }).then(response => response.json()).then(responseJson => {
                            this.setState({messages:responseJson});
                            let t = this;
                            let item = t.state.messages[Math.floor(Math.random() * t.state.messages.length)];
                            this.setState({message:item});
                            this.timer =setInterval(() => {
                                let item = t.state.messages[Math.floor(Math.random() * t.state.messages.length)];
                                Animated.timing(this.state.animation, {
                                    toValue : 0,
                                    timing : 400,
                                    useNativeDriver:true
                                }).start(()=>{
                                    Animated.timing(this.state.animation,{
                                        toValue : 1,
                                        duration : 400,
                                        useNativeDriver:true
                                    }).start();
                                    this.setState({message:item});
                                })
                            },2500);
                        }).catch((error) => {

                        });
                    }else {
                        this.setState([{username:"Connection Failed",message:"There is no internet connection"}])
                    }
                });
            });

        });
        this.navigation.addListener("blur",() =>{
            clearInterval(this.timer);
        });

    }

    componentWillUnmount() {

    }

    render() {
        const animatedStyle ={
            opacity : this.state.animation
        }
        return (
            <TouchableOpacity activeOpacity={.75} onPress={this.props.onPress}>
                <Box mt={3} borderBottomLeftRadius={5} borderBottomRightRadius={5}>
                    <Box borderTopLeftRadius={7} borderTopRightRadius={7} height={35} flexDirection={'row'} bg={'#FAB045'}  alignItems={'center'}>
                        <Chat width={25} style={{marginLeft:10}} color='white'/>
                        <Text  ml={10} textAlign={'center'} color={"white"} fontWeight={'normal'} >{this.props.title}</Text>
                    </Box>
                </Box>
                    <Box  flexDirection={'row'} height={40} py={1} bg={'white'} alignItems={'center'} borderBottomLeftRadius={5}
                         borderBottomRightRadius={5}>
                        <Animated.View  style={[styles.animatedBox,animatedStyle]}>
                            {this.state.message &&
                                <Text minHeight={30} lineHeight={21} py={2} px={2}>
                                    <Text
                                    fontWeight={'bold'}>@{this.state.message?.sender?.username}
                                    </Text>
                                    {' '+this.state.message?.message}
                                </Text>
                            }
                        </Animated.View>
                    </Box>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
        padding: 11

    },

});
MainPageLastMessages.propTypes = {
    navigation:PropTypes.any,
    title: PropTypes.string

}
const mapStateToProps = (state) => {
    const {us} = state;
    return {
       country:state.us.country
    }
}
export default  connect(mapStateToProps)(MainPageLastMessages);
