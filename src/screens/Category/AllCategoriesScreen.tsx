import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

const { width } = Dimensions.get('window');

const ALL_CATEGORIES = [
    { id: 4, name: 'Elektronik', icon: 'tv' },
    { id: 5, name: 'Fashion Pria', icon: 'user' },
    { id: 6, name: 'Fashion Wanita', icon: 'heart' },
    { id: 7, name: 'Rumah Tangga', icon: 'home' },
    { id: 8, name: 'Kecantikan', icon: 'smile' },
    { id: 9, name: 'Kesehatan', icon: 'target' },
    { id: 10, name: 'Olahraga', icon: 'wind' },
    { id: 11, name: 'Otomotif', icon: 'truck' },
    { id: 12, name: 'Mainan & Hobi', icon: 'award' },
    { id: 13, name: 'Buku', icon: 'book' },
    { id: 14, name: 'Makanan & Minuman', icon: 'coffee' },
    { id: 15, name: 'Ibu & Bayi', icon: 'github' }, // Substitute icon
    { id: 16, name: 'Handphone & Tablet', icon: 'smartphone' },
    { id: 17, name: 'Komputer & Laptop', icon: 'monitor' },
    { id: 18, name: 'Kamera', icon: 'camera' },
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
                                <Icon name={category.icon} size={normalize(28)} color={COLORS.primary} />
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
        padding: SPACING.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: (width - (SPACING.md * 3)) / 2,
        backgroundColor: '#F8F9FA',
        borderRadius: SIZES.radius,
        padding: SPACING.md,
        alignItems: 'center',
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    iconBox: {
        width: normalize(56),
        height: normalize(56),
        borderRadius: normalize(28),
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.sm,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    categoryName: {
        fontSize: normalize(13),
        fontWeight: '600',
        color: COLORS.black,
        textAlign: 'center',
    },
});

export default AllCategoriesScreen;
