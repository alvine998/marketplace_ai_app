import React, { memo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, DimensionValue } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
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
        >
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
                <Text style={styles.price}>{price}</Text>
                <Text style={styles.location}>{location}</Text>
                <View style={styles.ratingRow}>
                    <Icon name="star" size={normalize(12)} color="#FFC107" />
                    <Text style={styles.ratingText}>{rating}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.soldText}>Terjual {sold}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '48%',
        backgroundColor: COLORS.cardBackground,
        borderRadius: SIZES.radius,
        marginBottom: SPACING.md,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    image: {
        width: '100%',
        height: normalize(150),
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
    },
    price: {
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.xs,
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
    ratingText: {
        fontSize: normalize(11),
        color: COLORS.grey,
        marginLeft: 4,
    },
    divider: {
        width: 1,
        height: normalize(10),
        backgroundColor: COLORS.border,
        marginHorizontal: 6,
    },
    soldText: {
        fontSize: normalize(11),
        color: COLORS.grey,
    },
});

export default memo(ProductCard);
