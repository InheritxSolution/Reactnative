import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';
import FastImage from 'react-native-fast-image';
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

// Custom Components
import { Label, TextField, BaseButton, CountryPicker, BaseImageView } from '../../../component/ui';

// Utility & API
import Action from '../../../redux/action';
import Colors from '../../../utility/Colors';
import Strings from '../../../utility/String';
import * as images from '../../../assets/images/map';
import { APITask, APIEndPoint, APIRequest } from '../../../api';
import { checkCameraPermission, checkPhotoLibraryPermission, showPermissionAlert, showAlert } from "../../../utility/Helper";
import { USER_TYPE } from "../../../utility/Constant";
import { validation } from '../../../utility/validation';
import { IS_IOS } from "../../../utility";
import styles from '../style';

/**
 * EditProfile Component
 * Handles user profile editing logic, image selection, and API updates.
 * Inheritx Solutions - Premium Portfolio Showcase
 */
const EditProfile = ({ editUserObject, showSlide, selectedExperienceNumber, completedEditing }) => {
    const dispatch = useDispatch();
    
    // State Management
    const [userType] = useState(editUserObject.userType);
    const [firstName, changefirstName] = useState(editUserObject.firstName);
    const [lastName, changelastName] = useState(editUserObject.lastName);
    const [email, changeEmail] = useState(editUserObject.email);
    const [degree, changeDegree] = useState(editUserObject.degree);
    const [npi, changeNpi] = useState(editUserObject.npiNumber);
    const [location, changeLocation] = useState(editUserObject.location);
    const [zipcode, changeZipcode] = useState(editUserObject.zipCode);
    const [pecos, changePecos] = useState(editUserObject.pecos);
    const [gender, changeGender] = useState(editUserObject.gender);
    const [stateValue, setStateValue] = useState(null);
    const [profilePic, setProfilePic] = useState(editUserObject.profilePic);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    // Error States
    const [txtFirstname, setTxtFirstname] = useState('');
    const [txLastname, setTxLastname] = useState('');
    const [txtEmailError, setTxtEmailError] = useState('');
    const [txtState, setTxtStateValue] = useState('');
    const [txtZipcode, setTxtZipcode] = useState('');

    const btnPickImageClick = () => {
        const buttonIOS = ['Camera', 'Photo Library', 'Cancel'];
        const buttonAndroid = ['Camera', 'Gallery'];

        ActionSheet.showActionSheetWithOptions({
            options: IS_IOS ? buttonIOS : buttonAndroid,
            cancelButtonIndex: 2,
            tintColor: Colors.blueOpacity
        }, openPickerForProfileImage);
    };

    const openPickerForProfileImage = (pickerType) => {
        const handleImageSelection = (image) => {
            setProfilePic(IS_IOS ? image.sourceURL : image.path);
            setSelectedPhoto(image);
        };

        const config = {
            mediaType: "photo",
            multiple: false,
            compressImageQuality: 0.8,
            compressImageMaxHeight: 720,
            compressImageMaxWidth: 1080
        };

        if (pickerType === 0) {
            checkCameraPermission(granted => {
                if (granted) {
                    ImagePicker.openCamera(config).then(handleImageSelection).catch(console.error);
                } else {
                    showPermissionAlert('Permission', Strings.cameraPermissionProfileRequired);
                }
            });
        } else if (pickerType === 1) {
            checkPhotoLibraryPermission(granted => {
                if (granted) {
                    ImagePicker.openPicker(config).then(handleImageSelection).catch(console.error);
                } else {
                    showPermissionAlert('Permission', Strings.photoPermissionProfileRequired);
                }
            });
        }
    };

    const validateUserInfo = () => {
        const stateSelectionError = (stateValue && stateValue.length > 0) ? null : Strings.stateSelection;
        const zipCodeError = validation('zipcode', zipcode);
        const firstNameError = validation('firstName', firstName);
        const lastNameError = validation('lastName', lastName);
        const emailError = validation('email', email);

        if (zipCodeError || stateSelectionError || firstNameError || lastNameError || emailError) {
            setTxtZipcode(zipCodeError);
            setTxtStateValue(stateSelectionError);
            setTxtFirstname(firstNameError);
            setTxLastname(lastNameError);
            setTxtEmailError(emailError);
            return false;
        }
        return true;
    };

    const updateUserProfile = async () => {
        if (!validateUserInfo()) return;

        dispatch(Action.showActivityLoader());

        const statesId = stateValue.map(item => item._id);
        const parameter = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            zipCode: zipcode.trim()
        };

        if (gender !== undefined) parameter.gender = gender;
        if (selectedPhoto) {
            parameter.profilePic = {
                uri: IS_IOS ? selectedPhoto.sourceURL : selectedPhoto.path,
                type: 'image/jpeg',
                name: 'image.jpg'
            };
        }

        if (userType === USER_TYPE.PATIENT) {
            parameter._stateId = statesId.join();
        } else if (userType === USER_TYPE.DOCTOR) {
            parameter.doctorsPracticeStates = statesId.join();
            if (npi) parameter.npiNumber = Number(npi.toString().trim());
            if (pecos !== undefined) parameter.pecos = pecos;
            if (degree) parameter.degree = degree.trim();
            if (selectedExperienceNumber != null) parameter.experience = selectedExperienceNumber;
            if (location) parameter.location = location.trim();
        }

        new APIRequest.Builder()
            .setReqId(APITask.userEditProfile)
            .post()
            .reqURL(APIEndPoint.userEditProfile)
            .formParams(parameter)
            .response((response) => {
                dispatch(Action.hideActivityLoader());
                dispatch(Action.storeUserInfo(response.data[0]));
                showAlert(response.message, completedEditing);
            })
            .error((error) => {
                dispatch(Action.hideActivityLoader());
                showAlert(error.message);
            })
            .build()
            .doRequest(true);
    };

    useEffect(() => {
        if (stateValue) setTxtStateValue('');
    }, [stateValue]);

    return (
        <View style={styles.center}>
            <View style={styles.profileDetailsView}>
                <TouchableOpacity onPress={btnPickImageClick} style={styles.profileView}>
                    {profilePic ? (
                        <BaseImageView
                            style={styles.profileView}
                            source={{ uri: profilePic, priority: FastImage.priority.normal }}
                        />
                    ) : (
                        <Image style={styles.profileView} source={images.imagePlaceholder.userPlaceholder} />
                    )}
                    <View style={styles.profileIcon}>
                        <LinearGradient style={styles.linearIcon} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[Colors.lightBlue, Colors.blueOpacity]}>
                            <Entypo size={12} color={Colors.white} name={'edit'} />
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
            </View>
            
            <ScrollView nestedScrollEnabled={true} style={styles.center} showsVerticalScrollIndicator={false}>
                <View style={styles.detailsView}>
                    <FormField label={Strings.Firstname} value={firstName} onChange={changefirstName} error={txtFirstname} onFocus={() => setTxtFirstname('')} />
                    <FormField label={Strings.Lastname} value={lastName} onChange={changelastName} error={txLastname} onFocus={() => setTxLastname('')} />
                    <FormField label={Strings.EditEmail} value={email} onChange={changeEmail} error={txtEmailError} onFocus={() => setTxtEmailError('')} />

                    {userType === USER_TYPE.DOCTOR && (
                        <>
                            <FormField label={Strings.Degree} value={degree} onChange={changeDegree} />
                            <View style={styles.gapView}>
                                <Label semibold fontSize={14} color={Colors.gray}>{Strings.Experience}</Label>
                                <TouchableOpacity onPress={() => showSlide(true)} style={styles.scaleTouch}>
                                    <Label regular fontSize={17} color={Colors.darkBlue}>
                                        {(selectedExperienceNumber || editUserObject.experience || '0') + ' ' + Strings.Years}
                                    </Label>
                                </TouchableOpacity>
                            </View>
                            <FormField label={Strings.NPINumber} value={npi} onChange={changeNpi} keyboardType="number-pad" />
                        </>
                    )}

                    <View style={styles.gapView}>
                        <Label semibold fontSize={14} color={Colors.gray}>{Strings.SelectState}</Label>
                        <CountryPicker 
                            multiSelect={userType === USER_TYPE.DOCTOR} 
                            userStates={userType === USER_TYPE.DOCTOR ? editUserObject.doctorsPracticeStates : [editUserObject._stateId]} 
                            onChangeItem={setStateValue} 
                        />
                        {txtState !== '' && (!stateValue || stateValue.length === 0) && (
                            <Label mt={2} medium fontSize={11} color={Colors.errorText}>{txtState}</Label>
                        )}
                    </View>

                    {userType === USER_TYPE.DOCTOR && <FormField label={Strings.Location} value={location} onChange={changeLocation} />}
                    
                    <FormField label={Strings.Zipcode} value={zipcode} onChange={changeZipcode} error={txtZipcode} onFocus={() => setTxtZipcode('')} keyboardType="number-pad" />

                    {userType === USER_TYPE.DOCTOR && (
                        <RadioField label={Strings.Pecos} value={pecos} options={[{ label: Strings.Yes, value: 1 }, { label: Strings.No, value: 0 }]} onSelect={changePecos} />
                    )}

                    <RadioField label={Strings.Gender} value={gender} options={[{ label: Strings.Male, value: 'male' }, { label: Strings.Female, value: 'female' }]} onSelect={changeGender} />

                    <View style={styles.bottomGapView}>
                        <BaseButton
                            rightIcon={images.navigation.rightArrow}
                            width={'100%'}
                            backgroundColor={Colors.blueOpacity}
                            title={Strings.Save}
                            mt={10}
                            onPress={updateUserProfile}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

// Sub-components for cleaner code
const FormField = ({ label, value, onChange, error, onFocus, keyboardType }) => (
    <View style={styles.gapView}>
        <Label semibold fontSize={14} color={Colors.gray}>{label}</Label>
        <TextField
            onChangeText={onChange}
            color={Colors.blueOpacity}
            mt={10}
            value={value}
            activeBorderColor={Colors.blueOpacity}
            inActiveBorderColor={Colors.blueOpacity}
            onFocusTextInput={onFocus}
            errorValue={error}
            keyboardType={keyboardType}
        />
    </View>
);

const RadioField = ({ label, value, options, onSelect }) => (
    <View style={styles.gapView}>
        <Label semibold fontSize={14} color={Colors.gray}>{label}</Label>
        <View style={styles.optionsView}>
            {options.map((opt, idx) => (
                <TouchableOpacity key={opt.value} onPress={() => onSelect(opt.value)} style={[styles.optionsRowView, idx > 0 && { marginLeft: 20 }]}>
                    <MaterialCommunityIcons size={28} color={Colors.blueOpacity} name={value === opt.value ? 'radiobox-marked' : 'radiobox-blank'} />
                    <Label ml={15} fontSize={18} medium color={Colors.blueOpacity}>{opt.label}</Label>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

export default EditProfile;
