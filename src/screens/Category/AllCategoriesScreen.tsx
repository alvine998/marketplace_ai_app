import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES, SHADOWS } from '../../utils/theme';
import normalize from 'react-native-normalize';

const { width } = Dimensions.get('window');

const ALL_CATEGORIES = [
    { id: 1, name: 'Elektronik', icon: require('../../assets/icons/elektronik.png') },
    { id: 2, name: 'Fashion Pria', icon: require('../../assets/icons/fashion_pria.png') },
    { id: 3, name: 'Fashion Wanita', icon: require('../../assets/icons/fashion_wanita.png') },
    { id: 4, name: 'Handphone & Tablet', icon: require('../../assets/icons/handphone_tablet.png') },
    { id: 5, name: 'Komputer & Laptop', icon: require('../../assets/icons/komputer_laptop.png') },
    { id: 6, name: 'Kamera', icon: require('../../assets/icons/kamera.png') },
    { id: 7, name: 'Kesehatan', icon: require('../../assets/icons/kesehatan.png') },
    { id: 8, name: 'Kecantikan', icon: require('../../assets/icons/kecantikan.png') },
    { id: 9, name: 'Ibu & Bayi', icon: require('../../assets/icons/ibu_bayi.png') },
    { id: 10, name: 'Rumah Tangga', icon: require('../../assets/icons/rumah_tangga.png') },
    { id: 11, name: 'Makanan & Minuman', icon: require('../../assets/icons/makanan_minuman.png') },
    { id: 12, name: 'Olahraga', icon: require('../../assets/icons/olahraga.png') },
    { id: 13, name: 'Mainan & Hobi', icon: require('../../assets/icons/mainan_hobi.png') },
    { id: 14, name: 'Otomotif', icon: require('../../assets/icons/otomotif.png') },
    { id: 15, name: 'Buku', icon: require('../../assets/icons/buku.png') },
    { id: 16, name: 'Lain-lain', icon: require('../../assets/icons/lain_lain.png') },
];

const AllCategoriesScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Semua Kategori</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.grid}>
                    {ALL_CATEGORIES.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={styles.categoryCard}
                            onPress={() => navigation.navigate('CategoryProductList', { category })}
                        >
                            <View style={styles.iconBox}>
                                <Image source={category.icon} style={styles.categoryIcon} resizeMode="contain" />
                            </View>
                            <Text style={styles.categoryName}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        height: normalize(56),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        marginRight: SPACING.md,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    scrollContent: {
        padding: SPACING.sm,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: (width - (SPACING.sm * 5)) / 4, // 4 items per row
        backgroundColor: '#F8F9FA',
        borderRadius: SIZES.radius,
        padding: SPACING.xs,
        alignItems: 'center',
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    iconBox: {
        width: normalize(48),
        height: normalize(48),
        borderRadius: normalize(24),
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xs,
        ...SHADOWS.soft,
    },
    categoryIcon: {
        width: normalize(32),
        height: normalize(32),
    },
    categoryName: {
        fontSize: normalize(10),
        fontWeight: '600',
        color: COLORS.black,
        textAlign: 'center',
    },
});

export default AllCategoriesScreen;
