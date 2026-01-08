import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import ProductCard from './ProductCard';

const RECOMMENDATIONS = [
    {
        id: 'rec1',
        title: 'Canvas Tote Bag Premium',
        price: 'Rp 145.000',
        location: 'Jakarta Barat',
        rating: '4.9',
        sold: '500+',
        imageUrl: 'https://picsum.photos/seed/rec1/400/400',
    },
    {
        id: 'rec2',
        title: 'Minimalist Wall Clock',
        price: 'Rp 89.000',
        location: 'Tangerang',
        rating: '4.8',
        sold: '1rb+',
        imageUrl: 'https://picsum.photos/seed/rec2/400/400',
    },
    {
        id: 'rec3',
        title: 'Aesthetic Ceramic Vase',
        price: 'Rp 120.000',
        location: 'Bandung',
        rating: '5.0',
        sold: '100+',
        imageUrl: 'https://picsum.photos/seed/rec3/400/400',
    },
    {
        id: 'rec4',
        title: 'Linen Scented Candle',
        price: 'Rp 65.000',
        location: 'Jakarta Selatan',
        rating: '4.7',
        sold: '2rb+',
        imageUrl: 'https://picsum.photos/seed/rec4/400/400',
    },
];

const ShopRecommendations = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Lainnya di Toko Ini</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>Lihat Semua</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {RECOMMENDATIONS.map((item) => (
                    <View key={item.id} style={styles.cardWrapper}>
                        <ProductCard {...item} width={normalize(140)} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: SPACING.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: SPACING.sm,
        marginBottom: SPACING.sm,
    },
    title: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    seeAll: {
        fontSize: normalize(14),
        color: COLORS.primary,
        fontWeight: '500',
    },
    scrollContent: {
        // paddingLeft: SPACING.md,
        // paddingBottom: SPACING.sm,
    },
    cardWrapper: {
        marginRight: SPACING.sm,
    },
});

export default ShopRecommendations;
