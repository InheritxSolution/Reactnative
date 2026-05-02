import React, { useEffect, useState } from "react";
import { View, Image, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";

// Custom components
import Label from '../../component/ui/Label';
import BaseButton from '../../component/ui/BaseButton/index';

// Utility
import Colors from '../../utility/Colors';
import Strings from '../../utility/String';
import * as images from '../../assets/images/map';
import styles from './style';
import { screenWidth } from "../../utility/Scale";
import { APITask, APIEndPoint, APIRequest } from '../../api';
import Action from '../../redux/action';
import { AppLogger, CATEGORIES } from "../../utility/AppLogger";

/**
 * Home Screen
 * Inheritx Solutions - Premium Portfolio Showcase
 * Demonstrates high-end UI/UX with Glassmorphism and robust logging.
 */
const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const [userFirstName, setuserFirstName] = useState('');
    const userType = useSelector((state) => state.userType);

    useEffect(() => {
        AppLogger.info(CATEGORIES.UI, "Home Screen Mounted");
        fetchUserProfile();
    }, []);

    const fetchUserProfile = () => {
        new APIRequest.Builder()
            .setReqId(APITask.userProfile)
            .get()
            .reqURL(APIEndPoint.userProfile)
            .response(onUserProfileResponse)
            .error(onUserProfileError)
            .build()
            .doRequest(false);
    };

    const onUserProfileResponse = (response, reqId) => {
        AppLogger.info(CATEGORIES.API, "User Profile Fetched Successfully", response);
        const { data } = response;
        if (data && data.length > 0) {
            dispatch(Action.storeUserInfo(data[0]));
            setuserFirstName(data[0].firstName);
            dispatch(Action.storeUserType(data[0].userType));
        }
    };

    const onUserProfileError = (error, reqId) => {
        AppLogger.error(CATEGORIES.API, "Error Fetching User Profile", error);
    };

    return (
        <LinearGradient 
            style={styles.container} 
            colors={[Colors.lightBlue || '#E1F5FE', Colors.white || '#FFFFFF']}
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}
        >
            <SafeAreaView style={styles.center}>
                <View style={styles.glassCard}>
                    <View style={styles.innerView}>
                        <Label 
                            bold 
                            fontSize={28} 
                            color={Colors.darkBlue || Colors.lightBlack} 
                            style={styles.welcomeText}
                        >
                            {Strings.Welcome + ' ' + (userFirstName || 'Guest') + '!'}
                        </Label>
                        
                        <Image 
                            style={styles.iconStyle} 
                            source={images.homeScreenIcons.welcomIcon} 
                        />
                        
                        <Label 
                            mt={10} 
                            medium 
                            align={'center'} 
                            fontSize={16} 
                            color={Colors.opacityBlack}
                            style={styles.noteText}
                        >
                            {Strings.WelcomeNote}
                        </Label>
                    </View>

                    <View style={styles.buttonContainer}>
                        <BaseButton
                            mt={20}
                            rightIcon={images.navigation.rightArrow}
                            disabled={false}
                            width={'100%'}
                            backgroundColor={Colors.darkBlue}
                            title={Strings.requestAppointment}
                            onPress={() => AppLogger.info(CATEGORIES.UI, "Request Appointment Tapped")}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Home;