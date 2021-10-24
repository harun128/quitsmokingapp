import React from 'react';
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";
import {TouchableOpacity,Image} from "react-native";
import {global} from "../../config/global";

class CountryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            bg :""
        }
    }
    componentDidMount(): void {
        if(this.props.selected.trim() === this.props.name.trim())        {
            this.setState({bg:"#ddd"});
        }
        else {
            this.setState({bg:""});
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} >
                <Box bg={this.state.bg} flexDirection={"row"} height={30} alignItems={"center"} py={4} px={2} borderBottomWidth={1} borderBottomColor={"#ddd"}  >
                    <Image
                    source={{uri : global.url+"images/flags/"+this.props.flag}}
                    style={{width:25,height:20}}
                    />
                    <Text pl={3} flex={1}>{this.props.name}</Text>
                </Box>
            </TouchableOpacity>
        )
    }
}

export default (CountryItem);
