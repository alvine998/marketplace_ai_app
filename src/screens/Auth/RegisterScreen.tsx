import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useAuth } from '../../context/AuthContext';

const RegisterScreen = ({ navigation }: any) => {
    const { login } = useAuth();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);

    const handleRegister = () => {
        if (!fullName || !email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Silakan lengkapi semua data',
            });
            return;
        }
        if (!isAgreed) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Kamu harus menyetujui syarat dan ketentuan',
            });
            return;
        }

        // Mock Registration
        login({ id: Date.now().toString(), name: fullName, email, avatar: 'https://i.pravatar.cc/150?u=' + email });
        navigation.navigate('MainTabs');
        Toast.show({
            type: 'success',
            text1: 'Sukses',
            text2: 'Akunmu berhasil dibuat!',
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Daftar</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <Text style={styles.welcomeText}>Buat Akun Marketplace</Text>
                <Text style={styles.subText}>Daftar sekarang dan nikmati kemudahan belanja</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nama Lengkap</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: John Doe"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email atau Nomor Ponsel</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: john@email.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Minimal 6 karakter"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setIsAgreed(!isAgreed)}
                    activeOpacity={0.7}
                >
                    <View style={[styles.checkbox, isAgreed && styles.checkboxActive]}>
                        {isAgreed && <Icon name="check" size={12} color={COLORS.white} />}
                    </View>
                    <Text style={styles.checkboxLabel}>
                        Saya menyetujui <Text style={styles.link} onPress={() => navigation.navigate('Terms')}>Syarat & Ketentuan</Text> serta <Text style={styles.link} onPress={() => navigation.navigate('PrivacyPolicy')}>Kebijakan Privasi</Text> Marketplace.
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
                    <Text style={styles.registerBtnText}>Daftar</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Sudah punya akun? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Masuk</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        height: normalize(56),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    content: {
        padding: SPACING.lg,
    },
    welcomeText: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 8,
    },
    subText: {
        fontSize: normalize(14),
        color: COLORS.grey,
        marginBottom: SPACING.xl,
    },
    inputGroup: {
        marginBottom: SPACING.md,
    },
    label: {
        fontSize: normalize(12),
        fontWeight: 'bold',
        color: COLORS.grey,
        marginBottom: 4,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        height: normalize(40),
        fontSize: normalize(16),
        color: COLORS.black,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: SPACING.lg,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        marginTop: 2,
    },
    checkboxActive: {
        backgroundColor: COLORS.primary,
    },
    checkboxLabel: {
        flex: 1,
        fontSize: normalize(12),
        color: COLORS.grey,
        lineHeight: 18,
    },
    link: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    registerBtn: {
        backgroundColor: COLORS.primary,
        height: normalize(48),
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.sm,
    },
    registerBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(16),
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SPACING.xl,
    },
    footerText: {
        fontSize: normalize(14),
        color: COLORS.grey,
    },
    loginLink: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.primary,
    },
});

export default RegisterScreen;
