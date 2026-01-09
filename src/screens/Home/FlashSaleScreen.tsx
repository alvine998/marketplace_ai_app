import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Dimensions,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES, SHADOWS } from '../../utils/theme';
import normalize from 'react-native-normalize';
import ProductCard from '../../components/Home/ProductCard';

const { width } = Dimensions.get('window');

const FLASH_PRODUCTS = [
    { id: 'fs1', title: 'Produk Kilat 1', price: 'Rp 25.000', originalPrice: 'Rp 115.000', location: 'Jakarta', rating: '4.8', sold: '500+', imageUrl: 'https://picsum.photos/seed/fs1/400/400', discount: '78%' },
    { id: 'fs2', title: 'Produk Kilat 2', price: 'Rp 45.000', originalPrice: 'Rp 250.000', location: 'Bandung', rating: '4.9', sold: '1rb+', imageUrl: 'https://picsum.photos/seed/fs2/400/400', discount: '82%' },
    { id: 'fs3', title: 'Produk Kilat 3', price: 'Rp 99.000', originalPrice: 'Rp 500.000', location: 'Surabaya', rating: '4.7', sold: '300+', imageUrl: 'https://picsum.photos/seed/fs3/400/400', discount: '80%' },
    { id: 'fs4', title: 'Produk Kilat 4', price: 'Rp 15.000', originalPrice: 'Rp 100.000', location: 'Medan', rating: '4.6', sold: '2rb+', imageUrl: 'https://picsum.photos/seed/fs4/400/400', discount: '85%' },
    { id: 'fs5', title: 'Produk Kilat 5', price: 'Rp 125.000', originalPrice: 'Rp 450.000', location: 'Jakarta', rating: '5.0', sold: '100+', imageUrl: 'https://picsum.photos/seed/fs5/400/400', discount: '72%' },
    { id: 'fs6', title: 'Produk Kilat 6', price: 'Rp 60.000', originalPrice: 'Rp 180.000', location: 'Tangerang', rating: '4.8', sold: '400+', imageUrl: 'https://picsum.photos/seed/fs6/400/400', discount: '67%' },
];

const FlashSaleScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.white} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Flash Sale</Text>
                    <View style={styles.timerBox}>
                        <Text style={styles.timerText}>Berakhir dalam 02:45:12</Text>
                    </View>
                </View>
            </View>

            <FlatList
                data={FLASH_PRODUCTS}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.productWrapper}>
                        <ProductCard {...item} width="100%" />
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: '#D32F2F',
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.md,
        paddingTop: Platform.OS === 'ios' ? 0 : SPACING.md,
    },
    backButton: {
        marginBottom: SPACING.sm,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: COLORS.white,
    },
    timerBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    timerText: {
        color: COLORS.white,
        fontSize: normalize(12),
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 2, // Reduced from 6
    },
    productWrapper: {
        width: '50%',
        padding: 2, // Reduced from 4
    },
});

export default FlashSaleScreen;
