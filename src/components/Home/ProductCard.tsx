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
}

const ProductCard = (props: ProductCardProps) => {
    const { title, price, location, rating, sold, imageUrl, width = '48%', containerStyle } = props;
    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity
            style={[styles.container, { width }, containerStyle]}
            onPress={() => navigation.navigate('ProductDetail', { product: props })}
            activeOpacity={0.9}
        >
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
                <Text style={styles.price}>{price}</Text>
                <Text style={styles.location}>{location}</Text>
                <View style={styles.ratingRow}>
                    <View style={styles.ratingInfo}>
                        <Icon name="star" size={normalize(12)} color="#FFC107" />
                        <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.soldText}>{sold} terjual</Text>
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
    image: {
        width: '100%',
        height: normalize(160), // Slightly taller for premium feel
        resizeMode: 'cover',
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
    price: {
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 4,
    },
    location: {
        fontSize: normalize(11),
        color: COLORS.grey,
        marginBottom: SPACING.xs,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: normalize(11),
        color: COLORS.black,
        fontWeight: '500',
        marginLeft: 4,
    },
    divider: {
        width: 1,
        height: normalize(10),
        backgroundColor: COLORS.border,
        marginHorizontal: 8,
    },
    soldText: {
        fontSize: normalize(11),
        color: COLORS.grey,
    },
});

export default memo(ProductCard);
