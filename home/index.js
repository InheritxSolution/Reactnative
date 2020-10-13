import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";

//Third Party
import { useDispatch, useSelector } from 'react-redux';

// Custom component
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


const Home = ({ navigation }) => {

  const dispatch = useDispatch()

  const [userFirstName, setuserFirstName] = useState('')

  const userType = useSelector((state) => state.userType);

  useEffect(() => {
    new APIRequest.Builder()
      .setReqId(APITask.userProfile)
      .get()
      .reqURL(APIEndPoint.userProfile)
      .response(onUserProfileResponse)
      .error(onUserProfileError)
      .build()
      .doRequest(false)
  }, [])

  const onUserProfileResponse = (response, reqId) => {
    const { data } = response;
    dispatch(Action.storeUserInfo(data[0]));
    setuserFirstName(data[0].firstName)
    dispatch(Action.storeUserType(data[0].userType));
    console.log('onUserProfileResponse----->', response);
  };

  const onUserProfileError = (error, reqId) => {
    console.log('onUserProfileError----->', error);
  };

  return (
    <View style={styles.center}>
      <View style={styles.innerView}>
        <Label bold fontSize={25} color={Colors.lightBlack} >{Strings.Welcome + ' ' + userFirstName + '!!!'}</Label>
        <Image style={styles.iconStyle} source={images.homeScreenIcons.welcomIcon} />
        <Label mt={20} medium align={'center'} fontSize={14} color={Colors.opacityBlack}  >{Strings.WelcomeNote}</Label>
      </View>
      <View style={{ width: screenWidth - 60, marginHorizontal: 30 }}>
        <BaseButton
          mt={30}
          rightIcon={images.navigation.rightArrow}
          disabled={false}
          width={'100%'}
          backgroundColor={Colors.darkBlue}
          title={Strings.requestAppointment}
        />
      </View>
    </View >
  );
};

export default Home;