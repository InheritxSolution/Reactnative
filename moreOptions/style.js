import { StyleSheet } from 'react-native';
import Colors from '../../utility/Colors';
import { horizontalScale, screenHeight, screenWidth, verticalScale } from '../../utility/Scale';

export default StyleSheet.create({
    itemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(15)
    },
    center: {
        flex: 1,
        backgroundColor: Colors.white
    },
    flatlistView: {
        paddingHorizontal: 30,
        flex: 1,
        marginTop: 10
    },
    itemView: {
        height: horizontalScale(50),
        width: horizontalScale(50),
        borderRadius: 3,
        backgroundColor: Colors.tabBarBlue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    arrowIcon: {
        height: 10,
        width: 10,
        resizeMode: 'center'
    }
});