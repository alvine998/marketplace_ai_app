import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useAuth } from '../../context/AuthContext';

const LoginScreen = ({ navigation }: any) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Silakan isi email dan password',
            });
            return;
        }

        // Mock Login
        login({ id: '1', name: 'John Doe', email });
        navigation.navigate('MainTabs');
        Toast.show({
            type: 'success',
            text1: 'Sukses',
            text2: 'Selamat datang kembali!',
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="x" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Masuk</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerLink}>Daftar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.welcomeText}>Selamat Datang di Marketplace</Text>
                <Text style={styles.subText}>Masukkan email atau nomor ponselmu untuk masuk</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email atau Nomor Ponsel</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: anton@email.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Masukkan password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.forgotPass}>
                    <Text style={styles.forgotPassText}>Lupa password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                    <Text style={styles.loginBtnText}>Masuk</Text>
                </TouchableOpacity>

                <View style={styles.dividerRow}>
                    <View style={styles.line} />
                    <Text style={styles.dividerText}>atau masuk dengan</Text>
                    <View style={styles.line} />
                </View>

                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialBtn}>
                        <Icon name="mail" size={normalize(20)} color={COLORS.grey} />
                        <Text style={styles.socialBtnText}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn}>
                        <Icon name="facebook" size={normalize(20)} color="#1877F2" />
                        <Text style={styles.socialBtnText}>Facebook</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    registerLink: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.primary,
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
    forgotPass: {
        alignSelf: 'flex-end',
        marginBottom: SPACING.xl,
    },
    forgotPassText: {
        color: COLORS.primary,
        fontSize: normalize(13),
    },
    loginBtn: {
        backgroundColor: COLORS.primary,
        height: normalize(48),
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(16),
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SPACING.xl,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.border,
    },
    dividerText: {
        paddingHorizontal: SPACING.md,
        color: COLORS.grey,
        fontSize: normalize(12),
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    socialBtn: {
        flex: 0.48,
        height: normalize(44),
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialBtnText: {
        marginLeft: 8,
        fontSize: normalize(14),
        color: COLORS.black,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
