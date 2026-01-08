import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }: any) => {
    const { login } = useAuth();
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = () => {
        if (!fullName || !phone || !password) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Silakan lengkapi data wajib',
            });
            return;
        }

        // Mock Registration
        login({ id: Date.now().toString(), name: fullName, phone });
        navigation.navigate('Main');
        Toast.show({
            type: 'success',
            text1: 'Sukses',
            text2: 'Akunmu berhasil dibuat!',
        });
    };

    return (
        <View style={styles.container}>
            {/* 2-Layer Header */}
            <View style={styles.headerContainer}>
                <View style={styles.headerLayerAccent} />
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.headerTop}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Icon name="arrow-left" size={normalize(24)} color={COLORS.white} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Daftar</Text>
                        <View style={{ width: normalize(24) }} />
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    {/* Avatar Placeholder */}
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarCircle}>
                            <Icon name="user" size={normalize(60)} color="#EFEFEF" />
                        </View>
                    </View>

                    {/* Form Fields */}
                    <View style={styles.form}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nama lengkap"
                                placeholderTextColor="#A0A0A0"
                                value={fullName}
                                onChangeText={setFullName}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="No. Telphone"
                                placeholderTextColor="#A0A0A0"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Jenis Kelamin"
                                placeholderTextColor="#A0A0A0"
                                value={gender}
                                onChangeText={setGender}
                            />
                        </View>

                        <View style={[styles.inputWrapper, { height: normalize(100), alignItems: 'flex-start', paddingTop: SPACING.sm }]}>
                            <TextInput
                                style={[styles.input, { textAlignVertical: 'top', height: '100%' }]}
                                placeholder="Alamat"
                                placeholderTextColor="#A0A0A0"
                                value={address}
                                onChangeText={setAddress}
                                multiline
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={[styles.input, { paddingRight: normalize(40) }]}
                                placeholder="Password"
                                placeholderTextColor="#A0A0A0"
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
                                    color="#B3B3B3"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Terms & Conditions */}
                        <Text style={styles.termsText}>
                            Dengan mengklik daftar, anda menyetujui{' '}
                            <Text style={styles.blueLink} onPress={() => navigation.navigate('Terms')}>Ketentuan</Text>,{' '}
                            <Text style={styles.blueLink} onPress={() => navigation.navigate('PrivacyPolicy')}>Kebijakan Data</Text> dan{' '}
                            <Text style={styles.blueLink} onPress={() => navigation.navigate('PrivacyPolicy')}>Kebijakan Cookie</Text> kami.
                            Anda akan Menerima Notifikasi SMS dari Vibes dan dapat menolaknya kapan saja
                        </Text>

                        {/* Submit Button */}
                        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
                            <Text style={styles.registerBtnText}>Daftar</Text>
                        </TouchableOpacity>

                        <Text style={styles.footerText}>Daftar untuk menggunakan aplikasi</Text>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headerContainer: {
        backgroundColor: '#1E56C5',
        height: normalize(100),
        justifyContent: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
    },
    headerLayerBase: {
        position: 'absolute',
        top: -normalize(40),
        left: -normalize(20),
        right: -normalize(20),
        height: normalize(100),
        backgroundColor: '#154AB4',
        borderBottomLeftRadius: width * 1,
        borderBottomRightRadius: width * 1,
        transform: [{ scaleX: 1.2 }],
    },
    headerLayerAccent: {
        position: 'absolute',
        top: -normalize(60),
        left: -normalize(10),
        right: -normalize(10),
        height: normalize(120),
        backgroundColor: '#2A67E2',
        // borderBottomLeftRadius: width * 0.4,
        borderBottomRightRadius: width * 0.8,
        opacity: 0.8,
        transform: [{ scaleX: 1.1 }],
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        marginTop: SPACING.sm,
    },
    backBtn: {
        padding: SPACING.xs,
    },
    headerTitle: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: COLORS.white,
    },
    wave: {
        position: 'absolute',
        bottom: -normalize(40),
        left: 0,
        right: 0,
        height: normalize(80),
        backgroundColor: '#1E56C5',
        borderBottomLeftRadius: width * 0.5,
        borderBottomRightRadius: width * 0.5,
        transform: [{ scaleX: 1.5 }],
    },
    scrollContent: {
        flexGrow: 1,
        paddingTop: normalize(20),
    },
    keyboardView: {
        flex: 1,
        alignItems: 'center',
    },
    avatarContainer: {
        marginVertical: SPACING.sm,
    },
    avatarCircle: {
        width: normalize(120),
        height: normalize(120),
        borderRadius: normalize(60),
        backgroundColor: '#F5F7FA',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EFEFEF',
    },
    form: {
        width: '100%',
        paddingHorizontal: SPACING.xl,
        paddingBottom: SPACING.xl,
    },
    inputWrapper: {
        width: '100%',
        backgroundColor: '#F7F8FA',
        borderRadius: normalize(12),
        height: normalize(52),
        justifyContent: 'center',
        paddingHorizontal: SPACING.md,
        marginVertical: SPACING.sm,
    },
    input: {
        fontSize: normalize(16),
        color: COLORS.black,
    },
    eyeIcon: {
        position: 'absolute',
        right: SPACING.md,
    },
    termsText: {
        fontSize: normalize(12),
        color: COLORS.black,
        textAlign: 'left',
        marginTop: SPACING.md,
        lineHeight: normalize(18),
    },
    blueLink: {
        color: '#1E56C5',
        fontWeight: '600',
    },
    registerBtn: {
        backgroundColor: '#154AB4',
        height: normalize(52),
        borderRadius: normalize(12),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.xl,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    registerBtnText: {
        color: COLORS.white,
        fontSize: normalize(20),
        fontWeight: 'bold',
    },
    footerText: {
        fontSize: normalize(14),
        color: COLORS.black,
        textAlign: 'center',
        marginTop: SPACING.md,
    },
});

export default RegisterScreen;
