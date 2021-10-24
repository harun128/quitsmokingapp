import React from 'react'
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";
import { FlatList, StatusBar} from "react-native";
import AchievementItem from "../../components/CustomLists/AchievementItem";
import AchievementsList from "../../config/AchievementsList";
import {connect} from "react-redux";
import I18n from "./../../lang/_18n";
class AchievementsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Achievements : [],
            now : (new Date(Date.now())).getTime(),

        };
        this.props.navigation.setOptions({
                headerTitle:I18n.t("mainpage.achievements"),
                headerStyle : {
                    backgroundColor: '#27ae60',
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
                    <Box><Text px={2} color={"white"} fontSize={13}>{this.state.completedAchievement}/{this.state.achievementCount}</Text></Box>
                )
            }
        );
    }

    componentDidMount() {
        this.props.navigation.addListener("focus",() => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor("#27ae60");
        })
        const List = new AchievementsList(this.props?.date,this.props?.smokingCountPerDay,this.props?.countCigaretteInPocket,this.props?.price,this.props?.currency);
        let AList =List.getNotification()
        let AchievementCount = (AList.length);
        let CompletedAchievement = 0;
        AList.forEach((value) => {
            if((this.state.now - value.time) > 0){
                CompletedAchievement = CompletedAchievement +1;
            };
        });
        this.setState({Achievements:AList,completedAchievement:CompletedAchievement,achievementCount:AchievementCount})
    }

    _renderItem = ({item,index}) => {
        return (
            <AchievementItem
                title={item.title}
                achievement={item.achievement}
                image = {AchievementsList.getImage(item.image)}
                time = {item.time}
                quitDate = {this.props?.date}
                now = {this.state?.now}
            />
        )
    }

    render(){
        return (
            <Box>
                <FlatList
                    data={this.state.Achievements}
                    renderItem={this._renderItem}
                />
            </Box>
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
        currency: ui.currency,
    }
}

export default connect(mapStateToProps)(AchievementsScreen);
