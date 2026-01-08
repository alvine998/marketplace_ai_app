import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/Home/ProductCard';
import ShopRecommendations from '../../components/Home/ShopRecommendations';

const { width } = Dimensions.get('window');

const MOCK_REVIEWS = [
    {
        id: 'r1',
        user: 'Alvin E.',
        rating: 5,
        date: '2 hari lalu',
        comment: 'Barangnya asli, pengiriman cepat sekali. Packing sangat aman dengan bubble wrap tebal. Recommended seller!',
        avatar: 'https://picsum.photos/seed/u1/100/100',
    },
    {
        id: 'r2',
        user: 'Budi S.',
        rating: 4,
        date: '1 minggu lalu',
        comment: 'Kualitas produk sangat baik, sesuai deskripsi. Cuma agak telat dikit di kurirnya saja.',
        avatar: 'https://picsum.photos/seed/u2/100/100',
    },
];

const OTHER_PRODUCTS = [
    {
        id: 'opp1',
        title: 'Premium Leather Wallet',
        price: 'Rp 450.000',
        location: 'Jakarta Pusat',
        rating: '4.8',
        sold: '200+',
        imageUrl: 'https://picsum.photos/seed/op1/400/400',
    },
    {
        id: 'opp2',
        title: 'Minimalist Desktop Mat',
        price: 'Rp 125.000',
        location: 'Tangerang',
        rating: '4.9',
        sold: '1.2rb+',
        imageUrl: 'https://picsum.photos/seed/op2/400/400',
    },
    {
        id: 'opp3',
        title: 'Ergonomic Office Chair',
        price: 'Rp 2.199.000',
        location: 'Bekasi',
        rating: '4.7',
        sold: '50+',
        imageUrl: 'https://picsum.photos/seed/op3/400/400',
    },
];

const ProductDetailScreen = ({ route, navigation }: any) => {
    const { product } = route.params;
    const { addToCart, itemCount } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        Toast.show({
            type: 'success',
            text1: 'Berhasil',
            text2: 'Produk ditambahkan ke keranjang',
        });
    };

    const handleBuyNow = () => {
        navigation.navigate('Checkout', { product });
    };

    const handleChat = () => {
        navigation.navigate('Inbox');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>Produk Detail</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Icon name="share-2" size={normalize(22)} color={COLORS.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Cart')}>
                        <View>
                            <Icon name="shopping-cart" size={normalize(22)} color={COLORS.black} />
                            {itemCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{itemCount > 99 ? '99+' : itemCount}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: product.imageUrl }} style={styles.image} />

                <View style={styles.content}>
                    <Text style={styles.price}>{product.price}</Text>
                    <Text style={styles.title}>{product.title}</Text>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Icon name="star" size={normalize(14)} color="#FFC107" />
                            <Text style={styles.statText}>{product.rating}</Text>
                        </View>
                        <View style={styles.divider} />
                        <Text style={styles.statText}>Terjual {product.sold}</Text>
                    </View>

                    <View style={styles.infoDivider} />

                    <Text style={styles.sectionTitle}>Detail Produk</Text>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Kondisi</Text>
                        <Text style={styles.detailValue}>Baru</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Min. Pemesanan</Text>
                        <Text style={styles.detailValue}>1 Buah</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Etalase</Text>
                        <Text style={[styles.detailValue, { color: COLORS.primary }]}>Gadget Terbaru</Text>
                    </View>

                    <View style={styles.infoDivider} />

                    <Text style={styles.sectionTitle}>Deskripsi Produk</Text>
                    <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>

                    <View style={styles.infoDivider} />

                    <ShopRecommendations />

                    <View style={styles.infoDivider} />

                    {/* Reviews Section */}
                    <View style={styles.reviewHeader}>
                        <Text style={styles.sectionTitle}>Ulasan Pembeli</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>Lihat Semua</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ratingSummary}>
                        <View style={styles.ratingLeft}>
                            <Text style={styles.ratingMain}>4.9</Text>
                            <Text style={styles.ratingMax}>/ 5.0</Text>
                        </View>
                        <View style={styles.ratingRight}>
                            <View style={styles.starRow}>
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Icon key={s} name="star" size={normalize(14)} color="#FFC107" style={{ marginRight: 2 }} />
                                ))}
                            </View>
                            <Text style={styles.totalRatingText}>98% pembeli merasa puas</Text>
                        </View>
                    </View>

                    {MOCK_REVIEWS.map((review) => (
                        <View key={review.id} style={styles.reviewItem}>
                            <View style={styles.reviewUserRow}>
                                <Image source={{ uri: review.avatar }} style={styles.reviewerAvatar} />
                                <View style={styles.reviewerInfo}>
                                    <Text style={styles.reviewerName}>{review.user}</Text>
                                    <View style={styles.reviewerMeta}>
                                        <View style={styles.starRow}>
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Icon key={s} name="star" size={normalize(10)} color={s <= review.rating ? "#FFC107" : COLORS.lightGrey} />
                                            ))}
                                        </View>
                                        <Text style={styles.reviewDate}>{review.date}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.reviewComment}>{review.comment}</Text>
                        </View>
                    ))}

                    <View style={styles.infoDivider} />

                    {/* Recommendations Section */}
                    <Text style={styles.sectionTitle}>Lainnya di Pretty Shop</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.recommendationList}
                    >
                        {OTHER_PRODUCTS.map((item) => (
                            <View key={item.id} style={styles.recommendationItem}>
                                <ProductCard {...item} width={normalize(150)} />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

            {/* Bottom Actions */}
            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
                    <Icon name="message-circle" size={normalize(20)} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <Text style={styles.addToCartText}>+ Keranjang</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
                    <Text style={styles.buyText}>Beli Sekarang</Text>
                </TouchableOpacity>
            </View>
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
        padding: SPACING.xs,
    },
    headerTitle: {
        flex: 1,
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
        marginLeft: SPACING.sm,
    },
    headerActions: {
        flexDirection: 'row',
    },
    headerIcon: {
        padding: SPACING.xs,
        marginLeft: SPACING.sm,
    },
    image: {
        width: width,
        height: width,
        resizeMode: 'cover',
    },
    content: {
        padding: SPACING.md,
    },
    price: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.xs,
    },
    title: {
        fontSize: normalize(16),
        color: COLORS.black,
        marginBottom: SPACING.md,
        lineHeight: normalize(22),
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statText: {
        fontSize: normalize(14),
        color: COLORS.grey,
        marginLeft: 4,
    },
    divider: {
        width: 1,
        height: normalize(14),
        backgroundColor: COLORS.border,
        marginHorizontal: SPACING.md,
    },
    infoDivider: {
        height: 8,
        backgroundColor: COLORS.lightGrey,
        marginHorizontal: -SPACING.md,
        marginVertical: SPACING.md,
    },
    sectionTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.md,
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    detailLabel: {
        fontSize: normalize(14),
        color: COLORS.grey,
    },
    detailValue: {
        fontSize: normalize(14),
        color: COLORS.black,
        fontWeight: '500',
    },
    description: {
        fontSize: normalize(14),
        color: COLORS.grey,
        lineHeight: normalize(20),
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.md,
    },
    seeAllText: {
        fontSize: normalize(14),
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    ratingSummary: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        marginBottom: SPACING.lg,
    },
    ratingLeft: {
        flexDirection: 'row',
        alignItems: 'baseline',
        borderRightWidth: 1,
        borderRightColor: COLORS.border,
        paddingRight: SPACING.md,
        marginRight: SPACING.md,
    },
    ratingMain: {
        fontSize: normalize(32),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    ratingMax: {
        fontSize: normalize(14),
        color: COLORS.grey,
        marginLeft: 4,
    },
    ratingRight: {
        flex: 1,
    },
    starRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    totalRatingText: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    reviewItem: {
        marginBottom: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: SPACING.md,
    },
    reviewUserRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    reviewerAvatar: {
        width: normalize(36),
        height: normalize(36),
        borderRadius: normalize(18),
    },
    reviewerInfo: {
        marginLeft: SPACING.sm,
    },
    reviewerName: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    reviewerMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewDate: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginLeft: SPACING.sm,
    },
    reviewComment: {
        fontSize: normalize(13),
        color: COLORS.black,
        lineHeight: normalize(18),
    },
    recommendationList: {
        paddingRight: SPACING.md,
        marginTop: SPACING.sm,
    },
    recommendationItem: {
        marginRight: SPACING.md,
    },
    bottomActions: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.white,
    },
    chatButton: {
        width: normalize(44),
        height: normalize(44),
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.sm,
    },
    addToCartButton: {
        flex: 1,
        height: normalize(44),
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.sm,
    },
    addToCartText: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    buyButton: {
        flex: 1,
        height: normalize(44),
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buyText: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.white,
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#FF4D4D',
        borderRadius: normalize(8),
        minWidth: normalize(16),
        height: normalize(16),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 2,
        borderWidth: 1.5,
        borderColor: COLORS.white,
    },
    badgeText: {
        color: COLORS.white,
        fontSize: normalize(9),
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProductDetailScreen;
