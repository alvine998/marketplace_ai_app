import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Dimensions,
    ScrollView,
    DimensionValue,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import ProductCard from '../../components/Home/ProductCard';
import SearchOverlay from '../../components/Home/SearchOverlay';
import FilterModal from '../../components/Category/FilterModal';
import { getGridColumns } from '../../utils/responsive';

const { width } = Dimensions.get('window');

// Mock data generator for specific categories
const getMockProducts = (categoryName: string) => [
    {
        id: `c1-${categoryName}`,
        title: `${categoryName} Premium Edition 2024`,
        price: 'Rp 5.499.000',
        location: 'Jakarta Barat',
        rating: '4.9',
        sold: '500+',
        imageUrl: `https://picsum.photos/seed/${categoryName}1/400/400`,
    },
    {
        id: `c2-${categoryName}`,
        title: `${categoryName} Limited Release`,
        price: 'Rp 2.299.000',
        location: 'Tangerang',
        rating: '4.8',
        sold: '1rb+',
        imageUrl: `https://picsum.photos/seed/${categoryName}2/400/400`,
    },
    {
        id: `c3-${categoryName}`,
        title: `${categoryName} Best Seller`,
        price: 'Rp 1.500.000',
        location: 'Bandung',
        rating: '4.7',
        sold: '2.5rb+',
        imageUrl: `https://picsum.photos/seed/${categoryName}3/400/400`,
    },
    {
        id: `c4-${categoryName}`,
        title: `${categoryName} New Arrival`,
        price: 'Rp 3.850.000',
        location: 'Jakarta Selatan',
        rating: '4.9',
        sold: '200+',
        imageUrl: `https://picsum.photos/seed/${categoryName}4/400/400`,
    },
    {
        id: `c5-${categoryName}`,
        title: `${categoryName} Smart Choice`,
        price: 'Rp 899.000',
        location: 'Surabaya',
        rating: '4.6',
        sold: '5rb+',
        imageUrl: `https://picsum.photos/seed/${categoryName}5/400/400`,
    },
    {
        id: `c6-${categoryName}`,
        title: `${categoryName} Exclusive Bundle`,
        price: 'Rp 12.499.000',
        location: 'Jakarta Pusat',
        rating: '5.0',
        sold: '50+',
        imageUrl: `https://picsum.photos/seed/${categoryName}6/400/400`,
    },
];

const CategoryProductListScreen = ({ route, navigation }: any) => {
    const { category } = route.params;
    const [searchVisible, setSearchVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [filters, setFilters] = useState({
        sort: 'relevant',
        minPrice: '',
        maxPrice: '',
        locations: [],
    });

    const numColumns = getGridColumns();

    // Filtering logic
    const allProducts = getMockProducts(category.name);

    const products = allProducts.filter(p => {
        const price = parseInt(p.price.replace(/[^0-9]/g, ''));
        if (filters.minPrice && price < parseInt(filters.minPrice)) return false;
        if (filters.maxPrice && price > parseInt(filters.maxPrice)) return false;
        if (filters.locations.length > 0 && !filters.locations.some(loc => p.location.includes(loc))) return false;
        return true;
    }).sort((a, b) => {
        if (filters.sort === 'price_asc') {
            return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
        }
        if (filters.sort === 'price_desc') {
            return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
        }
        return 0; // Default: Paling Sesuai
    });

    const handleApplyFilters = (newFilters: any) => {
        setFilters(newFilters);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.searchBar}
                    onPress={() => setSearchVisible(true)}
                >
                    <Icon name="search" size={normalize(18)} color={COLORS.grey} />
                    <Text style={styles.searchPlaceholder}>Cari di {category.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Cart')}>
                    <Icon name="shopping-cart" size={normalize(22)} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <SearchOverlay
                visible={searchVisible}
                onClose={() => setSearchVisible(false)}
            />

            {/* Filter/Sort Section */}
            <View style={styles.filterSection}>
                <TouchableOpacity style={styles.filterItem} onPress={() => setFilterVisible(true)}>
                    <Text style={styles.filterText}>Urutkan</Text>
                    <Icon name="chevron-down" size={normalize(16)} color={COLORS.grey} />
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity style={styles.filterItem} onPress={() => setFilterVisible(true)}>
                    <Icon name="filter" size={normalize(16)} color={COLORS.grey} />
                    <Text style={styles.filterText}>Filter</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickFilters}>
                    {filters.locations.map(loc => (
                        <TouchableOpacity key={loc} style={[styles.chip, styles.activeChip]}>
                            <Text style={[styles.chipText, styles.activeChipText]}>{loc}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.chip}>
                        <Text style={styles.chipText}>Lokasi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chip}>
                        <Text style={styles.chipText}>Harga</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chip}>
                        <Text style={styles.chipText}>Rating</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <FilterModal
                visible={filterVisible}
                onClose={() => setFilterVisible(false)}
                onApply={handleApplyFilters}
                currentFilters={filters}
            />

            {/* Product List */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                key={numColumns}
                renderItem={({ item }) => (
                    <View style={[styles.productWrapper, { width: `${100 / numColumns}%` as DimensionValue }]}>
                        <ProductCard {...item} width="100%" />
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={styles.listHeader}>
                        <Text style={styles.categoryTitle}>{category.name}</Text>
                        <Text style={styles.resultCount}>{products.length} Produk ditemukan</Text>
                    </View>
                }
            />
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
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        marginRight: SPACING.sm,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.searchBarBackground,
        paddingHorizontal: SPACING.sm,
        height: normalize(40),
        borderRadius: SIZES.radius,
    },
    searchPlaceholder: {
        fontSize: normalize(14),
        color: COLORS.grey,
        marginLeft: SPACING.xs,
    },
    headerIcon: {
        marginLeft: SPACING.sm,
    },
    filterSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterText: {
        fontSize: normalize(13),
        color: COLORS.black,
        marginHorizontal: 4,
    },
    divider: {
        width: 1,
        height: normalize(16),
        backgroundColor: COLORS.border,
        marginHorizontal: SPACING.md,
    },
    quickFilters: {
        flex: 1,
    },
    chip: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 15,
        paddingHorizontal: SPACING.md,
        paddingVertical: 4,
        marginRight: SPACING.xs,
    },
    activeChip: {
        borderColor: COLORS.primary,
        backgroundColor: '#E8F5E9',
    },
    chipText: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    activeChipText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    listContainer: {
        padding: SPACING.sm,
    },
    listHeader: {
        padding: SPACING.sm,
        marginBottom: SPACING.xs,
    },
    categoryTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    resultCount: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginTop: 2,
    },
    productWrapper: {
        padding: 4,
    },
});

export default CategoryProductListScreen;
