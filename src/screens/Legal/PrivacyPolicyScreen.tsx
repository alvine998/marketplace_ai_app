import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SIZES, SPACING } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useTranslation } from '../../context/LanguageContext';

const PrivacyPolicyScreen = ({ navigation }: any) => {
    const { t, language } = useTranslation();

    const sections = language === 'id' ? [
        {
            title: '1. Informasi yang Kami Kumpulkan',
            content: 'Kami mengumpulkan informasi yang Anda berikan saat mendaftar, seperti nama, email, alamat, dan informasi pembayaran untuk keperluan transaksi.'
        },
        {
            title: '2. Penggunaan Informasi',
            content: 'Informasi Anda digunakan untuk memproses pesanan, mengelola akun, mengirimkan pembaruan layanan, dan meningkatkan pengalaman berbelanja Anda.'
        },
        {
            title: '3. Berbagi Informasi',
            content: 'Kami tidak menjual informasi pribadi Anda. Kami hanya berbagi data dengan pihak ketiga yang diperlukan untuk pengiriman barang dan pemrosesan pembayaran.'
        },
        {
            title: '4. Keamanan Data',
            content: 'Kami menggunakan langkah-langkah keamanan standar industri untuk melindungi data Anda dari akses yang tidak sah.'
        }
    ] : [
        {
            title: '1. Information We Collect',
            content: 'We collect information you provide when registering, such as name, email, address, and payment information for transaction purposes.'
        },
        {
            title: '2. Use of Information',
            content: 'Your information is used to process orders, manage accounts, send service updates, and improve your shopping experience.'
        },
        {
            title: '3. Information Sharing',
            content: 'We do not sell your personal information. We only share data with third parties necessary for shipping goods and processing payments.'
        },
        {
            title: '4. Data Security',
            content: 'We use industry-standard security measures to protect your data from unauthorized access.'
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('settings.privacy')}</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.lastUpdated}>
                    {language === 'id' ? 'Terakhir diperbarui: 31 Desember 2025' : 'Last updated: December 31, 2025'}
                </Text>

                {sections.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Icon name="shield" size={normalize(18)} color="#4CAF50" style={styles.sectionIcon} />
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                        </View>
                        <Text style={styles.sectionContent}>{section.content}</Text>
                    </View>
                ))}
                <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>Hubungi Kami</Text>
                    <Text style={styles.contactText}>Jika Anda memiliki pertanyaan tentang kebijakan privasi kami, silakan hubungi tim support kami melalui menu Bantuan.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F9FF',
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
        padding: 4,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    content: {
        padding: SPACING.lg,
    },
    lastUpdated: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginBottom: SPACING.xl,
        fontStyle: 'italic',
    },
    section: {
        marginBottom: SPACING.md,
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    sectionIcon: {
        marginRight: SPACING.sm,
    },
    sectionTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    sectionContent: {
        fontSize: normalize(14),
        lineHeight: normalize(22),
        color: '#555',
    },
    contactSection: {
        marginTop: SPACING.lg,
        padding: SPACING.md,
        alignItems: 'center',
        marginBottom: normalize(40),
    },
    contactTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.sm,
    },
    contactText: {
        fontSize: normalize(12),
        color: COLORS.grey,
        textAlign: 'center',
        lineHeight: normalize(18),
    },
});

export default PrivacyPolicyScreen;
