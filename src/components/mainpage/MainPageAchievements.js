import React from 'react'
import Box from "../UI/Box";
import Text from "../UI/Text";

import {AchievementIcon} from "../../assets/icons";
import {TouchableOpacity,AsyncStorage,Image} from "react-native";
import PropTypes from 'prop-types'

import AchievementsList from "../../config/AchievementsList";

class MainPageAchievements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            condition : '',
            lastAchievement : {},
            image: ''
        }
    }

    setAchievement = () =>{
        AsyncStorage.multiGet(["date", "smokingCountPerDay", "countCigaretteInPocket", "wasteTime", "price","currency"]).then((result) => {
            let al = new AchievementsList(result[0][1], result[1][1], result[2][1], result[4][1],result[5][1]);
            let list = al.getNotification();
            let sorted = list.sort((a, b) => (a.time > b.time) ? 1 : -1);
            let now = (new Date(Date.now())).getTime();
            sorted.some((value, index) => {
                let diff = now - value.time;
                if (diff < 0) {
                    if (index > 0) {
                        let selected = sorted[(index-1)];
                        this.setState({lastAchievement: selected});
                        this.setState({image: AchievementsList.getImage(selected.image)});

                        return true;
                    }else {
                        let selected = sorted[0];
                        this.setState({lastAchievement: selected});
                        this.setState({image: AchievementsList.getImage(selected.image)});
                        return true;
                    }
                } else if(index == 17) {
                    let selected = sorted[17];
                    this.setState({lastAchievement: selected});
                    this.setState({image: AchievementsList.getImage(selected.image)});
                }
            })
        })
    }

    componentDidMount(): void {
        this.setAchievement();

        this.props.navigation.addListener("focus" ,() => {
            this.setAchievement()
        });
    }

    componentWillUnmount(): void {

    }

    render() {
        return (
            <TouchableOpacity activeOpacity={.75} onPress={this.props.onPress} >
                <Box mt={3}  borderBottomLeftRadius={5} borderBottomRightRadius={5}>
                    <Box borderTopLeftRadius={7} borderTopRightRadius={7} height={35} flexDirection={'row'} bg={'#27ae60'}  alignItems={'center'}>
                        <AchievementIcon  style={{marginLeft:10}} color={'white'} />
                        <Text  ml={10} textAlign={'center'} color={"white"} fontWeight={'normal'} >{this.props.title}</Text>
                    </Box>
                </Box>
                <Box flexDirection={'row'} py={15} bg={'white'} height={70}  alignItems={'center'} borderBottomLeftRadius={5} borderBottomRightRadius={5}>
                        <Image
                            resizeMode={"contain"}
                            style={{width:35,  marginLeft:10, marginVertical:10}}
                            source={this.state.image}
                        />
                        <Text  ml={3} mr={1} >{this.state.lastAchievement?.achievement}</Text>
                </Box>
            </TouchableOpacity>
        )
    }
}

MainPageAchievements.propTypes = {
    navigation:PropTypes.any,
    title: PropTypes.string
}

export default (MainPageAchievements);

