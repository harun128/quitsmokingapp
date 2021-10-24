import React from 'react';
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";

class Messages extends React.Component{
    constructor() {
        super();
    }
    render() {
        return (
            <Box justifyContent={"center"} alignItems={"center"} flexDirection={"row"} flex={1}>
                <Text>Very Soon</Text>
            </Box>
        )
    }
}

export default  Messages;
