import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import ProductCard from '../../components/Home/ProductCard';

const { width } = Dimensions.get('window');

const STORE_PRODUCT_DATA = [
    {
        id: 'os1',
        title: 'MacBook Pro M3 Pro 14-inch 18/512GB',
        price: 'Rp 34.999.000',
        location: 'Jakarta Pusat',
        rating: '5.0',
        sold: '100+',
        imageUrl: 'https://picsum.photos/seed/os1/400/400',
    },
    {
        id: 'os2',
        title: 'Apple Watch Series 9 GPS 45mm Starlight',
        price: 'Rp 6.490.000',
        location: 'Jakarta Pusat',
        rating: '4.9',
        sold: '500+',
        imageUrl: 'https://picsum.photos/seed/os2/400/400',
    },
    {
        id: 'os3',
        title: 'iPad Air 5 M1 64GB Space Grey',
        price: 'Rp 9.299.000',
        location: 'Jakarta Pusat',
        rating: '4.8',
        sold: '1rb+',
        imageUrl: 'https://picsum.photos/seed/os3/400/400',
    },
    {
        id: 'os4',
        title: 'AirPods Pro Gen 2 with MagSafe Case',
        price: 'Rp 3.899.000',
        location: 'Jakarta Pusat',
        rating: '5.0',
        sold: '2rb+',
        imageUrl: 'https://picsum.photos/seed/os4/400/400',
    },
];

const OfficialStoreScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchSection}>
                    <Icon name="search" size={20} color={COLORS.grey} />
                    <Text style={styles.placeholderText}>Cari di Official Store...</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="shopping-cart" size={normalize(22)} color={COLORS.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="bell" size={normalize(22)} color={COLORS.black} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Store Branding */}
                <View style={styles.bannerContainer}>
                    <Image
                        source={{ uri: 'https://picsum.photos/seed/osbanner/800/400' }}
                        style={styles.banner}
                    />
                    <View style={styles.storeProfile}>
                        <Image
                            source={{ uri: 'https://picsum.photos/seed/oslogo/200/200' }}
                            style={styles.storeLogo}
                        />
                        <View style={styles.storeInfo}>
                            <View style={styles.storeNameRow}>
                                <Text style={styles.storeName}>iBox Official Store</Text>
                                <Icon name="check-circle" size={16} color="#03AC0E" style={styles.verifiedIcon} />
                            </View>
                            <Text style={styles.storeSubtitle}>9.2jt Pengikut • Jakarta Pusat</Text>
                        </View>
                        <TouchableOpacity style={styles.followButton}>
                            <Text style={styles.followButtonText}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesContainer}
                    contentContainerStyle={styles.categoriesContent}
                >
                    {['Semua', 'iPhone', 'Mac', 'iPad', 'Watch', 'Accessories'].map((cat, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.categoryTab, index === 0 && styles.activeCategoryTab]}
                        >
                            <Text style={[styles.categoryTabText, index === 0 && styles.activeCategoryTabText]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Products */}
                <View style={styles.productSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Produk Unggulan</Text>
                        <Text style={styles.seeAllText}>Lihat Semua</Text>
                    </View>
                    <View style={styles.productGrid}>
                        {STORE_PRODUCT_DATA.map((item) => (
                            <ProductCard
                                key={item.id}
                                title={item.title}
                                price={item.price}
                                location={item.location}
                                rating={item.rating}
                                sold={item.sold}
                                imageUrl={item.imageUrl}
                            />
                        ))}
                    </View>
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
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.searchBarBackground,
        borderRadius: SIZES.radius,
        paddingHorizontal: SPACING.sm,
        height: normalize(36),
    },
    placeholderText: {
        fontSize: normalize(14),
        color: COLORS.grey,
        marginLeft: SPACING.xs,
    },
    headerIcons: {
        flexDirection: 'row',
        marginLeft: SPACING.sm,
    },
    iconButton: {
        marginLeft: SPACING.sm,
    },
    bannerContainer: {
        marginBottom: SPACING.md,
    },
    banner: {
        width: width,
        height: normalize(150),
        resizeMode: 'cover',
    },
    storeProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        marginTop: -normalize(30),
    },
    storeLogo: {
        width: normalize(70),
        height: normalize(70),
        borderRadius: normalize(35),
        borderWidth: 3,
        borderColor: COLORS.white,
        backgroundColor: COLORS.lightGrey,
    },
    storeInfo: {
        flex: 1,
        marginLeft: SPACING.sm,
        marginTop: normalize(20),
    },
    storeNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    storeName: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    verifiedIcon: {
        marginLeft: 4,
    },
    storeSubtitle: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginTop: 2,
    },
    followButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.md,
        paddingVertical: normalize(6),
        borderRadius: SIZES.radius,
        marginTop: normalize(20),
    },
    followButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(13),
    },
    categoriesContainer: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    categoriesContent: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
    },
    categoryTab: {
        paddingHorizontal: SPACING.md,
        paddingVertical: normalize(6),
        borderRadius: 20,
        marginRight: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    activeCategoryTab: {
        backgroundColor: COLORS.primary + '20',
        borderColor: COLORS.primary,
    },
    categoryTabText: {
        fontSize: normalize(14),
        color: COLORS.grey,
    },
    activeCategoryTabText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    productSection: {
        padding: SPACING.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    sectionTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    seeAllText: {
        fontSize: normalize(13),
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

export default OfficialStoreScreen;
