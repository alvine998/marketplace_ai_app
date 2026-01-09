import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PROMO_PRODUCTS = [
    {
        id: 'p1',
        title: 'Glass Jar Set',
        price: 'Rp 0',
        originalPrice: 'Rp 20.000',
        discount: '100%',
        location: 'Bekasi Kota',
        imageUrl: 'https://picsum.photos/seed/promo1/200/200',
        stockProgress: 0.8,
        rating: '5.0',
        sold: '100+',
    },
    {
        id: 'p2',
        title: 'Floral Handbag',
        price: 'Rp 0',
        originalPrice: 'Rp 45.000',
        discount: '100%',
        location: 'Jakarta Selatan',
        imageUrl: 'https://picsum.photos/seed/promo2/200/200',
        stockProgress: 0.6,
        rating: '4.8',
        sold: '50+',
    },
    {
        id: 'p3',
        title: 'Wireless Earbuds',
        price: 'Rp 0',
        originalPrice: 'Rp 150.000',
        discount: '100%',
        location: 'Tangerang',
        imageUrl: 'https://picsum.photos/seed/promo3/200/200',
        stockProgress: 0.9,
        rating: '4.9',
        sold: '1.2rb+',
    },
];

const PromoProductCard = ({ item, onPress }: { item: any; onPress: () => void }) => (
    <TouchableOpacity style={styles.promoCard} onPress={onPress} activeOpacity={0.9}>
        <Image source={{ uri: item.imageUrl }} style={styles.promoImage} />
        <View style={styles.promoInfo}>
            <Text style={styles.promoPrice}>{item.price}</Text>
            <View style={styles.discountRow}>
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{item.discount}</Text>
                </View>
                <Text style={styles.originalPrice}>{item.originalPrice}</Text>
            </View>
            <View style={styles.locationRow}>
                <View style={styles.locationIconBox}>
                    <Icon name="shopping" size={normalize(10)} color={COLORS.white} />
                </View>
                <Text style={styles.locationText}>{item.location}</Text>
            </View>
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${item.stockProgress * 100}%` }]} />
                <View style={[styles.fireIconContainer, { left: `${item.stockProgress * 100 - 5}%` }]}>
                    <Icon name="fire" size={normalize(14)} color="#FF3B30" />
                </View>
            </View>
            <Text style={styles.stockLabel}>Segera Habis</Text>
        </View>
    </TouchableOpacity>
);

const PrettyShopPromo = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <View style={styles.titleBadge}>
                    <Text style={styles.titleText}>Pretty Shop Promo</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.viewAllText}>Lihat semua</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.leftContent}>
                    <Image
                        source={require('../../assets/images/promo.png')}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>

                <FlatList
                    data={PROMO_PRODUCTS}
                    renderItem={({ item }) => (
                        <PromoProductCard
                            item={item}
                            onPress={() => navigation.navigate('ProductDetail', { product: item })}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.productList}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E56C5',
        paddingVertical: SPACING.sm,
        marginBottom: SPACING.sm,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        marginBottom: SPACING.md,
    },
    titleBadge: {
        backgroundColor: '#D32F2F',
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: normalize(8),
    },
    titleText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(16),
    },
    viewAllText: {
        color: COLORS.white,
        fontSize: normalize(14),
        fontWeight: '500',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    leftContent: {
        width: SCREEN_WIDTH * 0.35,
        paddingLeft: SPACING.md,
        justifyContent: 'center',
    },
    belanjaBadge: {
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 2,
        borderRadius: normalize(15),
        alignSelf: 'flex-start',
    },
    belanjaText: {
        color: '#1E56C5',
        fontWeight: 'bold',
        fontSize: normalize(18),
    },
    zeroPriceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: -5,
    },
    rpText: {
        color: COLORS.white,
        fontSize: normalize(18),
        fontWeight: 'bold',
    },
    zeroText: {
        color: COLORS.white,
        fontSize: normalize(60),
        fontWeight: 'bold',
    },
    illustration: {
        width: '100%',
        height: normalize(150),
        marginTop: normalize(20),
    },
    productList: {
        paddingRight: SPACING.md,
    },
    promoCard: {
        backgroundColor: COLORS.white,
        width: normalize(130),
        borderRadius: SIZES.radius,
        marginRight: SPACING.sm,
        overflow: 'hidden',
    },
    promoImage: {
        width: '100%',
        height: normalize(100),
    },
    promoInfo: {
        padding: SPACING.xs,
    },
    promoPrice: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    discountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    discountBadge: {
        backgroundColor: '#FFEBEA',
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 4,
    },
    discountText: {
        color: '#FF3B30',
        fontSize: normalize(9),
        fontWeight: 'bold',
    },
    originalPrice: {
        fontSize: normalize(10),
        color: COLORS.grey,
        textDecorationLine: 'line-through',
        marginLeft: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    locationIconBox: {
        backgroundColor: '#673AB7',
        borderRadius: 4,
        padding: 1,
    },
    locationText: {
        fontSize: normalize(10),
        color: COLORS.grey,
        marginLeft: 4,
    },
    progressContainer: {
        height: 4,
        backgroundColor: '#EFEFEF',
        borderRadius: 2,
        marginTop: SPACING.sm,
        position: 'relative',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FF3B30',
        borderRadius: 2,
    },
    fireIconContainer: {
        position: 'absolute',
        top: -normalize(6),
    },
    stockLabel: {
        fontSize: normalize(9),
        color: '#FF3B30',
        fontWeight: '500',
        marginTop: 2,
    },
});

export default PrettyShopPromo;
