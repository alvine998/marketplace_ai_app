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
    BackHandler,
    ToastAndroid,
    Platform,
} from 'react-native';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import HomeHeader from '../../components/Home/HomeHeader';
import BannerSlider from '../../components/Home/BannerSlider';
import CategoryList from '../../components/Home/CategoryList';
import Icon from 'react-native-vector-icons/Feather';
import ProductCard from '../../components/Home/ProductCard';
import normalize from 'react-native-normalize';
import { useResponsive } from '../../utils/responsive';
import { Dimensions } from 'react-native';
import { useTranslation } from '../../context/LanguageContext';
import PromotionModal from '../../components/Home/PromotionModal';
import FlashSale from '../../components/Home/FlashSale';
import AdCard from '../../components/Home/AdCard';
import { useAuth } from '../../context/AuthContext';
import HomeSkeleton from '../../components/Home/HomeSkeleton';

const PRODUCT_DATA = [
    {
        type: 'mixed_row',
        id: 'row1',
        left: { type: 'flash_sale', id: 'fs1' },
        right: {
            type: 'product',
            id: 'p1',
            title: 'Premium White T-Shirt Cotton Combed 30s',
            price: 'Rp 25.000',
            location: 'Bekasi Barat',
            rating: '5.0',
            sold: '500',
            imageUrl: 'https://picsum.photos/seed/tshirt/400/400',
            discountPercentage: '30%',
            hasExtraVoucher: true,
            isFreeShipping: true,
            isDiscountedPrice: true,
        },
    },
    {
        type: 'mixed_row',
        id: 'row2',
        left: {
            type: 'product',
            id: 'p2',
            title: 'Nike Air Max 270 Black Anthracite',
            price: 'Rp 2.199.000',
            location: 'Jakarta Utara',
            rating: '4.9',
            sold: '250',
            imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
            discountPercentage: '10%',
            hasExtraVoucher: true,
            isFreeShipping: true,
            isDiscountedPrice: true,
        },
        right: {
            type: 'ad',
            id: 'ad1',
            imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
            overlayText: 'ORDER SEKARANG',
            subText: 'MAKAN SEHAT'
        }
    },
    {
        type: 'product_row',
        id: 'row3',
        products: [
            {
                id: 'p3',
                title: 'Batik Pria Modern Slimfit Eksklusif',
                price: 'Rp 125.000',
                location: 'Solo',
                rating: '4.8',
                sold: '1.2rb',
                imageUrl: 'https://picsum.photos/seed/batik/400/400',
                discountPercentage: '15%',
                hasExtraVoucher: false,
                isFreeShipping: true,
                isDiscountedPrice: false,
            },
            {
                id: 'p4',
                title: 'Smartwatch Ultra 2 Series GPS 49mm',
                price: 'Rp 13.999.000',
                location: 'Jakarta Pusat',
                rating: '5.0',
                sold: '80',
                imageUrl: 'https://images.unsplash.com/photo-1544117518-30df5780991d?w=400&q=80',
                discountPercentage: '5%',
                hasExtraVoucher: false,
                isFreeShipping: false,
                isDiscountedPrice: false,
            }
        ]
    }
];

const HomeScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isLoggedIn } = useAuth();
    const [isLoading, setIsLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [promoVisible, setPromoVisible] = React.useState(false);
    const [backPressCount, setBackPressCount] = React.useState(0);

    React.useEffect(() => {
        // Simulate initial loading
        const loadTimer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(loadTimer);
    }, []);

    React.useEffect(() => {
        const backAction = () => {
            if (isLoggedIn && navigation.isFocused()) {
                if (backPressCount === 1) {
                    BackHandler.exitApp();
                    return true;
                }

                setBackPressCount(1);
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Tekan sekali lagi untuk keluar', ToastAndroid.SHORT);
                }

                setTimeout(() => {
                    setBackPressCount(0);
                }, 2000);

                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [isLoggedIn, backPressCount, navigation]);

    React.useEffect(() => {
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

    const renderHeader = () => (
        <View>
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
            <BannerSlider />
            <CategoryList />
            <View style={styles.productSection}>
                <Text style={styles.sectionTitle}>{t('common.recommendation')}</Text>
            </View>
        </View>
    );

    const renderCard = (item: any) => {
        switch (item.type) {
            case 'flash_sale':
                return <FlashSale />;
            case 'ad':
                return (
                    <AdCard
                        imageUrl={item.imageUrl}
                        overlayText={item.overlayText}
                        subText={item.subText}
                        onPress={() => navigation.navigate('AdDetail', {
                            imageUrl: item.imageUrl,
                            title: item.subText || 'Promo Spesial',
                            description: `Dapatkan penawaran terbaik untuk ${item.subText || 'produk ini'} hanya di platform kami!`
                        })}
                    />
                );
            case 'product':
                return <ProductCard {...item} width="100%" />;
            default:
                return null;
        }
    };

    const renderItem = ({ item }: { item: any }) => {
        if (item.type === 'mixed_row') {
            return (
                <View style={styles.productRow}>
                    <View style={{ width: '49.3%' }}>
                        {renderCard(item.left)}
                    </View>
                    <View style={{ width: '49.3%' }}>
                        {renderCard(item.right)}
                    </View>
                </View>
            );
        }
        if (item.type === 'product_row') {
            return (
                <View style={styles.productRow}>
                    {item.products.map((p: any) => (
                        <ProductCard key={p.id} {...p} width="49.3%" />
                    ))}
                </View>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <HomeHeader />
            {isLoading ? (
                <HomeSkeleton />
            ) : (
                <FlatList
                    data={PRODUCT_DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ListHeaderComponent={renderHeader}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
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
        backgroundColor: '#F3F4F6', // Slightly more neutral grey to make white cards pop
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
        marginTop: SPACING.sm,
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
    flashSaleWrapper: {
        paddingHorizontal: SPACING.md,
        marginBottom: SPACING.md,
    },
    adWrapper: {
        paddingHorizontal: SPACING.md,
        marginBottom: SPACING.md,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.sm,
    },
});

export default HomeScreen;
