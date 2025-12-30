import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

const { width } = Dimensions.get('window');

const PPOB_SERVICES = [
    { id: '1', name: 'Pulsa', icon: 'smartphone', color: '#E3F2FD' },
    { id: '2', name: 'Paket Data', icon: 'globe', color: '#F3E5F5' },
    { id: '3', name: 'PLN', icon: 'zap', color: '#FFF3E0' },
    { id: '4', name: 'Top-Up Game', icon: 'pocket', color: '#E8F5E9' },
    { id: '5', name: 'Tagihan Air', icon: 'droplet', color: '#E1F5FE' },
    { id: '6', name: 'BPJS', icon: 'shield', color: '#FFF8E1' },
    { id: '7', name: 'Internet & TV', icon: 'tv', color: '#FBE9E7' },
    { id: '8', name: 'Cicilan Kredit', icon: 'credit-card', color: '#EFEBE9' },
    { id: '9', name: 'Angsuran', icon: 'file-text', color: '#ECEFF1' },
    { id: '10', name: 'E-Money', icon: 'pocket', color: '#F1F8E9' },
    { id: '11', name: 'Zakat', icon: 'heart', color: '#FFFDE7' },
    { id: '12', name: 'Lainnya', icon: 'grid', color: '#F5F5F5' },
];

const PPOBScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Top-Up & Tagihan</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.bannerContainer}>
                    <View style={styles.banner}>
                        <View style={styles.bannerTextContainer}>
                            <Text style={styles.bannerTitle}>Bayar Tagihan Lebih Praktis!</Text>
                            <Text style={styles.bannerSub}>Dapatkan cashback hingga Rp 50.000</Text>
                            <TouchableOpacity style={styles.bannerBtn}>
                                <Text style={styles.bannerBtnText}>Cek Promo</Text>
                            </TouchableOpacity>
                        </View>
                        <Icon name="zap" size={normalize(60)} color={COLORS.white} style={styles.bannerIcon} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Semua Layanan</Text>
                    <View style={styles.grid}>
                        {PPOB_SERVICES.map((service) => (
                            <TouchableOpacity key={service.id} style={styles.serviceItem}>
                                <View style={[styles.iconBox, { backgroundColor: service.color }]}>
                                    <Icon name={service.icon} size={normalize(24)} color={COLORS.black} />
                                </View>
                                <Text style={styles.serviceName}>{service.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={[styles.section, { marginBottom: SPACING.xl }]}>
                    <Text style={styles.sectionTitle}>Riwayat Transaksi</Text>
                    <View style={styles.emptyHistory}>
                        <Icon name="clock" size={normalize(40)} color={COLORS.lightGrey} />
                        <Text style={styles.emptyHistoryText}>Belum ada riwayat transaksi</Text>
                    </View>
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
        paddingHorizontal: SPACING.md,
        height: normalize(56),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
        marginLeft: SPACING.md,
    },
    bannerContainer: {
        padding: SPACING.md,
    },
    banner: {
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        padding: SPACING.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    bannerTextContainer: {
        flex: 1,
    },
    bannerTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.white,
    },
    bannerSub: {
        fontSize: normalize(12),
        color: COLORS.white,
        marginTop: 4,
        opacity: 0.9,
    },
    bannerBtn: {
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.md,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginTop: SPACING.md,
    },
    bannerBtnText: {
        fontSize: normalize(12),
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    bannerIcon: {
        opacity: 0.2,
        position: 'absolute',
        right: -10,
        bottom: -10,
    },
    section: {
        paddingHorizontal: SPACING.md,
        paddingTop: SPACING.md,
    },
    sectionTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    serviceItem: {
        width: (width - SPACING.md * 2) / 4,
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    iconBox: {
        width: normalize(48),
        height: normalize(48),
        borderRadius: normalize(24),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    serviceName: {
        fontSize: normalize(12),
        color: COLORS.black,
        textAlign: 'center',
    },
    emptyHistory: {
        alignItems: 'center',
        paddingVertical: SPACING.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
        borderRadius: SIZES.radius,
    },
    emptyHistoryText: {
        fontSize: normalize(14),
        color: COLORS.grey,
        marginTop: SPACING.sm,
    },
});

export default PPOBScreen;
