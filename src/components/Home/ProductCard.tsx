import React, { memo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, DimensionValue } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, SPACING, SIZES, SHADOWS } from '../../utils/theme';
import normalize from 'react-native-normalize';

interface ProductCardProps {
    title: string;
    price: string;
    location: string;
    rating: string;
    sold: string;
    imageUrl: string;
    width?: DimensionValue;
    containerStyle?: any;
    discountPercentage?: string;
    hasExtraVoucher?: boolean;
    isFreeShipping?: boolean;
    isDiscountedPrice?: boolean;
}

const ProductCard = (props: ProductCardProps) => {
    const {
        title,
        price,
        location,
        rating,
        sold,
        imageUrl,
        width = '48%',
        containerStyle,
        discountPercentage,
        hasExtraVoucher,
        isFreeShipping,
        isDiscountedPrice
    } = props;
    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity
            style={[styles.container, { width }, containerStyle]}
            onPress={() => navigation.navigate('ProductDetail', { product: props })}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                {discountPercentage && (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{discountPercentage}</Text>
                    </View>
                )}
                <View style={styles.badgeContainer}>
                    {hasExtraVoucher && (
                        <View style={[styles.badge, styles.voucherBadge]}>
                            <Text style={styles.badgeText}>XTRA Voucher</Text>
                        </View>
                    )}
                    {isFreeShipping && (
                        <View style={[styles.badge, styles.shippingBadge]}>
                            <Text style={styles.badgeText}>GRATIS ONGKIR</Text>
                        </View>
                    )}
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
                <View style={styles.priceRow}>
                    <Text style={styles.price}>{price}</Text>
                    {isDiscountedPrice && (
                        <View style={styles.hargaDiskonBadge}>
                            <Icon name="tag" size={normalize(10)} color="#D32F2F" />
                            <Text style={styles.hargaDiskonText}>Harga Diskon</Text>
                        </View>
                    )}
                </View>
                <View style={styles.footerRow}>
                    <Icon name="star" size={normalize(12)} color="#FFC107" />
                    <Text style={styles.ratingText}>{rating}</Text>
                    <View style={styles.footerDivider} />
                    <Text style={styles.soldText}>Terjual {sold}+</Text>
                    <View style={styles.footerDivider} />
                    <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: SIZES.radius,
        marginBottom: SPACING.md,
        overflow: 'hidden',
        ...SHADOWS.soft,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: normalize(160),
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    discountBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#D32F2F',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderBottomLeftRadius: 8,
    },
    discountText: {
        color: COLORS.white,
        fontSize: normalize(10),
        fontWeight: 'bold',
    },
    badgeContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        padding: 4,
    },
    badge: {
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 4,
    },
    voucherBadge: {
        backgroundColor: '#D32F2F',
    },
    shippingBadge: {
        backgroundColor: '#00AA5B',
    },
    badgeText: {
        color: COLORS.white,
        fontSize: normalize(8),
        fontWeight: 'bold',
    },
    content: {
        padding: SPACING.sm,
    },
    title: {
        fontSize: normalize(13),
        color: COLORS.black,
        marginBottom: SPACING.xs,
        height: normalize(36),
        lineHeight: normalize(18),
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        flexWrap: 'wrap',
    },
    price: {
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: 'red',
        marginRight: 4,
    },
    hargaDiskonBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFEBEA',
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 4,
    },
    hargaDiskonText: {
        color: '#D32F2F',
        fontSize: normalize(9),
        fontWeight: 'bold',
        marginLeft: 2,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.xs,
    },
    ratingText: {
        fontSize: normalize(10),
        color: COLORS.black,
        fontWeight: '500',
        marginLeft: 4,
    },
    footerDivider: {
        width: 1,
        height: normalize(10),
        backgroundColor: COLORS.border,
        marginHorizontal: 4,
    },
    soldText: {
        fontSize: normalize(10),
        color: COLORS.grey,
    },
    locationText: {
        fontSize: normalize(10),
        color: COLORS.grey,
        flex: 1,
    },
});

export default memo(ProductCard);
