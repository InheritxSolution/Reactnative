import React, { useState, useEffect } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { useSelector } from 'react-redux';

// Custom Components
import { Label, NumberSlider, Loader } from '../component/ui';
import DetailsView from './components/DetailsView';
import EditProfile from './components/EditProfile';

// Utility
import Colors from '../utility/Colors';
import Strings from '../utility/String';
import styles from './style';

/**
 * MyProfile Screen
 * The main entry point for the user profile feature.
 * Inheritx Solutions - Premium Portfolio Showcase
 */
const MyProfile = ({ navigation }) => {
    const userData = useSelector((state) => state.userInfo);
    
    // UI State
    const [isEditable, setEditMode] = useState(false);
    const [slideShow, setSlideShowFlag] = useState(false);
    const [selectedVisitedCount, setSelectedVistedCount] = useState(null);

    // Set Navigation Header Options
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                !isEditable ? (
                    <TouchableOpacity onPress={() => setEditMode(true)}>
                        <Label mr={13} medium fontSize={15} color={Colors.orange}>{Strings.EditProfle}</Label>
                    </TouchableOpacity>
                ) : null
            )
        });
    }, [isEditable, navigation]);

    // Handle profile rendering logic
    const renderProfileContent = () => {
        if (!userData) return <Loader />;

        return isEditable ? (
            <EditProfile
                selectedExperienceNumber={selectedVisitedCount}
                showSlide={setSlideShowFlag}
                editUserObject={JSON.parse(JSON.stringify(userData))}
                completedEditing={() => {
                    setEditMode(false);
                    navigation.goBack();
                }} 
            />
        ) : (
            <DetailsView userObject={JSON.parse(JSON.stringify(userData))} />
        );
    };

    return (
        <SafeAreaView style={styles.center}>
            {renderProfileContent()}
            
            {slideShow && (
                <NumberSlider
                    title={Strings.SelectYearsOfExperience}
                    visible={slideShow} 
                    selectedNumber={setSelectedVistedCount} 
                    showHideSlide={setSlideShowFlag} 
                />
            )}
        </SafeAreaView>
    );
};

export default MyProfile;