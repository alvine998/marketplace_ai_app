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

const PROMO_BANNERS = [
    {
        id: '1',
        title: 'Flash Sale Akhir Tahun!',
        subtitle: 'Diskon hingga 90% untuk produk pilihan.',
        image: 'https://picsum.photos/seed/promo1/800/400',
        color: '#FF5722',
        tag: 'Flash Sale',
    },
    {
        id: '2',
        title: 'Gratis Ongkir Seluruh Indonesia',
        subtitle: 'Tanpa minimum belanja, khusus pengguna baru.',
        image: 'https://picsum.photos/seed/promo2/800/400',
        color: '#03AC0E',
        tag: 'Ongkir',
    },
    {
        id: '3',
        title: 'Cashback Gila-gilaan!',
        subtitle: 'Dapatkan cashback hingga Rp 500.000.',
        image: 'https://picsum.photos/seed/promo3/800/400',
        color: '#2196F3',
        tag: 'Cashback',
    },
    {
        id: '4',
        title: 'Diskon Elektronik Terbaik',
        subtitle: 'Hemat jutaan rupiah untuk gadget idamanmu.',
        image: 'https://picsum.photos/seed/promo4/800/400',
        color: '#673AB7',
        tag: 'Elektronik',
    },
    {
        id: '5',
        title: 'Gaya Baru, Semangat Baru',
        subtitle: 'Koleksi fashion terbaru diskon 50%.',
        image: 'https://picsum.photos/seed/promo5/800/400',
        color: '#E91E63',
        tag: 'Fashion',
    },
];

const PromoScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Promo Hari Ini</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.infoBox}>
                    <Icon name="info" size={normalize(20)} color={COLORS.primary} />
                    <Text style={styles.infoText}>Gunakan kode promo untuk belanja lebih hemat!</Text>
                </View>

                {PROMO_BANNERS.map((promo) => (
                    <TouchableOpacity key={promo.id} style={styles.promoCard}>
                        <Image source={{ uri: promo.image }} style={styles.promoImage} />
                        <View style={styles.promoContent}>
                            <View style={[styles.tag, { backgroundColor: promo.color + '20' }]}>
                                <Text style={[styles.tagText, { color: promo.color }]}>{promo.tag}</Text>
                            </View>
                            <Text style={styles.promoTitle}>{promo.title}</Text>
                            <Text style={styles.promoSubtitle}>{promo.subtitle}</Text>
                            <View style={styles.promoFooter}>
                                <Text style={styles.validUntil}>Berlaku s/d 31 Des 2023</Text>
                                <TouchableOpacity style={[styles.claimBtn, { backgroundColor: promo.color }]}>
                                    <Text style={styles.claimBtnText}>Klaim</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey,
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
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
        marginLeft: SPACING.md,
    },
    scrollContent: {
        padding: SPACING.md,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary + '10',
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        marginBottom: SPACING.md,
    },
    infoText: {
        fontSize: normalize(13),
        color: COLORS.black,
        marginLeft: SPACING.sm,
        flex: 1,
    },
    promoCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginBottom: SPACING.lg,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    promoImage: {
        width: '100%',
        height: normalize(160),
        resizeMode: 'cover',
    },
    promoContent: {
        padding: SPACING.md,
    },
    tag: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: SPACING.xs,
    },
    tagText: {
        fontSize: normalize(10),
        fontWeight: 'bold',
    },
    promoTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 4,
    },
    promoSubtitle: {
        fontSize: normalize(13),
        color: COLORS.grey,
        marginBottom: SPACING.md,
    },
    promoFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: SPACING.sm,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    validUntil: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    claimBtn: {
        paddingHorizontal: SPACING.md,
        paddingVertical: 6,
        borderRadius: 20,
    },
    claimBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(12),
    },
});

export default PromoScreen;
