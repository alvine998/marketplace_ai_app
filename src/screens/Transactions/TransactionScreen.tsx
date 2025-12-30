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

const TRANSACTION_DATA = [
    {
        id: '1',
        status: 'Selesai',
        date: '28 Des 2025',
        title: 'Apple iPhone 15 Pro 128GB Blue Titanium',
        totalPrice: 'Rp 18.515.000',
        imageUrl: 'https://picsum.photos/seed/p1/200/200',
        quantity: 1,
    },
    {
        id: '2',
        status: 'Dikirim',
        date: '29 Des 2025',
        title: 'Sony WH-1000XM5 Wireless Noise Cancelling',
        totalPrice: 'Rp 4.515.000',
        imageUrl: 'https://picsum.photos/seed/p3/200/200',
        quantity: 1,
    },
];

const TransactionScreen = () => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    }, []);

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={[styles.statusBadge, { backgroundColor: item.status === 'Selesai' ? '#E8F5E9' : '#FFF3E0' }]}>
                    <Text style={[styles.statusText, { color: item.status === 'Selesai' ? COLORS.primary : '#F57C00' }]}>
                        {item.status}
                    </Text>
                </View>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>

            <View style={styles.productRow}>
                <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
                <View style={styles.productInfo}>
                    <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.quantityText}>{item.quantity} Barang</Text>
                </View>
            </View>

            <View style={styles.cardFooter}>
                <View>
                    <Text style={styles.totalLabel}>Total Belanja</Text>
                    <Text style={styles.totalPrice}>{item.totalPrice}</Text>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Beli Lagi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Daftar Transaksi</Text>
                <TouchableOpacity style={styles.headerIcon}>
                    <Icon name="search" size={22} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={TRANSACTION_DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name="list" size={80} color={COLORS.lightGrey} />
                        <Text style={styles.emptyText}>Belum ada transaksi</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    headerIcon: {
        padding: SPACING.xs,
    },
    listContent: {
        padding: SPACING.md,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    statusBadge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusText: {
        fontSize: normalize(12),
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    productImage: {
        width: normalize(50),
        height: normalize(50),
        borderRadius: 4,
    },
    productInfo: {
        flex: 1,
        marginLeft: SPACING.sm,
    },
    productTitle: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    quantityText: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginTop: 2,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.sm,
    },
    totalLabel: {
        fontSize: normalize(11),
        color: COLORS.grey,
    },
    totalPrice: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    actionButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.md,
        paddingVertical: 6,
        borderRadius: 6,
    },
    actionButtonText: {
        color: COLORS.white,
        fontSize: normalize(12),
        fontWeight: 'bold',
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

export default TransactionScreen;
