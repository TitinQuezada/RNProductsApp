import { StyleSheet, Dimensions } from 'react-native';
import { colors } from "../../theme/Colors";
const { width, height } = Dimensions.get('window');

export const LoginScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        backgroundColor: colors.primary,
        position: 'absolute',
        top: -height * 0.6,
        width: width * 2,
        height: height * 2,
        transform: [
            {
                rotate: '-70deg'
            }
        ]
    },
    scrollView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        marginTop: 50,
        resizeMode: 'stretch',
        width: 130,
        height: 120
    },
    content: {
        width: '90%'
    },
    title: {
        textAlign: 'center'
    },
    hyperLink: {
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center'
    }
});