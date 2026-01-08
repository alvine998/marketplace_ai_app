import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '../../utils/responsive';

const CATEGORIES = [
    { id: 2, name: 'Lihat Semua', icon: 'grid' },
    { id: 1, name: 'Promo Hari Ini', icon: 'zap' },
    { id: 4, name: 'Elektronik', icon: 'tv' },
    { id: 5, name: 'Fashion Pria', icon: 'user' },
    { id: 6, name: 'Fashion Wanita', icon: 'heart' },
    { id: 7, name: 'Rumah Tangga', icon: 'home' },
    { id: 8, name: 'Kecantikan', icon: 'smile' },
];

const CategoryList = () => {
    const navigation = useNavigation<any>();
    const { width, columns } = useResponsive();

    const itemWidth = normalize(80);

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
                                navigation.navigate('Promo');
                            } else if (category.id === 2) {
                                navigation.navigate('AllCategories');
                            } else {
                                navigation.navigate('CategoryProductList', { category });
                            }
                        }}
                    >
                        <View style={styles.iconWrapper}>
                            <Icon name={category.icon} size={normalize(24)} color={COLORS.primary} />
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
        marginVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
    },
    scrollContent: {
        paddingHorizontal: SPACING.xs,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: SPACING.xs,
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
        paddingHorizontal: 4,
    },
});

export default CategoryList;
