import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useAuth } from '../../context/AuthContext';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
    const { login } = useAuth();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        if (!phone || !password) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Silakan isi nomor ponsel dan password',
            });
            return;
        }

        // Mock Login
        login({ id: '1', name: 'Alvin', email: 'alvin@example.com' });
        navigation.navigate('Main');
        Toast.show({
            type: 'success',
            text1: 'Sukses',
            text2: 'Selamat datang kembali!',
        });
    };

    return (
        <View style={styles.container}>
            {/* Background Decorative Elements */}
            <View style={[styles.blob, styles.blob1]} />
            <View style={[styles.blob, styles.blob2]} />
            <View style={[styles.blob, styles.blob3]} />

            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.keyboardView}
                    >
                        {/* Top Illustration */}
                        <View style={styles.illustrationContainer}>
                            <Image
                                source={require('../../assets/images/login.png')}
                                style={styles.illustration}
                                resizeMode="contain"
                            />
                        </View>

                        {/* Heading */}
                        <Text style={styles.heading}>Mari Belanja</Text>

                        {/* Glassmorphic Card */}
                        <View style={styles.glassCard}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone"
                                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={[styles.input, { paddingRight: normalize(40) }]}
                                    placeholder="Password"
                                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Icon
                                        name={showPassword ? 'eye' : 'eye-off'}
                                        size={normalize(20)}
                                        color="rgba(255, 255, 255, 0.8)"
                                    />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.forgotBtn}>
                                <Text style={styles.forgotText}>Lupa Password?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                                <Text style={styles.loginBtnText}>Masuk</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Belum punya akun?{' '}
                                <Text
                                    style={styles.signUpLink}
                                    onPress={() => navigation.navigate('Register')}
                                >
                                    Daftar
                                </Text>
                            </Text>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E56C5', // Deep blue base
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    keyboardView: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
    },
    blob: {
        position: 'absolute',
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: width * 0.3,
        opacity: 0.6,
    },
    blob1: {
        backgroundColor: '#FF6B6B',
        top: height * 0.65,
        left: -width * 0.2,
    },
    blob2: {
        backgroundColor: '#B533FF',
        top: height * 0.55,
        right: -width * 0.1,
    },
    blob3: {
        backgroundColor: '#FFA500',
        top: height * 0.45,
        left: width * 0.1,
        width: width * 0.3,
        height: width * 0.3,
    },
    illustrationContainer: {
        width: '100%',
        height: height * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.lg,
    },
    illustration: {
        width: '100%',
        height: '100%',
    },
    heading: {
        fontSize: normalize(36),
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: SPACING.lg,
        textAlign: 'center',
    },
    glassCard: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: SIZES.radiusLg,
        padding: SPACING.xl,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        // Shadow for premium feel
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 10 },
        // shadowOpacity: 0.1,
        // shadowRadius: 20,
        // elevation: 5,
    },
    inputContainer: {
        width: '100%',
        height: normalize(52),
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: normalize(15),
        marginBottom: SPACING.md,
        justifyContent: 'center',
        paddingHorizontal: SPACING.md,
    },
    input: {
        fontSize: normalize(16),
        color: COLORS.white,
    },
    eyeIcon: {
        position: 'absolute',
        right: SPACING.md,
    },
    forgotBtn: {
        alignSelf: 'flex-end',
        marginBottom: SPACING.xl,
    },
    forgotText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: normalize(12),
    },
    loginBtn: {
        width: '60%',
        alignSelf: 'center',
        height: normalize(48),
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: normalize(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    loginBtnText: {
        color: COLORS.white,
        fontSize: normalize(18),
        fontWeight: 'bold',
    },
    footer: {
        marginTop: SPACING.xxl,
        marginBottom: SPACING.lg,
    },
    footerText: {
        color: COLORS.white,
        fontSize: normalize(14),
    },
    signUpLink: {
        fontWeight: 'bold',
        color: '#ffcc33', // User requested yellow/orange 'Daftar'
    },
});

export default LoginScreen;
