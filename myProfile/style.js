import { StyleSheet } from 'react-native';
import Colors from '../../utility/Colors';
import { horizontalScale, screenHeight, screenWidth, verticalScale } from '../../utility/Scale';

export default StyleSheet.create({
    center: {
        flex: 1,
        backgroundColor: Colors.white
    },
    profileDetailsView: {
        paddingTop: 35,
        paddingBottom: 15,
        alignItems: 'center',
    },
    profileView: {
        height: horizontalScale(100),
        width: verticalScale(100),
        borderRadius: 3,
        alignSelf: 'center'
    },
    statesItem: {
        paddingHorizontal: 6,
        paddingVertical: 7,
        justifyContent: 'center',
        marginHorizontal: 5,
        backgroundColor: Colors.dashBlue,
        borderRadius: 2
    },
    moreItem: {
        paddingHorizontal: 7,
        paddingVertical: 7,
        justifyContent: 'center',
        marginHorizontal: 5,
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderColor: Colors.gray,
        borderRadius: 2
    },
    flatListView: {
        marginTop: 10,
        marginHorizontal: 10,
    },
    borderView: {
        borderWidth: 0.5,
        borderTopWidth: 0,
        borderColor: Colors.lightGray,
        marginTop: 25,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
    detailsView: {
        paddingHorizontal: 25,
        paddingTop: 25
    },
    gapView: {
        marginTop: 15
    },
    bottomGapView: {
        marginTop: 15,
        marginBottom: 30
    },
    optionsView: {
        flexDirection: 'row',
        marginTop: 5
    },
    optionsRowView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileIcon: {
        height: verticalScale(25),
        width: verticalScale(25),
        borderRadius: verticalScale(25) / 2,
        position: 'absolute',
        borderWidth: 0,
        borderColor: Colors.white,
        justifyContent: 'center',
        bottom: -10,
        alignSelf: 'flex-end',
        right: -10,
        alignItems: 'center',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.2,
    },
    linearIcon: {
        height: verticalScale(18),
        width: verticalScale(18),
        borderRadius: verticalScale(18) / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scaleTouch: {
        height: verticalScale(40),
        width: '100%',
        borderWidth: 1.5,
        borderColor: Colors.blueOpacity,
        borderRadius: 3,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10
    },
});