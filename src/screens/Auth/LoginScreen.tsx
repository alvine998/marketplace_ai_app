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
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useAuth } from '../../context/AuthContext';
import { login as loginService } from '../../services/authService';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
    const { login, isLoggedIn } = useAuth();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoadingLocal, setIsLoadingLocal] = useState(false);

    React.useEffect(() => {
        if (isLoggedIn) {
            navigation.replace('Main');
        }
    }, [isLoggedIn, navigation]);

    const handleLogin = async () => {
        if (!phone || !password) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Silakan isi nomor ponsel dan password',
            });
            return;
        }

        setIsLoadingLocal(true);
        try {
            const response = await loginService({ phone, password });

            if (response.token && response.user) {
                login(response.user, response.token);
                navigation.replace('Main');
                Toast.show({
                    type: 'success',
                    text1: 'Sukses',
                    text2: response.message || 'Selamat datang kembali!',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Gagal',
                    text2: response.message || 'Login gagal, periksa kredensial anda',
                });
            }
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Terjadi kesalahan saat masuk',
            });
        } finally {
            setIsLoadingLocal(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Background Decorative Elements */}
            <View style={[styles.blob, styles.blob1]} />
            <View style={[styles.blob, styles.blob2]} />
            <View style={[styles.blob, styles.blob3]} />

            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.innerContainer}>
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
                                <View style={styles.cardContent}>
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

                                    <TouchableOpacity
                                        style={[styles.loginBtn, isLoadingLocal && { opacity: 0.7 }]}
                                        onPress={handleLogin}
                                        disabled={isLoadingLocal}
                                    >
                                        <Text style={styles.loginBtnText}>
                                            {isLoadingLocal ? 'Memuat...' : 'Masuk'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
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
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#154AB4', // Deeper, more vibrant blue
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
        paddingBottom: SPACING.xl,
    },
    blob: {
        position: 'absolute',
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        opacity: 0.4,
    },
    blob1: {
        backgroundColor: '#B533FF',
        top: height * 0.7,
        left: -width * 0.3,
    },
    blob2: {
        backgroundColor: '#00D1FF',
        top: height * 0.4,
        right: -width * 0.3,
    },
    blob3: {
        backgroundColor: '#FF6B6B',
        top: height * 0.1,
        left: -width * 0.1,
        width: width * 0.5,
        height: width * 0.5,
        borderRadius: width * 0.25,
    },
    illustrationContainer: {
        width: '100%',
        height: height * 0.3, // Reduced from 0.4 to give more space
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.xl,
    },
    illustration: {
        width: '100%',
        height: '100%',
    },
    heading: {
        fontSize: normalize(32), // Slightly reduced from 36
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: SPACING.lg,
        textAlign: 'center',
    },
    glassCard: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: SIZES.radiusLg,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
    },
    cardContent: {
        padding: SPACING.xl,
    },
    // Shadow for premium feel
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.1,
    // shadowRadius: 20,
    // elevation: 5,
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
