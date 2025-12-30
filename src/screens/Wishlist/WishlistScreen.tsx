import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    RefreshControl,
} from 'react-native';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/Feather';

const WISHLIST_DATA = [
    {
        id: '1',
        title: 'Apple iPhone 15 Pro 128GB Blue Titanium',
        price: 'Rp 18.490.000',
        imageUrl: 'https://picsum.photos/seed/p1/400/400',
        isAvailable: true,
    },
    {
        id: '3',
        title: 'Sony WH-1000XM5 Wireless Noise Cancelling',
        price: 'Rp 4.499.000',
        imageUrl: 'https://picsum.photos/seed/p3/400/400',
        isAvailable: true,
    },
    {
        id: '5',
        title: 'Logitech G Pro X Superlight Wireless',
        price: 'Rp 1.599.000',
        imageUrl: 'https://picsum.photos/seed/p5/400/400',
        isAvailable: false,
    },
];

const WishlistScreen = () => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    }, []);

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.price}>{item.price}</Text>
                {!item.isAvailable && (
                    <Text style={styles.unavailable}>Stok Habis</Text>
                )}
                <View style={styles.actionRow}>
                    <TouchableOpacity style={[styles.button, !item.isAvailable && styles.disabledButton]}>
                        <Text style={styles.buttonText}>+ Keranjang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton}>
                        <Icon name="trash-2" size={18} color={COLORS.grey} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Wishlist ({WISHLIST_DATA.length})</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="search" size={22} color={COLORS.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="shopping-cart" size={22} color={COLORS.black} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={WISHLIST_DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name="heart" size={80} color={COLORS.lightGrey} />
                        <Text style={styles.emptyText}>Wishlist kamu masih kosong</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconButton: {
        padding: SPACING.xs,
        marginLeft: SPACING.sm,
    },
    listContent: {
        padding: SPACING.md,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SPACING.sm,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    image: {
        width: normalize(100),
        height: normalize(100),
        borderRadius: SIZES.radius,
    },
    content: {
        flex: 1,
        marginLeft: SPACING.sm,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: normalize(14),
        color: COLORS.black,
    },
    price: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
        marginTop: 4,
    },
    unavailable: {
        fontSize: normalize(12),
        color: 'red',
        marginTop: 4,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.sm,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: 20,
        flex: 1,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: COLORS.border,
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(12),
    },
    deleteButton: {
        padding: SPACING.xs,
        marginLeft: SPACING.sm,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: normalize(100),
    },
    emptyText: {
        fontSize: normalize(16),
        color: COLORS.grey,
        marginTop: SPACING.md,
    },
});

export default WishlistScreen;
