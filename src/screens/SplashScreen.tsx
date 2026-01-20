import React, { useEffect } from 'react';
import { View, Image, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { COLORS } from '../utils/theme';
import normalize from 'react-native-normalize';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }: any) => {
    const { isLoggedIn, isLoading } = useAuth();

    useEffect(() => {
        if (isLoading) return;

        const timer = setTimeout(() => {
            if (isLoggedIn) {
                navigation.replace('Main');
            } else {
                navigation.replace('Onboarding');
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation, isLoggedIn, isLoading]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/images/logo_bg_white.jpg')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: width * 0.6,
        height: width * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
});

export default SplashScreen;
