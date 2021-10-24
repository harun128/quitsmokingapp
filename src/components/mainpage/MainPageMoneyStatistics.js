import React from 'react'
import Box from "../UI/Box";
import Text from "../UI/Text";
import { Stats} from "../../assets/icons";
import {colors} from "../../config/colors";
import I18n from './../../lang/_18n';
import {connect} from 'react-redux';

class MainPageMoneyStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyPrice : 0
        }
    }

    componentDidMount() {
        let dPrice = (this.props.smokingCountPerday/this.props.countCigaretteInPocket) * this.props.price;
        this.setState({dailyPrice:dPrice});
    }

    calculate(day) {
        return (((this.props.smokingCountPerDay/this.props.countCigaretteInPocket) * this.props.price) * day).toFixed(2) + " " +this.props.currency;
    }
    componentWillUnmount() {

    }

    render() {
        return (
            <Box mt={3}>
                <Box borderTopLeftRadius={7} borderTopRightRadius={7} height={35} flexDirection={'row'} bg={'#34495e'} alignItems={'center'}>
                    <Stats width={25} style={{marginLeft:10}} color='white'/>
                    <Text ml={10} textAlign={'center'} color={"white"} fontWeight={'normal'} >{I18n.t("mainpage.financial_gain")}</Text>
                </Box>
                <Box  borderBottomLeftRadius={5} borderBottomRightRadius={5} bg={"white"} >
                    {/*<Box  flexDirection='row' py={3} mx={2} borderBottomWidth={1}  borderBottomMargin={3} borderColor={'#ddd'}>*/}
                    {/*    <Text fontWeight={'bold'} color={colors.text_color}>Sigarasız geçirilen zaman</Text>*/}
                    {/*    <Text textAlign={'right'} flex={1} color={'#43B39D'}>{this.state.elapsedDays} {this.state.elapsedHours} {this.state.elapsedMinutes}  {this.state.elapsedSeconds} Saniye</Text>*/}
                    {/*</Box>*/}
                    <Box  flexDirection='row' py={3} mx={2} borderBottomWidth={1}  borderColor={'#ddd'}>
                        <Text fontWeight={'normal'} color={colors.text_color}>1 {I18n.t("week")}</Text>
                        <Text textAlign={'right'} flex={1} color={'#43B39D'}>{this.calculate(1)}</Text>
                    </Box>
                    <Box  flexDirection='row' py={3} mx={2} borderBottomWidth={1}  borderColor={'#ddd'}>
                        <Text fontWeight={'normal'} color={colors.text_color}>1 {I18n.t("month")}</Text>
                        <Text textAlign={'right'} flex={1} color={'#43B39D'}>{this.calculate(30)}</Text>
                    </Box>
                    <Box  flexDirection='row' py={3} mx={2} borderBottomWidth={1}  borderColor={'#ddd'}>
                        <Text fontWeight={'normal'} color={colors.text_color}>1 {I18n.t("year")}</Text>
                        <Text textAlign={'right'} flex={1} color={'#43B39D'}>{this.calculate(365)}</Text>
                    </Box>
                    <Box  flexDirection='row' py={3} mx={2} borderBottomWidth={1}  borderColor={'#ddd'}>
                        <Text fontWeight={'normal'} color={colors.text_color}>{I18n.t("years",{year:5})}</Text>
                        <Text textAlign={'right'} flex={1} color={'#43B39D'}>{this.calculate(365*5)}</Text>
                    </Box>
                    <Box  flexDirection='row' py={3} mx={2} >
                        <Text fontWeight={'normal'} color={colors.text_color}>{I18n.t("years",{year:10})}</Text>
                        <Text textAlign={'right'} flex={1} color={'#43B39D'}>{this.calculate(365*10)}</Text>
                    </Box>
                </Box>
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
        currency:ui.currency
    }
}
export default connect(mapStateToProps)(MainPageMoneyStatistics);
