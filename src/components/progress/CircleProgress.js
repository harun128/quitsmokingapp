import React from 'react'
import Box from "../UI/Box";
import Text from "../UI/Text";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PropTypes from 'prop-types'
import {default as Easing} from "react-native";

class CircleProgress extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        this.circularProgress.animate(this.props.percentage,1150,Easing.quad);
    }

    render() {
        const {percentage,style, circleHeight} = this.props
        const state = {
            isMoving: false,
            pointsDelta: 0,
            points: 100
        };
        const fill = state.points / 100 * percentage;

        return (
            <Box style={style}>
                <AnimatedCircularProgress
                    ref={(ref) => this.circularProgress = ref}
                    size={circleHeight ? circleHeight : 50}
                    width={5}
                    fill={fill}
                    tintColor="#E84C3D"
                    backgroundColor="#ddd"
                >
                    {(fill) => (
                        <Text  style={{fontSize:11}} >
                            { (100 * fill / 100).toFixed(1) }%
                        </Text>
                    )}
                </AnimatedCircularProgress>
            </Box>
        )
    }
}

CircleProgress.propTypes = {
    percentage : PropTypes.number,
    style : PropTypes.any
}


export default  CircleProgress;
