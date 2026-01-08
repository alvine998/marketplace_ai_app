import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';

const ProfileScreen = ({ navigation }: any) => {
    const { user, logout, isLoggedIn } = useAuth();
    const { t } = useTranslation();

    const renderMenuItem = (icon: string, title: string, onPress: () => void, color = COLORS.black) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuLeft}>
                <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
                    <Icon name={icon} size={normalize(20)} color={color} />
                </View>
                <Text style={[styles.menuText, { color }]}>{title}</Text>
            </View>
            <Icon name="chevron-right" size={normalize(20)} color={COLORS.grey} />
        </TouchableOpacity>
    );

    if (!isLoggedIn) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.notLoggedInContainer}>
                    <Icon name="user" size={normalize(80)} color={COLORS.lightGrey} />
                    <Text style={styles.notLoggedInTitle}>Belum Masuk</Text>
                    <Text style={styles.notLoggedInSubtitle}>Masuk untuk melihat profil dan pesananmu</Text>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.loginBtnText}>Masuk / Daftar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <View style={styles.profileInfo}>
                            <View style={styles.avatarContainer}>
                                {user?.avatar ? (
                                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                                ) : (
                                    <View style={styles.avatarPlaceholder}>
                                        <Icon name="user" size={normalize(40)} color={COLORS.white} />
                                    </View>
                                )}
                                <TouchableOpacity style={styles.editAvatarBtn}>
                                    <Icon name="camera" size={normalize(14)} color={COLORS.white} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.textInfo}>
                                <Text style={styles.userName}>{user?.name || 'User'}</Text>
                                <Text style={styles.userEmail}>{user?.email || user?.phone || 'No contact info'}</Text>
                                <View style={styles.badge}>
                                    <Icon name="shield" size={normalize(12)} color={COLORS.primary} />
                                    <Text style={styles.badgeText}>Verified Member</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Aktivitas Saya</Text>
                    <View style={styles.menuBox}>
                        {renderMenuItem('shopping-bag', 'Pesanan Saya', () => navigation.navigate('Transactions'), COLORS.primary)}
                        {renderMenuItem('heart', 'Wishlist', () => navigation.navigate('Wishlist'), '#FF4D88')}
                        {renderMenuItem('map-pin', 'Alamat Pengiriman', () => navigation.navigate('AddressList'), '#4CAF50')}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pengaturan Akun</Text>
                    <View style={styles.menuBox}>
                        {renderMenuItem('settings', 'Pengaturan Aplikasi', () => navigation.navigate('Settings'))}
                        {renderMenuItem('help-circle', 'Pusat Bantuan', () => navigation.navigate('Help'))}
                        {renderMenuItem('info', 'Tentang Aplikasi', () => { })}
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}>
                    <Icon name="log-out" size={normalize(20)} color="#FF3B30" />
                    <Text style={styles.logoutText}>Keluar Dari Akun</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Versi 1.0.0 (Build 2026)</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: COLORS.primary,
        paddingBottom: normalize(30),
        borderBottomLeftRadius: normalize(30),
        borderBottomRightRadius: normalize(30),
    },
    headerContent: {
        paddingHorizontal: SPACING.lg,
        paddingTop: Platform.OS === 'android' ? SPACING.lg : 0,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.md,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: normalize(80),
        height: normalize(80),
        borderRadius: normalize(40),
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    avatarPlaceholder: {
        width: normalize(80),
        height: normalize(80),
        borderRadius: normalize(40),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    editAvatarBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#FFCC33',
        width: normalize(26),
        height: normalize(26),
        borderRadius: normalize(13),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    textInfo: {
        marginLeft: SPACING.md,
        flex: 1,
    },
    userName: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: COLORS.white,
    },
    userEmail: {
        fontSize: normalize(14),
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 2,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: normalize(12),
        alignSelf: 'flex-start',
        marginTop: SPACING.sm,
    },
    badgeText: {
        fontSize: normalize(10),
        fontWeight: 'bold',
        color: COLORS.primary,
        marginLeft: 4,
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: SPACING.xl,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.md,
    },
    menuBox: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radiusLg,
        paddingVertical: SPACING.sm,
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: normalize(36),
        height: normalize(36),
        borderRadius: normalize(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuText: {
        fontSize: normalize(15),
        fontWeight: '500',
        marginLeft: SPACING.sm,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: SPACING.md,
        borderRadius: SIZES.radiusLg,
        marginTop: SPACING.md,
        borderWidth: 1,
        borderColor: '#FFEBEA',
    },
    logoutText: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: '#FF3B30',
        marginLeft: SPACING.sm,
    },
    versionText: {
        textAlign: 'center',
        fontSize: normalize(12),
        color: COLORS.grey,
        marginTop: SPACING.xl,
    },
    notLoggedInContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
    },
    notLoggedInTitle: {
        fontSize: normalize(22),
        fontWeight: 'bold',
        color: COLORS.black,
        marginTop: SPACING.md,
    },
    notLoggedInSubtitle: {
        fontSize: normalize(14),
        color: COLORS.grey,
        textAlign: 'center',
        marginTop: SPACING.sm,
        marginBottom: SPACING.xl,
    },
    loginBtn: {
        backgroundColor: COLORS.primary,
        width: '100%',
        paddingVertical: SPACING.md,
        borderRadius: SIZES.radiusLg,
        alignItems: 'center',
    },
    loginBtnText: {
        color: COLORS.white,
        fontSize: normalize(16),
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
