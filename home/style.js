import { StyleSheet } from 'react-native';
import Colors from '../../utility/Colors';
import { screenHeight, screenWidth } from '../../utility/Scale';

export default StyleSheet.create({
    center: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerView: {
        alignItems: 'center',
        marginHorizontal: 30
    },
    iconStyle: {
        height: screenHeight * 0.315,
        resizeMode: 'contain',
        marginTop: 30
    }
});