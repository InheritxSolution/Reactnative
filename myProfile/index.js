import React, { useState, useEffect, useCallback, memo } from "react";
import { View, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Image, Alert } from "react-native";

// Custom component
import { Label, TextField, BaseButton, CountryPicker, NumberSlider, BaseImageView } from '../../component/ui'

//Thirs Party
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';
import FastImage from 'react-native-fast-image'

// Utility
import Action from '../../redux/action';
import Colors from '../../utility/Colors';
import Strings from '../../utility/String';
import * as images from '../../assets/images/map';
import { APITask, APIEndPoint, APIRequest } from '../../api';
import styles from './style';
import { Loader } from "../../component/ui";
import {
    getUserName,
    checkCameraPermission,
    checkPhotoLibraryPermission,
    showPermissionAlert,
    showAlert
} from "../../utility/Helper";
import { APIUrl, USER_TYPE } from "../../utility/Constant";
import { validation } from '../../utility/validation';
import LinearGradient from "react-native-linear-gradient";
import { IS_IOS } from "../../utility";

const DetailsView = ({ userObject }) => {

    const [userType] = useState(userObject.userType)
    const [userSelectedStates] = useState(userObject.doctorsPracticeStates ? userObject.doctorsPracticeStates : [])
    const [isViewMore, changeViewMore] = useState(userSelectedStates.length > 3 ? false : true)
    const [viewMoreData, setViewMoreData] = useState(userSelectedStates.splice(0, 3))


    const renderItemCall = useCallback(({ item, index }) => renderItem({ item, index }));

    const StatesItem = ({ item }) => {
        return (
            <View style={styles.statesItem} >
                <Label semibold fontSize={16} color={Colors.opacityBlue} >{item.stateName}</Label>
            </View>
        );
    };

    const renderItem = ({ item, index }) => {
        return (
            <StatesItem item={item} />
        );
    };

    async function setStatesData() {
        await setViewMoreData([...viewMoreData, ...userObject.doctorsPracticeStates]);
        await changeViewMore(true)
    }

    const footerFlatlistComponent = () => {
        if (!isViewMore) {
            return (
                <TouchableOpacity onPress={() => setStatesData()} style={styles.moreItem} >
                    <Label semibold fontSize={15} color={Colors.gray} >{'+' + (viewMoreData.length) + ' More'}</Label>
                </TouchableOpacity>
            )
        } else {
            return null
        }
    }

    return (
        <View style={{ flex: 1 }} >
            <View style={styles.profileDetailsView} >
                <View style={styles.profileView} >
                    {
                        (userObject.profilePic) ?
                            <BaseImageView
                                style={styles.profileView}
                                source={{
                                    uri: userObject.profilePic,
                                    priority: FastImage.priority.normal,
                                }}
                            />
                            :
                            <Image style={styles.profileView} source={images.imagePlaceholder.userPlaceholder} />
                    }
                </View>
                <Label semibold mt={8} color={Colors.lightBlack} fontSize={20}>{getUserName(userObject)}</Label>
                <Label medium color={Colors.lightBlackOpacity} mt={5} fontSize={14}>{userObject.email}</Label>
            </View>
            {
                (userType === USER_TYPE.DOCTOR) ?
                    <View style={styles.flatListView} >
                        <FlatList
                            contentContainerStyle={{ backgroundColor: Colors.white }}
                            showsVerticalScrollIndicator={true}
                            data={viewMoreData}
                            renderItem={renderItemCall}
                            keyExtractor={(item) => item._id.toString()}
                            showsVerticalScrollIndicator={false}
                            extraData={viewMoreData}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ListFooterComponent={footerFlatlistComponent}
                        />
                    </View>
                    : null
            }

            <View style={styles.borderView} />
            <ScrollView style={styles.center} showsVerticalScrollIndicator={false} >
                <View style={styles.detailsView} >

                    {
                        (userType === USER_TYPE.DOCTOR) ?
                            <View>
                                <Label semibold fontSize={14} color={Colors.gray} >{Strings.Degree}</Label>
                                <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue} >{(userObject.degree) ? userObject.degree : '-'}</Label>
                                <View style={styles.gapView} />
                            </View>
                            : null

                    }

                    <View>
                        <Label semibold fontSize={14} color={Colors.gray} >{Strings.State}</Label>
                        <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue} >{(userObject._stateId) ? userObject._stateId.stateName : '-'}</Label>
                    </View>

                    {
                        (userType === USER_TYPE.DOCTOR) ?
                            <View style={styles.gapView} >
                                <Label semibold fontSize={14} color={Colors.gray} >{Strings.Experience}</Label>
                                <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue} >{(userObject.experience) ? userObject.experience : '-'}</Label>
                            </View>
                            : null
                    }

                    {
                        (userType === USER_TYPE.DOCTOR) ?
                            <View style={styles.gapView} >
                                <Label semibold fontSize={14} color={Colors.gray} >{Strings.Location}</Label>
                                <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue} >{(userObject.location) ? userObject.location : '-'}</Label>
                            </View>
                            : null
                    }

                    {

                        <View style={styles.gapView} >
                            <Label semibold fontSize={14} color={Colors.gray} >{Strings.Zipcode}</Label>
                            <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue} >{(userObject.zipCode) ? userObject.zipCode : '-'}</Label>
                        </View>

                    }

                    {
                        (userType === USER_TYPE.DOCTOR) ?
                            <View style={styles.gapView} >
                                <Label semibold fontSize={14} color={Colors.gray} >{Strings.NPINumber}</Label>
                                <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue} >{(userObject.npiNumber) ? userObject.npiNumber : '-'}</Label>
                            </View>
                            : null
                    }

                    {
                        (userType === USER_TYPE.DOCTOR) ?
                            <View style={styles.gapView} >
                                <Label semibold fontSize={14} color={Colors.gray} >{Strings.Pecos}</Label>
                                <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue} >{(userObject.pecos == 1) ? Strings.Yes : Strings.No}</Label>
                            </View>
                            : null
                    }

                    {

                        <View style={styles.bottomGapView} >
                            <Label semibold fontSize={14} color={Colors.gray} >{Strings.Gender}</Label>
                            <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue} >{(userObject.gender) ? (userObject.gender == 'male') ? Strings.Male : Strings.Female : '-'}</Label>
                        </View>

                    }
                </View>
            </ScrollView>

        </View>
    )
}

const EditProfle = ({ editUserObject, showSlide, selectedExperienceNumber, completedEditing }) => {
    const dispatch = useDispatch()
    const authToken = useSelector((state) => state.authToken);
    const options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const [userType] = useState(editUserObject.userType)
    const [firstName, changefirstName] = useState(editUserObject.firstName)
    const [lastName, changelastName] = useState(editUserObject.lastName)
    const [email, changeEmail] = useState(editUserObject.email)
    const [degree, changeDegree] = useState(editUserObject.degree)
    const [experience, changeExperience] = useState(editUserObject.experience)
    const [npi, changeNpi] = useState(editUserObject.npiNumber)
    const [location, changeLocation] = useState(editUserObject.location)
    const [zipcode, changeZipcode] = useState(editUserObject.zipCode)
    const [pecos, changePecos] = useState(editUserObject.pecos)
    const [gender, changeGender] = useState(editUserObject.gender)
    const [stateValue, setStateValue] = useState(null);
    const [txtFirstname, setTxtFirstname] = useState('');
    const [txLastname, setTxLastname] = useState('');
    const [txtEmailError, setTxtEmailError] = useState('');
    const [txtState, setTxtStateValue] = useState('');
    const [txtZipcode, setTxtZipcode] = useState('');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [profilePic, setProfilePic] = useState(editUserObject.profilePic)


    const btnPickImageClick = () => {
        let buttonIOS = [
            'Camera',
            'Photo Library',
            'Cancel'
        ];

        let buttonAndroid = [
            'Camera',
            'Gallery'
        ];

        ActionSheet.showActionSheetWithOptions({
            options: IS_IOS ? buttonIOS : buttonAndroid,
            cancelButtonIndex: 2,
            tintColor: Colors.blueOpacity
        },
            openPickerForProfileImage);
    };

    const openPickerForProfileImage = (pickerType) => {
        switch (pickerType) {
            case 0: // Camera
                checkCameraPermission(granted => {
                    if (granted) {
                        ImagePicker.openCamera({
                            mediaType: "photo",
                            multiple: false,
                            compressImageQuality: 0.8,
                            compressImageMaxHeight: 720,
                            compressImageMaxWidth: 1080
                        }).then(images => {
                            setProfilePic((IS_IOS) ? images.sourceURL : images.path)
                            setSelectedPhoto(images)
                        }).catch((err) => {
                            console.log("Error :" + err.toString())
                        });
                    } else {
                        showPermissionAlert('Permission', Strings.cameraPermissionProfileRequired)
                    }
                });
                break;
            case 1: // Photo Library
                checkPhotoLibraryPermission((granted) => {
                    if (granted) {
                        ImagePicker.openPicker({
                            mediaType: "photo",
                            multiple: false,
                            compressImageQuality: 0.8,
                            compressImageMaxHeight: 720,
                            compressImageMaxWidth: 1080
                        }).then(images => {
                            setProfilePic((IS_IOS) ? images.sourceURL : images.path)
                            setSelectedPhoto(images)
                        }).catch((err) => {
                            console.log("Error :" + err.toString())
                        });
                    } else {
                        showPermissionAlert('Permission', Strings.photoPermissionProfileRequired)
                    }
                });
                break;
        }
    };

    function validateUserInfo() {
        let stateSelectionTest = ((stateValue).length > 0 ? null : Strings.stateSelection);
        let zipCodeTest = validation('zipcode', zipcode);
        let firstNameTest = validation('firstName', firstName);
        let lastNameTest = validation('lastName', lastName);
        let emailTest = validation('email', email);
        if (zipCodeTest !== null || stateSelectionTest !== null || firstNameTest !== null || lastNameTest !== null || emailTest !== null) {
            setTxtZipcode(zipCodeTest)
            setTxtStateValue(stateSelectionTest)
            setTxtFirstname(firstNameTest)
            setTxLastname(lastNameTest)
            setTxtEmailError(emailTest)
            return false
        }
        return true
    }

    function checkValidation() {
        if (validateUserInfo()) {
            updateUserProfile()
        }
    }


    async function updateUserProfile() {


        console.log("selectedExperienceNumber---->", npi);

        let statesId = stateValue.map((item) => { return item._id })

        dispatch(Action.showActivityLoader());

        let parameter = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            zipCode: zipcode.trim()
        };

        if (gender !== undefined) {
            parameter['gender'] = (gender == 'male') ? 'male' : 'female'
        }

        if (selectedPhoto && Object.keys(selectedPhoto).length > 0) {
            parameter['profilePic'] = {
                uri: (IS_IOS) ? selectedPhoto.sourceURL : selectedPhoto.path,
                type: 'image/jpeg',
                name: 'image.jpg'
            }
        }

        if (userType == USER_TYPE.PATIENT) {
            parameter['_stateId'] = statesId.join()
        } else if (userType == USER_TYPE.DOCTOR) {
            parameter["doctorsPracticeStates"] = statesId.join()
            if (npi !== undefined && npi !== null) {
                parameter['npiNumber'] = Number(npi.trim())
            }
            if (pecos !== undefined) {
                parameter['pecos'] = pecos
            }
            if (degree !== undefined && degree) {
                parameter['degree'] = degree.trim()
            }
            if (selectedExperienceNumber != null) {
                parameter['experience'] = selectedExperienceNumber
            }
            if (location !== undefined && location) {
                parameter['location'] = location.trim()
            }
        }

        new APIRequest.Builder()
            .setReqId(APITask.userEditProfile)
            .post()
            .reqURL(APIEndPoint.userEditProfile)
            .formParams(parameter)
            .response(onEditProfileResponse)
            .error(onEditProfileError)
            .build()
            .doRequest(true)
    }

    const onEditProfileResponse = (response, reqId) => {
        dispatch(Action.hideActivityLoader());
        dispatch(Action.storeUserInfo(response.data[0]));
        showAlert(response.message, () => {
            completedEditing()
        })
    };

    const onEditProfileError = (error, reqId) => {
        dispatch(Action.hideActivityLoader());
        showAlert(error.message)
        console.log('onStateError----->', error);
    };

    useEffect(() => {
        if (stateValue) {
            setTxtStateValue('')
        }
    }, [stateValue])

    return (
        <View style={styles.center}>
            <View style={styles.profileDetailsView} >
                <TouchableOpacity onPress={() => btnPickImageClick()} style={styles.profileView} >
                    {
                        (profilePic) ?
                            <BaseImageView
                                style={styles.profileView}
                                source={{
                                    uri: profilePic,
                                    priority: FastImage.priority.normal,
                                }}
                            />
                            :
                            <Image style={styles.profileView} source={images.imagePlaceholder.userPlaceholder} />
                    }
                    <View style={styles.profileIcon} >
                        <LinearGradient style={styles.linearIcon} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[Colors.lightBlue, Colors.blueOpacity]}>
                            <Entypo size={12} color={Colors.white} name={'edit'} />
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView nestedScrollEnabled={true} style={styles.center} showsVerticalScrollIndicator={false} >
                <View style={styles.detailsView} >
                    <View>
                        <Label semibold fontSize={14} color={Colors.gray} >{Strings.Firstname}</Label>
                        <TextField
                            onChangeText={text => changefirstName(text)}
                            color={Colors.blueOpacity} mt={10}
                            value={firstName}
                            activeBorderColor={Colors.blueOpacity}
                            onFocusTextInput={() => setTxtFirstname('')}
                            errorValue={txtFirstname}
                            inActiveBorderColor={Colors.blueOpacity} />
                    </View>
                    <View style={styles.gapView} >
                        <Label semibold fontSize={14} color={Colors.gray} >{Strings.Lastname}</Label>
                        <TextField
                            onChangeText={text => changelastName(text)}
                            color={Colors.blueOpacity} mt={10}
                            value={lastName}
                            onFocusTextInput={() => setTxLastname('')}
                            errorValue={txLastname}
                            activeBorderColor={Colors.blueOpacity}
                            inActiveBorderColor={Colors.blueOpacity} />
                    </View>
                    <View style={styles.gapView} >
                        <Label semibold fontSize={14} color={Colors.gray} >{Strings.EditEmail}</Label>
                        <TextField
                            onChangeText={text => changeEmail(text)}
                            color={Colors.blueOpacity}
                            mt={10} value={email}
                            activeBorderColor={Colors.blueOpacity}
                            inActiveBorderColor={Colors.blueOpacity}
                            onFocusTextInput={() => setTxtEmailError('')}
                            errorValue={txtEmailError}
                        />
                    </View>

                    {
                        (userType == USER_TYPE.DOCTOR) ?
                            <View style={styles.gapView} >
                                <Label semibold fontSize={14} color={Colors.gray} >{Strings.Degree}</Label>
                                <TextField onChangeText={text => changeDegree(text)} color={Colors.blueOpacity} mt={10} value={degree} activeBorderColor={Colors.blueOpacity} inActiveBorderColor={Colors.blueOpacity} />
                            </View>
                            :
                            null
                    }

                    {
                        (userType == USER_TYPE.DOCTOR) ?
                            <View style={styles.gapView} >
                                <Label semibold fontSize={14} color={Colors.gray} >{Strings.Experience}</Label>
                                <TouchableOpacity onPress={() => { showSlide(true) }} style={styles.scaleTouch}>
                                    <Label regular fontSize={17} color={Colors.darkBlue} >{(selectedExperienceNumber) ? selectedExperienceNumber + ' ' + Strings.Years : (editUserObject.experience) ? editUserObject.experience + ' ' + Strings.Years : ''}</Label>
                                </TouchableOpacity>
                            </View>
                            : null
                    }
                    {
                        (userType == USER_TYPE.DOCTOR) ?
                            <View style={styles.gapView} >
                                <Label semibold fontSize={14} color={Colors.gray} >{Strings.NPINumber}</Label>
                                <TextField keyboardType={'number-pad'} onChangeText={text => changeNpi(text)} color={Colors.blueOpacity} mt={10} value={npi} activeBorderColor={Colors.blueOpacity} inActiveBorderColor={Colors.blueOpacity} />
                            </View>
                            : null
                    }

                    <View style={styles.gapView} >
                        <Label semibold fontSize={14} color={Colors.gray} >{Strings.SelectState}</Label>
                        <CountryPicker multiSelect={userType == USER_TYPE.DOCTOR ? true : false} userStates={userType == USER_TYPE.DOCTOR ? (editUserObject.doctorsPracticeStates) ? editUserObject.doctorsPracticeStates : null : (editUserObject._stateId) ? [editUserObject._stateId] : null} onChangeItem={(selectedItem) => setStateValue(selectedItem)} />
                        {
                            (txtState !== '' && (stateValue).length == 0) ? <Label mt={2} medium fontSize={11} color={Colors.errorText}>
                                {txtState}
                            </Label> : null
                        }
                    </View>
                    {
                        (userType == USER_TYPE.DOCTOR) ?
                            <View style={styles.gapView} >
                                <Label semibold fontSize={14} color={Colors.gray} >{Strings.Location}</Label>
                                <TextField onChangeText={text => changeLocation(text)} color={Colors.blueOpacity} mt={10} value={location} activeBorderColor={Colors.blueOpacity} inActiveBorderColor={Colors.blueOpacity} />
                            </View>
                            : null
                    }

                    <View style={styles.gapView} >
                        <Label semibold fontSize={14} color={Colors.gray} >{Strings.Zipcode}</Label>
                        <TextField
                            onChangeText={text => changeZipcode(text)}
                            color={Colors.blueOpacity} mt={10}
                            value={zipcode}
                            activeBorderColor={Colors.blueOpacity}
                            inActiveBorderColor={Colors.blueOpacity}
                            onFocusTextInput={() => setTxtZipcode('')}
                            errorValue={txtZipcode}
                            keyboardType={'number-pad'}
                        />
                    </View>

                    {
                        (userType == USER_TYPE.DOCTOR) ?
                            <View style={styles.gapView} >
                                <Label semibold fontSize={14} color={Colors.gray} >{Strings.Pecos}</Label>
                                <View style={styles.optionsView} >
                                    <TouchableOpacity onPress={() => changePecos(1)} style={styles.optionsRowView} >
                                        <MaterialCommunityIcons size={28} color={Colors.blueOpacity} name={(pecos == 1) ? 'radiobox-marked' : 'radiobox-blank'} />
                                        <Label ml={15} fontSize={18} medium color={Colors.blueOpacity} >{Strings.Yes}</Label>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => changePecos(0)} style={[styles.optionsRowView, { marginLeft: 30 }]} >
                                        <MaterialCommunityIcons size={28} color={Colors.blueOpacity} name={(pecos == 0) ? 'radiobox-marked' : 'radiobox-blank'} />
                                        <Label ml={15} fontSize={18} medium color={Colors.blueOpacity} >{Strings.No}</Label>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            : null
                    }


                    <View style={styles.gapView} >
                        <Label semibold fontSize={14} color={Colors.gray} >{Strings.Gender}</Label>
                        <View style={styles.optionsView} >
                            <TouchableOpacity onPress={() => changeGender('male')} style={styles.optionsRowView} >
                                <MaterialCommunityIcons size={28} color={Colors.blueOpacity} name={(gender == 'male') ? 'radiobox-marked' : 'radiobox-blank'} />
                                <Label ml={15} fontSize={18} medium color={Colors.blueOpacity} >{Strings.Male}</Label>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeGender('female')} style={[styles.optionsRowView, { marginLeft: 20 }]} >
                                <MaterialCommunityIcons size={28} color={Colors.blueOpacity} name={(gender == 'female') ? 'radiobox-marked' : 'radiobox-blank'} />
                                <Label ml={15} fontSize={18} medium color={Colors.blueOpacity} >{Strings.Female}</Label>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.bottomGapView} >
                        <BaseButton
                            rightIcon={images.navigation.rightArrow}
                            disabled={false}
                            width={'100%'}
                            backgroundColor={Colors.blueOpacity}
                            title={Strings.Save}
                            mt={10}
                            onPress={() => checkValidation()}
                        />
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}

const MyProfile = ({ navigation }) => {

    const userData = useSelector((state) => state.userInfo);
    const [isEditable, changeEditMode] = useState(false)
    const [slideShow, setSlideShowFlag] = useState(false);
    const [selectedVisitedCount, setSelectedVistedCount] = useState(null)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                (!isEditable) ?
                    <TouchableOpacity onPress={() => changeEditMode(!isEditable)} >
                        <Label mr={13} medium fontSize={15} color={Colors.orange} >{Strings.EditProfle}</Label>
                    </TouchableOpacity>
                    : null
            )
        })
    }, [isEditable])

    return (
        <SafeAreaView style={styles.center}>
            {
                (userData) ? (isEditable) ?
                    <EditProfle
                        selectedExperienceNumber={selectedVisitedCount}
                        showSlide={(flag) => setSlideShowFlag(flag)}
                        editUserObject={JSON.parse(JSON.stringify(userData))}
                        completedEditing={() => navigation.goBack()} />
                    :
                    <DetailsView userObject={JSON.parse(JSON.stringify(userData))} />
                    :
                    <Loader />
            }
            {
                (slideShow) ?
                    <NumberSlider
                        title={Strings.SelectYearsOfExperience}
                        visible={slideShow} selectedNumber={(selectedExperienceNumber) => setSelectedVistedCount(selectedExperienceNumber)} showHideSlide={(flag) => setSlideShowFlag(flag)} />
                    : null
            }
        </SafeAreaView >
    );
};

export default MyProfile;