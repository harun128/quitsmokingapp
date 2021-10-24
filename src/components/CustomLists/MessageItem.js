import React from 'react';
import {TouchableOpacity, TouchableHighlight} from "react-native-gesture-handler";
import Box from "../UI/Box";
import Text from "../UI/Text";
import FastImage from 'react-native-fast-image'
import {global} from "../../config/global";
import I18n from "./../../lang/_18n"
import TimeAgo from 'react-native-timeago';

class MessageItem extends React.Component {
    constructor(props) {
        super(props);
        this.rnd = Math.floor(Math.random() * 101);
    }
    componentDidMount(): void {

    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.7}  >
            <Box flexDirection={"row"} my={2} px={2} justifyContent={"center"} alignItems={"center"}>
                <TouchableHighlight onPress={this.props.onPress}>
                    <FastImage
                        style={{width:55,height:55,borderRadius:999,borderWidth: 2, borderColor:"white"}}
                        source={{
                            uri: "https://quitsmokingapp.s3.eu-central-1.amazonaws.com/thumbnail/"+this.props.sender?.image,

                            priority: FastImage.priority.normal,
                            cache: FastImage.cacheControl.web,
                            //cache: FastImage.cacheControl.web,
                            //cache: FastImage.cacheControl.cacheOnly,
                        }}
                    />
                    {/*<Image*/}
                    {/*    onPress={this.props.onPress}*/}
                    {/*    style={{width:55,height:55,borderRadius:999,borderWidth: 2, borderColor:"white"}}*/}
                    {/*    source={{uri : global.url+"images/avatar/"+this.props.sender?.image,*/}
                    {/*        method: 'POST',*/}
                    {/*        headers: {*/}
                    {/*            Pragma: 'no-cache'*/}
                    {/*        },*/}
                    {/*        cache: "only-if-cached",*/}
                    {/*        body: 'Your asdas d Body goes here'*/}
                    {/*    }}*/}
                    {/*/>*/}
                </TouchableHighlight>
                <Box flexDirection={"column"} px={2} py={2} bg={"white"} ml={2} flex={1} borderTopRightRadius={7} borderBottomRightRadius={7} borderBottomLeftRadius={7}>
                    <Box flexDirection={"row"}>
                        <Text color={"#16a085"} fontWeight={"bold"} flex={1}>@{this.props?.sender?.username}</Text>
                        <Text color={'#ddd'}><TimeAgo time={this.props?.date} /></Text>
                    </Box>
                    <Text mt={2}>{this.props?.message}</Text>
                    <Text onPress={this.props.giveAnswer} mt={1} fontWeight={"bold"} color={"#2980b9"} flex={1} textAlign={"right"} style={{fontSize:12}}>{I18n.t("community.reply")}</Text>
                </Box>
            </Box>
            </TouchableOpacity>
        )
    }
}

export default  MessageItem;
