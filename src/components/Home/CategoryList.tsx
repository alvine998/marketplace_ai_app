import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '../../utils/responsive';

const CATEGORIES = [
    { id: 1, name: 'Lihat Semua', icon: require('../../assets/icons/lihat_semua.png') },
    { id: 2, name: 'Elektronik', icon: require('../../assets/icons/elektronik.png') },
    { id: 3, name: 'Fashion Pria', icon: require('../../assets/icons/fashion_pria.png') },
    { id: 4, name: 'Fashion Wanita', icon: require('../../assets/icons/fashion_wanita.png') },
    { id: 5, name: 'Handphone', icon: require('../../assets/icons/handphone_tablet.png') },
    { id: 6, name: 'Komputer', icon: require('../../assets/icons/komputer_laptop.png') },
    { id: 7, name: 'Kesehatan', icon: require('../../assets/icons/kesehatan.png') },
    { id: 8, name: 'Kecantikan', icon: require('../../assets/icons/kecantikan.png') },
    { id: 9, name: 'Makanan', icon: require('../../assets/icons/makanan_minuman.png') },
    { id: 10, name: 'Olahraga', icon: require('../../assets/icons/olahraga.png') },
];

const CategoryList = () => {
    const navigation = useNavigation<any>();
    const { width, columns } = useResponsive();

    const itemWidth = normalize(70);

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {CATEGORIES.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[styles.categoryItem, { width: itemWidth }]}
                        onPress={() => {
                            if (category.id === 1) {
                                navigation.navigate('AllCategories');
                            } else {
                                navigation.navigate('CategoryProductList', { category });
                            }
                        }}
                    >
                        <View style={styles.iconWrapper}>
                            <Image source={category.icon} style={styles.categoryIcon} resizeMode="contain" />
                        </View>
                        <Text style={styles.categoryName} numberOfLines={2}>
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: SPACING.sm,
    },
    scrollContent: {
        paddingHorizontal: SPACING.md,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: SPACING.xs,
    },
    iconWrapper: {
        width: normalize(45),
        height: normalize(45),
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    categoryIcon: {
        width: normalize(35),
        height: normalize(35),
    },
    categoryName: {
        fontSize: normalize(10),
        color: COLORS.black,
        textAlign: 'center',
        paddingHorizontal: 2,
    },
});

export default CategoryList;
