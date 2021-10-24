import React from 'react';
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";
import {SafeAreaView,ScrollView,StyleSheet,TouchableOpacity ,FlatList,Animated} from "react-native";
import io from 'socket.io-client/dist/socket.io';
import {socketUrl} from "../../config/global";
import TextInput from "../../components/UI/TextInput";
import MessageItem from "../../components/CustomLists/MessageItem";
import Modal, {  ModalContent,ModalFooter,ModalButton } from 'react-native-modals';
import {connect} from 'react-redux';
import I18n from "./../../lang/_18n"
class CommunityMessagesScreen extends React.Component{
     connectionConfig = {
        jsonp: false,
        reconnection: true,
        reconnectionDelay: 100,
        reconnectionAttempts: 100000,
         transports: [ 'websocket' ],
         upgrade: false,
         agent: '-',
         cert: '-',
         ca: '-',
         ciphers: '-',
         rejectUnauthorized: '-',
         perMessageDeflate: '-',

    };

    socket = io(socketUrl+"community",this.connectionConfig);

    constructor() {
        super();

        this.state = {
            messages : [],
            message : '',
            visible : false
        }
        this.flatList = React.createRef();
        this.socket.on("connect",() => {

        });
        this.socket.on('connect_error', function(err){

        });
    }
    componentDidMount(): void {

        const s = this;

        this.socket.on("lastMessages",(data) =>{
            this.setState({messages:data});
        });
        s.socket.emit("joinRoom",(s.props?.country?.key));
        this.props.navigation.addListener("focus",() =>{
            setTimeout(()=>{
                s.socket.emit("joinRoom",(s.props?.country?.key));
            },1000);
        })

        this.socket.on("newMessage",(data) => {
            let newArray = [...this.state.messages,data];
            this.setState({messages:newArray});
        })
    }

    _renderItem =({item,index})=> {
        return (
            <MessageItem
                giveAnswer={() => {this.setState({message:this.state.message + " @"+item.sender.username})}}
                onPress={() => {
                    if(this.props.userId !== item.sender._id)
                        this.props.navigation.navigate("UserProfile",item.sender)}
                }
                message={item?.message}
                sender={item?.sender}
                date={item?.sendDate}
            />
        )
    }

    _sendMessage = () => {
        let {token} = this.props
        if(!token) {
            this.setState({visible:true});
        }
        let {message} = this.state;
        this.socket.emit("sendMessage",{token:token,message:message});
        this.setState({message:""});
        this.flatList.scrollToEnd({animated:true});
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
               <Box style={{flex: 1}} >
                       <FlatList
                           ref={ref => (this.flatList = ref)}
                           onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                           onLayout={() => this.flatList.scrollToEnd({animated: true})}
                           data={this.state.messages}
                           renderItem={this._renderItem}
                           keyExtractor={item => item._id}
                       />
                   <Box flexDirection={"row"} alignItems={"center"} justifyContent={"center"} borderTopWidth={1} borderTopColor={"#bdc3c7"} p={1} bg={"#ecf0f1"}>
                       <TextInput value={this.state.message} onChangeText={(val) => this.setState({message:val})} style={styles.input}/>
                       <TouchableOpacity activeOpacity={0.7} style={styles.sendButton} onPress={() => this._sendMessage()}>
                            <Text color={"white"}>{I18n.t("community.send")}</Text>
                       </TouchableOpacity>
                   </Box>
               </Box>
                <Box>
                    <Modal
                        visible={this.state.visible}
                        modalTitle={<Box bg={"#FAB045"}  height={50} justifyContent={"center"} alignItems={"center"} title="Giriş Yap" color={"red"}><Text fontSize={18} color={"white"}>{I18n.t("community.sign_in")}</Text></Box>}
                        footer={
                            <ModalFooter>
                                <ModalButton
                                    text={I18n.t("community.close")}
                                    onPress={() => {this.setState({visible:false})}}
                                />
                                <ModalButton
                                    text={I18n.t("community.sign_in")}
                                    onPress={() => {
                                        this.setState({visible:false});
                                        this.props.navigation.navigate("Profilim");
                                    }}
                                />
                            </ModalFooter>
                        }
                    >
                        <ModalContent>
                            <Text py={3} px={2} fontSize={18} textAlign={"center"}>{I18n.t("community.errors.send_message")}</Text>
                        </ModalContent>
                    </Modal>
                </Box>
            </SafeAreaView>
        )
    }
}

const styles= StyleSheet.create({
    input : {
        borderWidth:1,
        borderColor:'#ddd',
        backgroundColor:'#fff',
        flex:1,
        height:38,
        paddingHorizontal:5,
    },

    sendButton: {
        backgroundColor:"#2980b9",
        height:37,
        justifyContent: 'center',
        alignItems:'center',
        paddingHorizontal: 8,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    }

})

const mapStateToProps =(state) => {
    const {us} = state;
    return {
        token:us.token,
        location:us.location,
        description:us.profileDescription,
        country:us.country,
        userId:us.userId
    }
}

export default  connect(mapStateToProps)(CommunityMessagesScreen);
