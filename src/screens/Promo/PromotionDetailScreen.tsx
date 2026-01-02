import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

const { width } = Dimensions.get('window');

const PromotionDetailScreen = ({ navigation, route }: any) => {
    // In a real app, we might pass data through route.params
    const promoData = route.params?.promoData || {
        id: 'promo-1',
        title: 'Mega Sale Awal Tahun!',
        description: 'Dapatkan diskon gila-gilaan hingga 80% untuk berbagai produk favoritmu. Mulai dari gadget, fashion, hingga kebutuhan rumah tangga. Jangan sampai ketinggalan!',
        imageUrl: 'https://picsum.photos/seed/promo-detail/800/1200',
        validUntil: '31 Januari 2026',
        terms: [
            'Berlaku untuk semua metode pembayaran.',
            'Diskon maksimal Rp 500.000.',
            'Minimal transaksi Rp 100.000.',
            'Hanya berlaku di aplikasi Marketplace.',
        ]
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>Detail Promo</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={{ uri: promoData.imageUrl }}
                    style={styles.bannerImage}
                    resizeMode="cover"
                />

                <View style={styles.content}>
                    <View style={styles.titleSection}>
                        <Text style={styles.promoTitle}>{promoData.title}</Text>
                        <View style={styles.validityBadge}>
                            <Icon name="clock" size={12} color={COLORS.grey} />
                            <Text style={styles.validityText}>Berlaku s/d {promoData.validUntil}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Tentang Promo</Text>
                    <Text style={styles.description}>{promoData.description}</Text>

                    <Text style={[styles.sectionTitle, { marginTop: SPACING.lg }]}>Syarat & Ketentuan</Text>
                    {promoData.terms.map((term: string, index: number) => (
                        <View key={index} style={styles.termItem}>
                            <View style={styles.dot} />
                            <Text style={styles.termText}>{term}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.footerSpace} />
            </ScrollView>

            <View style={styles.bottomCta}>
                <TouchableOpacity style={styles.usePromoBtn}>
                    <Text style={styles.usePromoBtnText}>Cek Promo</Text>
                </TouchableOpacity>
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
        paddingHorizontal: SPACING.md,
        height: normalize(56),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        width: normalize(40),
        height: normalize(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
        marginLeft: SPACING.sm,
        flex: 1,
    },
    bannerImage: {
        width: width,
        height: width * 1.2, // Taller image for aesthetic impact
    },
    content: {
        padding: SPACING.lg,
    },
    titleSection: {
        marginBottom: SPACING.md,
    },
    promoTitle: {
        fontSize: normalize(22),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 8,
    },
    validityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    validityText: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginLeft: 4,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.lg,
    },
    sectionTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.sm,
    },
    description: {
        fontSize: normalize(14),
        color: COLORS.grey,
        lineHeight: 22,
    },
    termItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.primary,
        marginTop: 8,
        marginRight: 10,
    },
    termText: {
        flex: 1,
        fontSize: normalize(13),
        color: '#444',
        lineHeight: 20,
    },
    footerSpace: {
        height: normalize(100),
    },
    bottomCta: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    usePromoBtn: {
        backgroundColor: COLORS.primary,
        height: normalize(48),
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    usePromoBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(16),
    },
});

export default PromotionDetailScreen;
