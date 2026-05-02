import React, { useState, useCallback } from "react";
import { View, ScrollView, TouchableOpacity, FlatList, Image } from "react-native";
import FastImage from 'react-native-fast-image';

// Custom components (Relative to myProfile/components/)
import { Label, BaseImageView } from '../../../component/ui';

// Utility & Constants
import Colors from '../../../utility/Colors';
import Strings from '../../../utility/String';
import * as images from '../../../assets/images/map';
import { getUserName } from "../../../utility/Helper";
import { USER_TYPE } from "../../../utility/Constant";
import styles from '../style';

/**
 * DetailsView Component
 * Displays user profile information in a read-only format.
 * Inheritx Solutions - Premium Portfolio Showcase
 */
const DetailsView = ({ userObject }) => {
    const [userType] = useState(userObject.userType);
    const [userSelectedStates] = useState(userObject.doctorsPracticeStates ? userObject.doctorsPracticeStates : []);
    const [isViewMore, changeViewMore] = useState(userSelectedStates.length > 3 ? false : true);
    const [viewMoreData, setViewMoreData] = useState(userSelectedStates.splice(0, 3));

    const renderItemCall = useCallback(({ item, index }) => renderItem({ item, index }));

    const StatesItem = ({ item }) => (
        <View style={styles.statesItem}>
            <Label semibold fontSize={16} color={Colors.opacityBlue}>{item.stateName}</Label>
        </View>
    );

    const renderItem = ({ item, index }) => <StatesItem item={item} />;

    async function setStatesData() {
        await setViewMoreData([...viewMoreData, ...userObject.doctorsPracticeStates]);
        await changeViewMore(true);
    }

    const footerFlatlistComponent = () => {
        if (!isViewMore) {
            return (
                <TouchableOpacity onPress={() => setStatesData()} style={styles.moreItem}>
                    <Label semibold fontSize={15} color={Colors.gray}>{'+' + (viewMoreData.length) + ' More'}</Label>
                </TouchableOpacity>
            );
        }
        return null;
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.profileDetailsView}>
                <View style={styles.profileView}>
                    {userObject.profilePic ? (
                        <BaseImageView
                            style={styles.profileView}
                            source={{
                                uri: userObject.profilePic,
                                priority: FastImage.priority.normal,
                            }}
                        />
                    ) : (
                        <Image style={styles.profileView} source={images.imagePlaceholder.userPlaceholder} />
                    )}
                </View>
                <Label semibold mt={8} color={Colors.lightBlack} fontSize={20}>{getUserName(userObject)}</Label>
                <Label medium color={Colors.lightBlackOpacity} mt={5} fontSize={14}>{userObject.email}</Label>
            </View>
            
            {userType === USER_TYPE.DOCTOR && (
                <View style={styles.flatListView}>
                    <FlatList
                        contentContainerStyle={{ backgroundColor: Colors.white }}
                        data={viewMoreData}
                        renderItem={renderItemCall}
                        keyExtractor={(item) => item._id.toString()}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        ListFooterComponent={footerFlatlistComponent}
                    />
                </View>
            )}

            <View style={styles.borderView} />
            
            <ScrollView style={styles.center} showsVerticalScrollIndicator={false}>
                <View style={styles.detailsView}>
                    {userType === USER_TYPE.DOCTOR && (
                        <View>
                            <Label semibold fontSize={14} color={Colors.gray}>{Strings.Degree}</Label>
                            <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue}>{(userObject.degree) ? userObject.degree : '-'}</Label>
                            <div style={styles.gapView} />
                        </View>
                    )}

                    <View>
                        <Label semibold fontSize={14} color={Colors.gray}>{Strings.State}</Label>
                        <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue}>{(userObject._stateId) ? userObject._stateId.stateName : '-'}</Label>
                    </View>

                    {userType === USER_TYPE.DOCTOR && (
                        <>
                            <View style={styles.gapView}>
                                <Label semibold fontSize={14} color={Colors.gray}>{Strings.Experience}</Label>
                                <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue}>{(userObject.experience) ? userObject.experience : '-'}</Label>
                            </View>
                            <View style={styles.gapView}>
                                <Label semibold fontSize={14} color={Colors.gray}>{Strings.Location}</Label>
                                <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue}>{(userObject.location) ? userObject.location : '-'}</Label>
                            </View>
                        </>
                    )}

                    <View style={styles.gapView}>
                        <Label semibold fontSize={14} color={Colors.gray}>{Strings.Zipcode}</Label>
                        <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue}>{(userObject.zipCode) ? userObject.zipCode : '-'}</Label>
                    </View>

                    {userType === USER_TYPE.DOCTOR && (
                        <>
                            <View style={styles.gapView}>
                                <Label semibold fontSize={14} color={Colors.gray}>{Strings.NPINumber}</Label>
                                <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue}>{(userObject.npiNumber) ? userObject.npiNumber : '-'}</Label>
                            </View>
                            <View style={styles.gapView}>
                                <Label semibold fontSize={14} color={Colors.gray}>{Strings.Pecos}</Label>
                                <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue}>{(userObject.pecos == 1) ? Strings.Yes : Strings.No}</Label>
                            </View>
                        </>
                    )}

                    <View style={styles.bottomGapView}>
                        <Label semibold fontSize={14} color={Colors.gray}>{Strings.Gender}</Label>
                        <Label semibold mt={5} fontSize={18} color={Colors.opacityBlue}>
                            {(userObject.gender) ? (userObject.gender == 'male' ? Strings.Male : Strings.Female) : '-'}
                        </Label>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default DetailsView;
