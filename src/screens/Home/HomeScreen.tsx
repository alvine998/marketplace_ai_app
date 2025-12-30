import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    Text,
    RefreshControl,
} from 'react-native';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import HomeHeader from '../../components/Home/HomeHeader';
import BannerSlider from '../../components/Home/BannerSlider';
import CategoryList from '../../components/Home/CategoryList';
import ProductCard from '../../components/Home/ProductCard';
import normalize from 'react-native-normalize';

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

const HomeScreen = () => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <HomeHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <BannerSlider />
                <CategoryList />

                <View style={styles.productSection}>
                    <Text style={styles.sectionTitle}>Rekomendasi Untukmu</Text>
                    <View style={styles.productGrid}>
                        {PRODUCT_DATA.map((item) => (
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
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

export default HomeScreen;
