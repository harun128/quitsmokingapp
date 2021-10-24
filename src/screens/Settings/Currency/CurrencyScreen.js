import React from 'react';
import Box from "../../../components/UI/Box";
import Text from "../../../components/UI/Text";
import {TouchableOpacity, SafeAreaView, FlatList} from "react-native";
import {connect} from 'react-redux';
import {setCurrency} from "../../../state/actions/UserInformation";
import AchievementsList from "../../../config/AchievementsList";
import I18n from "./../../../lang/_18n"
class CurrencyScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            currencies : [{symbol:"₺",name:"Türk Lirası"},{symbol:"€",name: "Euro"},{symbol:"£",name:"Sterling"},{symbol:"$",name:"Dollar"}]
        }
    }

    componentDidMount(): void {
        this.props.navigation.setOptions({
            title : I18n.t("settings.titles.currency")
        });
    }
    defineCurrency =  async(symbol) => {
        setCurrency(symbol);
        if(JSON.parse(this.props.notification)){
            let an = new AchievementsList(this.props.date,this.props.smokingCountPerDay,this.props.countCigaretteInPocket,this.props.price);
            an.setScheduled();
        }
    }

    _renderItem = ({item,index}) => {
        return (
            <TouchableOpacity onPress={() =>  {
                this.defineCurrency(item.symbol);
                this.props.navigation.goBack();
            }}>
                <Box   px={3} mb={1} height={50} bg={(this.props.currency === item.symbol) ? "#ddd":"white"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}>
                    <Text fontSize={3}>{item.symbol}</Text>
                    <Text flex={1} textAlign={"center"}>{item.name}</Text>
                </Box>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeAreaView>
                <Box>
                    <FlatList
                        data={this.state.currencies}
                        renderItem={this._renderItem}
                    />
                </Box>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const {ui} = state;
    return {
        date: ui.date,
        wasteTime: ui.wasteTime,
        smokingCountPerDay: ui.smokingCountPerDay,
        countCigaretteInPocket: ui.countCigaretteInPocket,
        price: ui.price,
        currency:ui.currency,
        notification:ui.achievementsNotification
    }
}

export default  connect(mapStateToProps)(CurrencyScreen)
