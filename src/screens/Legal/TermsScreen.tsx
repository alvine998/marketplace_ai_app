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

const TermsScreen = ({ navigation }: any) => {
    const { t, language } = useTranslation();

    const sections = language === 'id' ? [
        {
            title: '1. Penerimaan Syarat',
            content: 'Dengan mengakses dan menggunakan aplikasi ini, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju, harap jangan gunakan layanan kami.'
        },
        {
            title: '2. Penggunaan Layanan',
            content: 'Layanan kami ditujukan untuk pengguna yang berusia minimal 18 tahun atau di bawah pengawasan orang tua. Anda bertanggung jawab untuk menjaga kerahasiaan akun dan password Anda.'
        },
        {
            title: '3. Transaksi dan Pembayaran',
            content: 'Semua harga yang tertera adalah final. Pembayaran harus dilakukan melalui metode yang tersedia di aplikasi. Kami berhak membatalkan pesanan jika terdeteksi adanya kecurangan.'
        },
        {
            title: '4. Kebijakan Pengembalian',
            content: 'Pengembalian produk atau dana hanya dapat dilakukan jika produk tidak sesuai dengan deskripsi atau mengalami kerusakan saat pengiriman, sesuai dengan kebijakan garansi kami.'
        }
    ] : [
        {
            title: '1. Acceptance of Terms',
            content: 'By accessing and using this application, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.'
        },
        {
            title: '2. Use of Services',
            content: 'Our services are intended for users who are at least 18 years old or under parental supervision. You are responsible for maintaining the confidentiality of your account and password.'
        },
        {
            title: '3. Transactions and Payments',
            content: 'All listed prices are final. Payments must be made through the methods available in the app. We reserve the right to cancel orders if fraud is detected.'
        },
        {
            title: '4. Return Policy',
            content: 'Product or fund returns can only be made if the product does not match the description or is damaged during shipping, in accordance with our warranty policy.'
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('settings.terms')}</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.lastUpdated}>
                    {language === 'id' ? 'Terakhir diperbarui: 31 Desember 2025' : 'Last updated: December 31, 2025'}
                </Text>

                {sections.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Icon name="file-text" size={normalize(18)} color={COLORS.primary} style={styles.sectionIcon} />
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                        </View>
                        <Text style={styles.sectionContent}>{section.content}</Text>
                        {index < sections.length - 1 && <View style={styles.sectionDivider} />}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
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
        borderWidth: 1,
        borderColor: COLORS.border,
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
        color: '#444',
        textAlign: 'left',
    },
    sectionDivider: {
        height: 1,
        backgroundColor: 'transparent',
        marginTop: SPACING.md,
    },
});

export default TermsScreen;
