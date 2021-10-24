import React from 'react';
import Box from "../../components/UI/Box";
import {TouchableOpacity,FlatList} from "react-native";
import {global} from "../../config/global";
import {connect} from "react-redux";
import {setCountry} from "../../state/actions/UserSession";
import CountryItem from "../../components/CustomLists/CountryItem";
import I18n from "./../../lang/_18n"
class Countries extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countries :[]
        }

        this.props.navigation.setOptions({
            headerTitle:I18n.t("community.countries"),
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
                <TouchableOpacity style={{paddingRight: 10}} onPress={() => save()}>
                    {/*<CheckIcon color={"white"} style={{paddingLeft: 15}}/>*/}
                </TouchableOpacity>
            )
        });

        let state = this;
        fetch(global.countries, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(responseJson => {
            state.setState({countries:responseJson});
        }).catch((error) => {
        });
    }

    _onChangeCountry(item) {
        setCountry(item);
        this.props.navigation.navigate("CommunityScreen");
    }

    _renderItem = ({item,index}) => {
        return (
            <CountryItem
                name={item.name}
                flag={item.img}
                selected={this.props.country.name}
                onPress={() => this._onChangeCountry(item)}
            />
        )
    }

    render() {
        return (
            <Box>
                <FlatList
                    data={this.state.countries}
                    renderItem={this._renderItem}
                />
            </Box>
        )
    }
}

const mapStateToProps = (state) => {
    const {us} = state;
    return {
        country:us.country
    }
}

export default connect(mapStateToProps)(Countries);
