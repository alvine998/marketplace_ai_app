import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SPACING, SIZES, SHADOWS } from '../../utils/theme';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FLASH_SALE_DATA = [
    { id: 'fs1', price: 'Rp 25.000', originalPrice: 'Rp 115.000', imageUrl: 'https://picsum.photos/seed/fs1/200/200' },
    { id: 'fs2', price: 'Rp 25.000', originalPrice: 'Rp 115.000', imageUrl: 'https://picsum.photos/seed/fs2/200/200' },
    { id: 'fs3', price: 'Rp 25.000', originalPrice: 'Rp 115.000', imageUrl: 'https://picsum.photos/seed/fs3/200/200' },
    { id: 'fs4', price: 'Rp 25.000', originalPrice: 'Rp 115.000', imageUrl: 'https://picsum.photos/seed/fs4/200/200' },
];

const FlashSale = () => {
    const navigation = useNavigation<any>();
    const [timeLeft, setTimeLeft] = useState('22:38:4');

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('FlashSale')}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Flash Sale</Text>
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>{timeLeft}</Text>
                </View>
            </View>

            <View style={styles.grid}>
                {FLASH_SALE_DATA.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.itemCard}>
                        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                        <View style={styles.priceSection}>
                            <View style={styles.priceBadge}>
                                <Text style={styles.priceText}>{item.price}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D32F2F', // Vibrant red background for better punch
        borderRadius: SIZES.radius,
        padding: 8,
        width: '100%',
        height: normalize(240),
        justifyContent: 'space-between',
        ...SHADOWS.medium,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    title: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.white, // Increased contrast
    },
    timerContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Glassy look for timer
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    timerText: {
        color: COLORS.white,
        fontSize: normalize(10),
        fontWeight: 'bold',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flex: 1,
    },
    itemCard: {
        width: '48%',
        height: '46%',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 4,
        marginBottom: 4,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.soft,
    },
    itemImage: {
        width: '100%',
        height: '65%',
        borderRadius: 4,
        backgroundColor: COLORS.lightGrey,
    },
    priceSection: {
        width: '100%',
        alignItems: 'center',
        marginTop: 4,
    },
    priceBadge: {
        backgroundColor: '#D32F2F',
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 4,
    },
    priceText: {
        color: COLORS.white,
        fontSize: normalize(9),
        fontWeight: 'bold',
    },
});

export default FlashSale;
