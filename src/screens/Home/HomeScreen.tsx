import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    Text,
    RefreshControl,
    DimensionValue,
    TouchableOpacity,
} from 'react-native';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import HomeHeader from '../../components/Home/HomeHeader';
import BannerSlider from '../../components/Home/BannerSlider';
import CategoryList from '../../components/Home/CategoryList';
import Icon from 'react-native-vector-icons/Feather';
import ProductCard from '../../components/Home/ProductCard';
import normalize from 'react-native-normalize';
import { getGridColumns, isLargeScreen } from '../../utils/responsive';
import { Dimensions } from 'react-native';
import { useTranslation } from '../../context/LanguageContext';
import PromotionModal from '../../components/Home/PromotionModal';

const PRODUCT_DATA = [
    {
        id: '1',
        title: 'Apple iPhone 15 Pro 128GB Blue Titanium',
        price: 'Rp 18.490.000',
        location: 'Jakarta Barat',
        rating: '4.9',
        sold: '1rb+',
        imageUrl: 'https://picsum.photos/seed/p1/400/400',
    },
    {
        id: '2',
        title: 'Samsung Galaxy S24 Ultra 12/256GB Gray',
        price: 'Rp 19.999.000',
        location: 'Jakarta Selatan',
        rating: '5.0',
        sold: '500+',
        imageUrl: 'https://picsum.photos/seed/p2/400/400',
    },
    {
        id: '3',
        title: 'Sony WH-1000XM5 Wireless Noise Cancelling',
        price: 'Rp 4.499.000',
        location: 'Tangerang',
        rating: '4.8',
        sold: '2rb+',
        imageUrl: 'https://picsum.photos/seed/p3/400/400',
    },
    {
        id: '4',
        title: 'Instant Coffee Platinum Blend 500g',
        price: 'Rp 85.000',
        location: 'Bandung',
        rating: '4.7',
        sold: '10rb+',
        imageUrl: 'https://picsum.photos/seed/p4/400/400',
    },
];

const HomeScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const [refreshing, setRefreshing] = React.useState(false);
    const [promoVisible, setPromoVisible] = React.useState(false);

    React.useEffect(() => {
        // Show promo modal after 1.5s delay
        const timer = setTimeout(() => {
            setPromoVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const numColumns = getGridColumns();

    const renderHeader = () => (
        <View>
            <BannerSlider />
            <CategoryList />

            <View style={styles.sellerPromotion}>
                <View style={styles.sellerPromoLeft}>
                    <Icon name="shopping-bag" size={normalize(24)} color={COLORS.primary} />
                    <View style={styles.sellerPromoTextContainer}>
                        <Text style={styles.sellerPromoTitle}>Mulai Berjualan Yuk!</Text>
                        <Text style={styles.sellerPromoSubtitle}>Buka tokomu sekarang, gratis!</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.sellerPromoBtn}
                    onPress={() => navigation.navigate('BecomeSeller')}
                >
                    <Text style={styles.sellerPromoBtnText}>Buka Toko</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.productSection}>
                <Text style={styles.sectionTitle}>{t('common.recommendation')}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <HomeHeader />
            <FlatList
                data={PRODUCT_DATA}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                key={numColumns} // Force re-render if columns change
                renderItem={({ item }) => (
                    <View style={[styles.productItem, { width: `${100 / numColumns}%` as DimensionValue }]}>
                        <ProductCard
                            {...item}
                            width="100%"
                        />
                    </View>
                )}
                ListHeaderComponent={renderHeader}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
            <PromotionModal
                visible={promoVisible}
                onClose={() => setPromoVisible(false)}
                onPressCTA={() => {
                    setPromoVisible(false);
                    navigation.navigate('PromotionDetail');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    productSection: {
        paddingHorizontal: SPACING.md,
        marginTop: SPACING.sm,
    },
    sectionTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.md,
    },
    sellerPromotion: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary + '10',
        marginHorizontal: SPACING.md,
        marginTop: SPACING.lg,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.primary + '30',
    },
    sellerPromoLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    sellerPromoTextContainer: {
        marginLeft: SPACING.sm,
    },
    sellerPromoTitle: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    sellerPromoSubtitle: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    sellerPromoBtn: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: normalize(20),
    },
    sellerPromoBtnText: {
        color: COLORS.white,
        fontSize: normalize(12),
        fontWeight: 'bold',
    },
    listContent: {
        paddingBottom: SPACING.xl,
    },
    productItem: {
        paddingHorizontal: SPACING.sm,
        marginBottom: SPACING.md,
    },
});

export default HomeScreen;
