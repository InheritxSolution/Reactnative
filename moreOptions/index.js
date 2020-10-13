import React, { useState, useEffect, useCallback, memo } from "react";
import { View, SafeAreaView, FlatList, TouchableOpacity, Image, Alert } from "react-native";

// Custom component
import Label from '../../component/ui/Label';

//Third Party
import { useDispatch } from 'react-redux';

// Utility
import Action from '../../redux/action';
import Colors from '../../utility/Colors';
import Strings from '../../utility/String';
import * as images from '../../assets/images/map';
import Routes from '../../navigation/Routes';
import styles from './style';
import { horizontalScale, verticalScale } from "../../utility/Scale";
import { APITask, APIEndPoint, APIRequest } from '../../api';
import { confirmationAlert } from "../../utility/Helper";

const DATA = [
    { id: 0, title: Strings.More_MyProfile, route: Routes.MyProfile, icon: images.moreOptions.myProfileIcon },
    { id: 1, title: Strings.More_Appointments, route: Routes.Appointments, icon: images.moreOptions.appointmentsIcon },
    { id: 2, title: Strings.More_Users, route: Routes.Users, icon: images.moreOptions.userIcon },
    { id: 4, title: Strings.More_Reports, route: Routes.Reports, icon: images.moreOptions.reportsIcon },
    { id: 5, title: Strings.More_Favourites, route: Routes.Favourites, icon: images.moreOptions.favouritesIcon },
    { id: 6, title: Strings.More_ChangePassword, route: Routes.ChangePassword, icon: images.moreOptions.changePasswordIcon },
    { id: 7, title: Strings.More_ReferApp, route: Routes.ReferApp, icon: images.moreOptions.referAppIcon },
    { id: 8, title: Strings.More_Termsandconditions, route: Routes.TermsCondition, icon: images.moreOptions.termsConditionIcon },
    { id: 9, title: Strings.More_LogOut, route: Routes.Logout, icon: images.moreOptions.logOutIcon },
];

const MoreOptions = ({ navigation, routes }) => {

    const dispatch = useDispatch()

    const renderItemCall = useCallback(({ item, index }) => renderItem({ item, index }));

    const StatesItem = ({ item, onPress }) => {
        return (
            <TouchableOpacity onPress={() => onPress(item.route)} style={styles.itemStyle}>
                <View style={styles.itemView} >
                    <Image style={styles.itemIcon} source={item.icon} />
                </View>
                <View style={{ flex: 1 }} >
                    <Label ml={horizontalScale(15)} fontSize={16} semibold color={Colors.blueOpacity} >{item.title}</Label>
                </View>
                <View>
                    <Image style={styles.arrowIcon} source={images.home.rightArrow} />
                </View>
            </TouchableOpacity>
        );
    };

    function logOutConfirmation() {
        confirmationAlert(Strings.logoutConfirmMsg, (isYes) => {
            if (isYes) {
                logOutMethod()
            }
        })
    }

    function logOutMethod() {
        new APIRequest.Builder()
            .setReqId(APITask.logout)
            .post()
            .reqURL(APIEndPoint.logout)
            .response(onLogoutResponse)
            .error(onLogoutError)
            .build()
            .doRequest(true)
    }

    const onLogoutResponse = (response, reqId) => {
        dispatch(Action.logout());
    };

    const onLogoutError = (error, reqId) => {
        console.log('onLogoutError----->', onLogoutError);
    };

    const renderItem = ({ item, index }) => {
        return (
            <StatesItem
                item={item}
                onPress={(route) => {
                    if (route === 'Logout') {
                        logOutConfirmation()
                    } else {
                        navigation.navigate(Routes.MoreOptionsNavigation, { screen: route });
                    }

                }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.center}>
            <View style={styles.flatlistView} >
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={DATA}
                    renderItem={renderItemCall}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};


export default MoreOptions;