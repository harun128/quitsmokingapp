import React from 'react';
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";
import {Image, SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import {Chat} from "../../assets/icons";
import {colors} from "../../config/colors";

import ImageView from "react-native-image-viewing";
import I18n from "./../../lang/_18n"
class UserProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
        }
        this.props.navigation.setOptions({
                headerTitle:"",
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
        this.images = [
            {
                uri: "https://quitsmokingapp.s3.eu-central-1.amazonaws.com/original/"+this.props.route.params.image+"?random_number="+new Date().getTime()
            }
        ];
    }
    componentDidMount(): void {

    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <Box alignItems={"center"} flexDirection={"column"} mt={4}>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => this.setState({visible:true})}   style={{}} >
                            <Image
                                style={{width:100,height:100,borderRadius:999}}
                                source={{uri:"https://quitsmokingapp.s3.eu-central-1.amazonaws.com/thumbnail/"+ this.props.route.params.image+"?random_number="+new Date().getTime()}}
                            />
                            <ImageView
                                images={this.images}
                                imageIndex={0}
                                visible={this.state.visible}
                                onRequestClose={() => this.setState({visible:false})}
                            />
                        </TouchableOpacity>
                        <Text fontWeight={"bold"} mt={2} color={colors.textDark}>@{this.props.route.params.username}</Text>
                        <Text fontWeight={"bold"} mt={2} color={colors.textLight}>{this.props.route.params.location}</Text>
                        <Text mx={4} fontWeight={"bold"} mt={2} color={colors.textLight}>
                            {this.props.route.params.profileDescription}
                        </Text>
                        <TouchableOpacity onPress={() => alert("VerySoon")}>
                            <Box bg={"#FAB045"} borderRadius={8} py={3} px={5} mt={4} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
                                <Chat  color={"#fff"} />
                                <Text ml={3} color={"#fff"}>
                                    {I18n.t("community.send_message")}
                                </Text>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default  UserProfile;
