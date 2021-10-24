import React from 'react';
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";
import {SafeAreaView,TouchableOpacity,ScrollView} from "react-native";
import {colors} from "../../config/colors";
import {EditIcon,PlusIcon} from "../../assets/icons";
import {connect} from "react-redux";
import {verifyAccount} from "../../state/actions/UserSession";

import ImagePicker from "react-native-image-picker";
import {global} from "../../config/global";
import {setImage} from "../../state/actions/UserSession";
import I18n from "./../../lang/_18n"
import FastImage from 'react-native-fast-image'

class MyProfile extends React.Component{
    constructor(props) {
        super(props);
        let {image} = this.props;

        this.state = {
            avatarSource  : {uri : "https://quitsmokingapp.s3.eu-central-1.amazonaws.com/thumbnail/"+image, method:"GET",cache: 'only-if-cached'},
            photo : null,
            uploadProgress:0,
            response: ''
        }
    }

    componentDidMount(): void {
        let {image} = this.props;
        let url = "https://quitsmokingapp.s3.eu-central-1.amazonaws.com/thumbnail/"+image+"?random_number="+new Date().getTime();

        this.setState({
            avatarSource : {uri : url}
        });
        console.warn(image);




        verifyAccount(this.props.token,function(result) {
            if(result.success == true) {

            }else {

            }
        });
    }
    handleProgress = () => {

    }

    upload =(photo) => {
        const form = new FormData();
        let token = this.props.token;
        form.append('photo', {
            uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", ""),
            type: photo.type,
            name: photo.fileName,
        });

        fetch(global.changeProfileImage, {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'multipart/form-data',
            },
            body: form
        })  .then(response => response.json())
            .then(response => {
                //console.log("upload succes", response);
                //alert("Upload success!");
                if(response.success === true) {

                  // console.warn(response.user);
                    setImage(response.user.image);
                    let url = "https://quitsmokingapp.s3.eu-central-1.amazonaws.com/thumbnail/"+response.user?.image+"?randomNumber="+new Date().getTime();
                    console.log(url);
                    this.setState({
                        avatarSource : {uri : url}
                    });
                }
            })
            .catch(error => {
                console.log("upload error", error);
                alert("Upload failed!");
            });
    }

    selectImage = () => {
        const options = {
            title: 'Select Avatar',
            //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSource: source,
                    photo : response,
                });
                // changeProfileImage(response,this.props.token,function(res){
                //         console.warn(res);
                // });

                this.upload(response);
            }
        });
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                <Box alignItems={"center"} flexDirection={"column"} mt={10}>
                    <TouchableOpacity activeOpacity={0.6}     onPress={() => this.selectImage()} style={{}} >
                        <FastImage
                            style={{width:100,height:100,borderRadius:999}}
                            source={{
                                uri: "https://quitsmokingapp.s3.eu-central-1.amazonaws.com/thumbnail/"+this.props.image+"?randomnumber="+new Date().getTime(),

                                priority: FastImage.priority.high,
                                cache: FastImage.cacheControl.web,
                                //cache: FastImage.cacheControl.web,
                                //cache: FastImage.cacheControl.cacheOnly,
                            }}
                        />



                        {/*<Image*/}
                        {/*    style={{width:100,height:100,borderRadius:999}}*/}
                        {/*    source={this.state.avatarSource}*/}
                        {/*/>*/}
                        <PlusIcon style={{position:'absolute',right:0, marginTop:6,marginRight:6, backgroundColor:'white', borderRadius:999}} color={"#3498db"} />
                    </TouchableOpacity>

                    <Text fontWeight={"bold"} mt={2} color={colors.textDark}>@{this.props.username}</Text>
                    <Text fontWeight={"bold"} mt={2} color={colors.textLight}>{this.props.location}</Text>
                    <Text mx={4} fontWeight={"bold"} mt={2} color={colors.textLight}>
                        {this.props.description}
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("EditProfile")}>
                        <Box bg={"#FAB045"} borderRadius={8} py={3} px={5} mt={4} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
                            <EditIcon color={"#fff"} />
                            <Text ml={3} color={"#fff"}>
                                {I18n.t("community.edit")}
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
        token: us.token,
        image:us.image,
        username:us.username,
        location:us.location,
        description:us.profileDescription


    }
}

export default  connect(mapStateToProps)(MyProfile);
