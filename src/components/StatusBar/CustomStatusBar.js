import React from 'react';

import { StatusBar} from "react-native";
import PropTypes from 'prop-types'
export default class CustomStatusBar extends React.Component{

    render() {
        return (
            <StatusBar
                transculent
                barStyle="light-content"
                color={"white"}
                backgroundColor={this.props.statusBarColor}
            />
        )
    }
}

CustomStatusBar.propTypes = {
    statusBarColor : PropTypes.any
}


