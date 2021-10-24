import React from 'react'
import Box from "../../components/UI/Box";

import {HealthConditions} from "../../config/HealthConditions"
import {FlatList, SafeAreaView,StatusBar} from "react-native";

import HealthItem from "./../../components/CustomLists/HealthItem"
import {connect} from "react-redux";
import I18n from "./../../lang/_18n";
class HealthScreen extends React.Component {

    constructor(props) {
        super(props);
        this.props.navigation.setOptions({
                headerTitle:I18n.t("health.title"),
                headerStyle : {
                    backgroundColor: '#E84C3D',
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
    }
    componentDidMount(): void {
        // this.props.navigation.addListener("focus",() => {
        //     StatusBar.setBarStyle('light-content');
        //     StatusBar.setBackgroundColor("#E84C3D");
        // })

    }


    _renderItem = ({item,index}) => {
        return (
            <HealthItem

                onPress={() => this.props.navigation.navigate("HealthConditionScreen",{id:item.id})}
                date={this.props.date}
                time={item.time}
                needTime={item.needTime}
                condition={item.condition}
            />
            )
    }


    render(){
        return (
            <SafeAreaView>
                <StatusBar barStyle={"light-content"} backgroundColor={"#E84C3D"}/>
                <FlatList
                    data={HealthConditions}
                    renderItem={this._renderItem}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const {ui} = state;
    return {
        date: ui.date,
    }
}

export default connect(mapStateToProps)(HealthScreen);
