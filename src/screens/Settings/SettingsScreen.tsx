import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Switch,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useTranslation } from '../../context/LanguageContext';
import Toast from 'react-native-toast-message';

const SettingsScreen = ({ navigation }: any) => {
    const { t, language, setLanguage } = useTranslation();
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
    const [isLanguageModalVisible, setIsLanguageModalVisible] = React.useState(false);

    const handleLanguageSelect = (lang: 'id' | 'en') => {
        setLanguage(lang);
        setIsLanguageModalVisible(false);
        Toast.show({
            type: 'success',
            text1: lang === 'id' ? 'Bahasa Berhasil Diubah' : 'Language Changed Successfully',
            text2: lang === 'id' ? 'Aplikasi sekarang menggunakan Bahasa Indonesia' : 'The app is now using English'
        });
    };


    const renderSettingRow = (icon: string, title: string, subtitle?: string, onPress?: () => void, rightElement?: React.ReactNode) => (
        <TouchableOpacity
            style={styles.settingRow}
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={styles.iconContainer}>
                <Icon name={icon} size={normalize(20)} color={COLORS.black} />
            </View>
            <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>{title}</Text>
                {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
            </View>
            {rightElement ? rightElement : (
                <Icon name="chevron-right" size={normalize(20)} color={COLORS.grey} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('settings.title')}</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('settings.account')}</Text>
                    {renderSettingRow('user', t('common.profile'), 'Ubah nama, email, dan biodata')}
                    {renderSettingRow('shield', t('settings.security'), 'Ubah password dan verifikasi dua langkah')}
                    {renderSettingRow('map-pin', t('settings.address'), 'Atur alamat pengiriman')}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('settings.application')}</Text>
                    {renderSettingRow(
                        'bell',
                        t('settings.notification'),
                        'Atur notifikasi yang ingin diterima',
                        undefined,
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: COLORS.lightGrey, true: COLORS.primary + '80' }}
                            thumbColor={notificationsEnabled ? COLORS.primary : '#f4f3f4'}
                        />
                    )}
                    {renderSettingRow(
                        'moon',
                        t('settings.darkMode'),
                        'Ubah tampilan ke mode gelap',
                        undefined,
                        <Switch
                            value={darkModeEnabled}
                            onValueChange={setDarkModeEnabled}
                            trackColor={{ false: COLORS.lightGrey, true: COLORS.primary + '80' }}
                            thumbColor={darkModeEnabled ? COLORS.primary : '#f4f3f4'}
                        />
                    )}
                    {renderSettingRow(
                        'globe',
                        t('settings.language'),
                        language === 'id' ? 'Bahasa Indonesia' : 'English',
                        () => setIsLanguageModalVisible(true)
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('settings.about')}</Text>
                    {renderSettingRow('file-text', t('settings.terms'), undefined, () => navigation.navigate('TermsDrawer'))}
                    {renderSettingRow('lock', t('settings.privacy'), undefined, () => navigation.navigate('PrivacyDrawer'))}
                    <View style={styles.versionContainer}>
                        <Text style={styles.versionText}>{t('settings.version')} 1.0.0</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>{t('settings.deleteAccount')}</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                visible={isLanguageModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsLanguageModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsLanguageModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{t('settings.chooseLanguage')}</Text>
                        <Text style={styles.modalSubtitle}>{t('settings.selectLanguage')}</Text>

                        <TouchableOpacity
                            style={[styles.languageOption, language === 'id' && styles.selectedOption]}
                            onPress={() => handleLanguageSelect('id')}
                        >
                            <Text style={[styles.languageLabel, language === 'id' && styles.selectedLabel]}>Bahasa Indonesia</Text>
                            {language === 'id' && <Icon name="check" size={20} color={COLORS.primary} />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.languageOption, language === 'en' && styles.selectedOption]}
                            onPress={() => handleLanguageSelect('en')}
                        >
                            <Text style={[styles.languageLabel, language === 'en' && styles.selectedLabel]}>English</Text>
                            {language === 'en' && <Icon name="check" size={20} color={COLORS.primary} />}
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        height: normalize(56),
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        marginRight: SPACING.md,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    section: {
        marginTop: SPACING.md,
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.md,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.border,
    },
    sectionTitle: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.primary,
        marginTop: SPACING.md,
        marginBottom: SPACING.sm,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    iconContainer: {
        width: normalize(40),
        alignItems: 'flex-start',
    },
    settingInfo: {
        flex: 1,
    },
    settingTitle: {
        fontSize: normalize(15),
        color: COLORS.black,
        fontWeight: '500',
    },
    settingSubtitle: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginTop: 2,
    },
    versionContainer: {
        paddingVertical: SPACING.lg,
        alignItems: 'center',
    },
    versionText: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    logoutButton: {
        margin: SPACING.lg,
        paddingVertical: SPACING.md,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: '#FF4D4D',
        alignItems: 'center',
    },
    logoutText: {
        color: '#FF4D4D',
        fontWeight: 'bold',
        fontSize: normalize(14),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    modalContent: {
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius * 2,
        padding: SPACING.lg,
    },
    modalTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 8,
    },
    modalSubtitle: {
        fontSize: normalize(14),
        color: COLORS.grey,
        marginBottom: SPACING.lg,
    },
    languageOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        borderRadius: SIZES.radius,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    selectedOption: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary + '10',
    },
    languageLabel: {
        fontSize: normalize(15),
        color: COLORS.black,
    },
    selectedLabel: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
});

export default SettingsScreen;
