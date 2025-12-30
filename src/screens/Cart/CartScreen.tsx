import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

const CART_ITEMS = [
    {
        id: '1',
        title: 'Apple iPhone 15 Pro 128GB Blue Titanium',
        price: 'Rp 18.490.000',
        imageUrl: 'https://picsum.photos/seed/p1/400/400',
        quantity: 1,
    },
    {
        id: '3',
        title: 'Sony WH-1000XM5 Wireless Noise Cancelling',
        price: 'Rp 4.499.000',
        imageUrl: 'https://picsum.photos/seed/p3/400/400',
        quantity: 1,
    },
];

const CartScreen = ({ navigation }: any) => {
    const renderItem = ({ item }: any) => (
        <View style={styles.cartItem}>
            <View style={styles.itemHeader}>
                <Icon name="check-square" size={normalize(20)} color={COLORS.primary} />
                <Text style={styles.shopName}>Official Store</Text>
            </View>
            <View style={styles.itemContent}>
                <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                    <View style={styles.quantityRow}>
                        <TouchableOpacity style={styles.quantityButton}>
                            <Icon name="minus" size={normalize(16)} color={COLORS.grey} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity style={styles.quantityButton}>
                            <Icon name="plus" size={normalize(16)} color={COLORS.primary} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity>
                            <Icon name="trash-2" size={normalize(20)} color={COLORS.grey} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Keranjang</Text>
            </View>

            <FlatList
                data={CART_ITEMS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Icon name="shopping-cart" size={normalize(64)} color={COLORS.lightGrey} />
                        <Text style={styles.emptyText}>Wah, keranjang belanjaanmu kosong!</Text>
                        <TouchableOpacity
                            style={styles.shopNowButton}
                            onPress={() => navigation.navigate('HomeMain')}
                        >
                            <Text style={styles.shopNowText}>Mulai Belanja</Text>
                        </TouchableOpacity>
                    </View>
                }
            />

            <View style={styles.footer}>
                <View style={styles.totalSection}>
                    <Text style={styles.totalLabel}>Total Harga</Text>
                    <Text style={styles.totalValue}>Rp 22.989.000</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutText}>Beli (2)</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        height: normalize(56),
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
        marginLeft: SPACING.md,
    },
    listContainer: {
        paddingVertical: SPACING.sm,
    },
    cartItem: {
        backgroundColor: COLORS.white,
        marginBottom: SPACING.sm,
        padding: SPACING.md,
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    shopName: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
        marginLeft: SPACING.sm,
    },
    itemContent: {
        flexDirection: 'row',
    },
    itemImage: {
        width: normalize(80),
        height: normalize(80),
        borderRadius: SIZES.radius,
    },
    itemDetails: {
        flex: 1,
        marginLeft: SPACING.md,
    },
    itemTitle: {
        fontSize: normalize(14),
        color: COLORS.black,
        marginBottom: SPACING.xs,
    },
    itemPrice: {
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.sm,
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: normalize(28),
        height: normalize(28),
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        marginHorizontal: SPACING.md,
        fontSize: normalize(14),
        color: COLORS.black,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    totalSection: {
        flex: 1,
    },
    totalLabel: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    totalValue: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: '#D80032',
    },
    checkoutButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.sm,
        borderRadius: SIZES.radius,
    },
    checkoutText: {
        color: COLORS.white,
        fontSize: normalize(14),
        fontWeight: 'bold',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: normalize(100),
    },
    emptyText: {
        fontSize: normalize(16),
        color: COLORS.grey,
        marginTop: SPACING.md,
        marginBottom: SPACING.xl,
    },
    shopNowButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.md,
        borderRadius: SIZES.radius,
    },
    shopNowText: {
        color: COLORS.white,
        fontSize: normalize(14),
        fontWeight: 'bold',
    },
});

export default CartScreen;
