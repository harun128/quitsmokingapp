import React, { useRef, useState } from "react"
import {SafeAreaView, Button, View, TouchableOpacity, StatusBar} from "react-native"
import Wizard from "react-native-wizard"
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Box from "../../components/UI/Box";
import Text from "../../components/UI/Text";
import {Settings, Share} from "../../assets/icons";
const Setup = (props) => {
    const {navigation,route} = props;
    React.useEffect(() => {
        navigation.setOptions({
            title:(currentStep + 1) +". Adım",
            headerStyle : {
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,
                height:50,
                backgroundColor:'#3598DB'

            },
            headerTitleStyle: {
                color:'white',
                fontWeight: 'normal',
                fontSize:17,
                justifyContent:'center',
                alignItems:'center',
                textAlign:'center',


            },
            headerLeft : () => (
                <TouchableOpacity onPress={() => wizard.current.prev()} style={{paddingLeft:10}} >
                    <Text color={"white"} fontWeight={"bold"}>Geri</Text>
                </TouchableOpacity>
            ),
            headerRight :() => (
                <TouchableOpacity onPress={() => wizard.current.next()}  style={{paddingRight:10}}>
                    <Text color={"white"} fontWeight={"bold"}>İleri</Text>
                </TouchableOpacity>
            )
        });
        navigation.addListener("focus",()=>{
            StatusBar.setBarStyle("light-content");
            StatusBar.setBackgroundColor("#3598DB");
        });

    })



    const wizard = useRef()
    const [isFirstStep, setIsFirstStep] = useState(true)
    const [isLastStep, setIsLastStep] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)

    const stepList = [
        {
            content: <Step1 navigation={navigation} />,
        },
        {
            content: <Step2 navigation={navigation}/>,
        },
        {
            content: <Step3 navigation={navigation}/>,
        },
        {
            content: <Step4 navigation={navigation}/>,
        },
        {
            content: <Step5 navigation={navigation}/>,
        },
        {
            content: <Step6 navigation={navigation}/>,
        },
    ]

    return (
        <Box bg={"#3598DB"}>
            <SafeAreaView >
                <Box style={{ flexDirection: "column", alignItems: "center", justifyContent: "center"}} >
                    <Box flexDirection={"row"} marginTop={4} >
                        {stepList.map((val, index) => (
                            <Box
                                key={"step-indicator-" + index}
                                style={{

                                    width: 10,
                                    marginHorizontal: 6,
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: index === currentStep ? "#fff" : "#000",
                                }}
                            />
                        ))}
                    </Box>


                        <Wizard
                            ref={wizard}
                            steps={stepList}
                            isFirstStep={val => setIsFirstStep(val)}
                            isLastStep={val => setIsLastStep(val)}
                            onNext={() => {
                                console.log("Next Step Called")
                            }}
                            onPrev={() => {
                                console.log("Previous Step Called")
                            }}
                            currentStep={({ currentStep, isLastStep, isFirstStep }) => {
                                setCurrentStep(currentStep);

                            }}
                        />



                </Box>
            </SafeAreaView>

        </Box>
    )
}

export default  Setup;
