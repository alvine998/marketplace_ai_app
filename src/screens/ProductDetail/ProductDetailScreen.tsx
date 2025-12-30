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

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }: any) => {
    const { product } = route.params;
    const { addToCart } = useCart();

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
                        <Icon name="shopping-cart" size={normalize(22)} color={COLORS.black} />
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
});

export default ProductDetailScreen;
