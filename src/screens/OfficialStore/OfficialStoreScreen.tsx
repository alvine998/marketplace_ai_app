import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import ProductCard from '../../components/Home/ProductCard';
import { useTranslation } from '../../context/LanguageContext';

const { width } = Dimensions.get('window');

const TOP_BRANDS = [
    { id: 'b1', name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
    { id: 'b2', name: 'Samsung', logo: 'https://logo.clearbit.com/samsung.com' },
    { id: 'b3', name: 'Nike', logo: 'https://logo.clearbit.com/nike.com' },
    { id: 'b4', name: 'Adidas', logo: 'https://logo.clearbit.com/adidas.com' },
    { id: 'b5', name: 'Sony', logo: 'https://logo.clearbit.com/sony.com' },
    { id: 'b6', name: 'Xiaomi', logo: 'https://logo.clearbit.com/xiaomi.com' },
];

const CAMPAIGNS = [
    { id: 'c1', image: 'https://picsum.photos/seed/camp1/800/300', title: 'Mid Year Sale' },
    { id: 'c2', image: 'https://picsum.photos/seed/camp2/800/300', title: 'Official Launch' },
];

const OFFICIAL_PRODUCTS = [
    {
        id: 'op1',
        title: 'Air Jordan 1 Low G Mens Golf Shoes',
        price: 'Rp 2.499.000',
        location: 'Jakarta Barat',
        rating: '4.9',
        sold: '50',
        imageUrl: 'https://picsum.photos/seed/os_p1/400/400',
        storeName: 'Nike Official Store',
    },
    {
        id: 'op2',
        title: 'Sony PlayStation 5 Console - Disc Edition',
        price: 'Rp 9.499.000',
        location: 'Jakarta Utara',
        rating: '5.0',
        sold: '100',
        imageUrl: 'https://picsum.photos/seed/os_p2/400/400',
        storeName: 'Sony Official Store',
    },
    {
        id: 'op3',
        title: 'Samsung Galaxy Watch6 44mm BT',
        price: 'Rp 4.299.000',
        location: 'Jakarta Selatan',
        rating: '4.8',
        sold: '200',
        imageUrl: 'https://picsum.photos/seed/os_p3/400/400',
        storeName: 'Samsung Official Store',
    },
    {
        id: 'op4',
        title: 'Xiaomi 13T 12/256GB Black',
        price: 'Rp 6.499.000',
        location: 'Jakarta Timur',
        rating: '4.9',
        sold: '150',
        imageUrl: 'https://picsum.photos/seed/os_p4/400/400',
        storeName: 'Xiaomi Official Store',
    },
];

const OfficialStoreScreen = () => {
    const navigation = useNavigation<any>();
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('Semua');

    const renderBrandItem = ({ item }: any) => (
        <TouchableOpacity style={styles.brandCard}>
            <View style={styles.brandLogoContainer}>
                <Image source={{ uri: item.logo }} style={styles.brandLogo} resizeMode="contain" />
            </View>
            <Text style={styles.brandItemName} numberOfLines={1}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderHeader = () => (
        <View style={styles.headerContent}>
            {/* Top Brands Section */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Brands</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>Lihat Semua</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={TOP_BRANDS}
                renderItem={renderBrandItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.brandsList}
            />

            {/* Campaign Banner */}
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.bannerScroller}
            >
                {CAMPAIGNS.map((camp) => (
                    <TouchableOpacity key={camp.id} activeOpacity={0.9}>
                        <Image source={{ uri: camp.image }} style={styles.bannerImage} />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Category Tabs */}
            <View style={styles.tabsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
                    {['Semua', 'Elektronik', 'Fashion', 'Olahraga', 'Gadget', 'Gaming'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Nav Header */}
            <View style={styles.navHeader}>
                <View style={styles.searchBar}>
                    <Icon name="search" size={18} color={COLORS.grey} />
                    <Text style={styles.searchText}>Cari di Official Store...</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
                        <Icon name="shopping-cart" size={normalize(22)} color={COLORS.black} />
                        <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Notifications')}>
                        <Icon name="bell" size={normalize(22)} color={COLORS.black} />
                        <View style={styles.dot} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={OFFICIAL_PRODUCTS}
                keyExtractor={(item) => item.id}
                numColumns={2}
                ListHeaderComponent={renderHeader}
                renderItem={({ item }) => (
                    <View style={styles.productWrapper}>
                        <ProductCard
                            {...item}
                            width="100%"
                        />
                        <View style={styles.officialBadgeContainer}>
                            <Icon name="check-circle" size={12} color={COLORS.primary} />
                            <Text style={styles.officialText}>Official Store</Text>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.columnWrapper}
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
    navHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F3F7',
        borderRadius: SIZES.radius,
        paddingHorizontal: SPACING.sm,
        height: normalize(38),
    },
    searchText: {
        marginLeft: SPACING.xs,
        color: COLORS.grey,
        fontSize: normalize(14),
    },
    headerIcons: {
        flexDirection: 'row',
        marginLeft: SPACING.sm,
    },
    iconBtn: {
        marginLeft: SPACING.md,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -6,
        backgroundColor: '#FF4D4D',
        borderRadius: 10,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 2,
    },
    badgeText: {
        color: COLORS.white,
        fontSize: normalize(10),
        fontWeight: 'bold',
    },
    dot: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF4D4D',
        borderWidth: 1,
        borderColor: COLORS.white,
    },
    headerContent: {
        backgroundColor: COLORS.white,
        paddingBottom: SPACING.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingTop: SPACING.md,
        marginBottom: SPACING.sm,
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
    brandsList: {
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.md,
    },
    brandCard: {
        alignItems: 'center',
        marginRight: SPACING.lg,
        width: normalize(60),
    },
    brandLogoContainer: {
        width: normalize(54),
        height: normalize(54),
        borderRadius: normalize(27),
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    brandLogo: {
        width: '70%',
        height: '70%',
    },
    brandItemName: {
        marginTop: 6,
        fontSize: normalize(11),
        color: COLORS.black,
        textAlign: 'center',
    },
    bannerScroller: {
        paddingVertical: SPACING.sm,
    },
    bannerImage: {
        width: width - (SPACING.md * 2),
        height: normalize(120),
        borderRadius: SIZES.radius,
        marginHorizontal: SPACING.md,
        resizeMode: 'cover',
    },
    tabsContainer: {
        marginTop: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    tabsContent: {
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.sm,
    },
    tab: {
        paddingHorizontal: SPACING.md,
        paddingVertical: normalize(6),
        borderRadius: 20,
        marginRight: SPACING.sm,
    },
    activeTab: {
        backgroundColor: COLORS.primary + '15',
    },
    tabText: {
        fontSize: normalize(14),
        color: COLORS.grey,
    },
    activeTabText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    listContent: {
        paddingBottom: SPACING.xl,
    },
    columnWrapper: {
        paddingHorizontal: SPACING.sm,
    },
    productWrapper: {
        flex: 0.5,
        padding: SPACING.xs,
        backgroundColor: COLORS.white,
        marginBottom: SPACING.sm,
        marginHorizontal: SPACING.xs,
        borderRadius: SIZES.radius,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
    },
    officialBadgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.xs,
        paddingBottom: SPACING.xs,
        marginTop: -SPACING.xs,
    },
    officialText: {
        fontSize: normalize(10),
        color: COLORS.primary,
        fontWeight: '600',
        marginLeft: 2,
    },
});

export default OfficialStoreScreen;
