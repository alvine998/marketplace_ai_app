import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const ITEM_WIDTH = (SCREEN_WIDTH - (SPACING.md * 2)) / 4;

const CATEGORIES = [
    { id: 1, name: 'Promo Hari Ini', icon: 'zap' },
    { id: 2, name: 'Lihat Semua', icon: 'grid' },
    { id: 3, name: 'Top-Up & Tagihan', icon: 'file-text' },
    { id: 4, name: 'Elektronik', icon: 'tv' },
    { id: 5, name: 'Fashion Pria', icon: 'user' },
    { id: 6, name: 'Fashion Wanita', icon: 'heart' },
    { id: 7, name: 'Rumah Tangga', icon: 'home' },
    { id: 8, name: 'Kecantikan', icon: 'smile' }, // Changed face-smile to smile for Feather
];

const CategoryList = () => {
    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {CATEGORIES.map((category) => (
                    <TouchableOpacity key={category.id} style={styles.categoryItem}>
                        <View style={styles.iconWrapper}>
                            <Icon name={category.icon} size={normalize(24)} color={COLORS.primary} />
                        </View>
                        <Text style={styles.categoryName} numberOfLines={2}>
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    categoryItem: {
        width: ITEM_WIDTH,
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    iconWrapper: {
        width: normalize(45),
        height: normalize(45),
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    categoryName: {
        fontSize: normalize(10),
        color: COLORS.black,
        textAlign: 'center',
    },
});

export default CategoryList;
