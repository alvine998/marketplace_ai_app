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
import { useAuth } from '../../context/AuthContext';
import { getTransactions, Transaction, TransactionStatus } from '../../services/transactionService';
import Skeleton from '../../components/Common/Skeleton';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ScrollView } from 'react-native-gesture-handler';

const STATUS_TABS: { label: string; value: TransactionStatus | 'all' }[] = [
    { label: 'Semua', value: 'all' },
    { label: 'Menunggu', value: 'pending' },
    { label: 'Dibayar', value: 'paid' },
    { label: 'Dikirim', value: 'shipped' },
    { label: 'Selesai', value: 'completed' },
    { label: 'Dibatalkan', value: 'cancelled' },
];

const TransactionScreen = () => {
    const { user, isLoggedIn } = useAuth();
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [status, setStatus] = React.useState<TransactionStatus | 'all'>('all');
    const [isLoading, setIsLoading] = React.useState(true);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [hasMore, setHasMore] = React.useState(true);

    const fetchTransactionsData = async (pageNum: number, shouldAppend: boolean = false) => {
        if (!isLoggedIn || !user?.id) return;

        if (pageNum === 1 && !isRefreshing) setIsLoading(true);

        try {
            const response = await getTransactions(user.id, status, pageNum);
            if (response.data) {
                setTransactions(prev => shouldAppend ? [...prev, ...response.data] : response.data);
                setHasMore(response.currentPage < response.totalPages);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    React.useEffect(() => {
        setPage(1);
        fetchTransactionsData(1);
    }, [isLoggedIn, user?.id, status]);

    const onRefresh = () => {
        setIsRefreshing(true);
        setPage(1);
        fetchTransactionsData(1);
    };

    const loadMore = () => {
        if (!isLoading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchTransactionsData(nextPage, true);
        }
    };

    const getStatusInfo = (status: TransactionStatus) => {
        switch (status) {
            case 'completed':
                return { label: 'Selesai', color: COLORS.primary, bg: '#E8F5E9' };
            case 'pending':
                return { label: 'Menunggu', color: '#F57C00', bg: '#FFF3E0' };
            case 'paid':
                return { label: 'Dibayar', color: '#2196F3', bg: '#E3F2FD' };
            case 'shipped':
                return { label: 'Dikirim', color: '#9C27B0', bg: '#F3E5F5' };
            case 'cancelled':
                return { label: 'Dibatalkan', color: '#D32F2F', bg: '#FFEBEE' };
            default:
                return { label: status, color: COLORS.grey, bg: '#F5F5F5' };
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount).replace('IDR', 'Rp');
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'dd MMM yyyy, HH:mm', { locale: id });
        } catch (e) {
            return dateString;
        }
    };

    const renderSkeleton = () => (
        <View style={styles.listContent}>
            {[1, 2, 3].map((i) => (
                <View key={i} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Skeleton width={normalize(70)} height={normalize(20)} borderRadius={4} />
                        <Skeleton width={normalize(100)} height={normalize(12)} />
                    </View>
                    <View style={styles.productRow}>
                        <Skeleton width={normalize(50)} height={normalize(50)} borderRadius={4} />
                        <View style={styles.productInfo}>
                            <Skeleton width="80%" height={normalize(14)} style={{ marginBottom: 4 }} />
                            <Skeleton width="40%" height={normalize(12)} />
                        </View>
                    </View>
                    <View style={styles.cardFooter}>
                        <View>
                            <Skeleton width={normalize(60)} height={normalize(10)} style={{ marginBottom: 4 }} />
                            <Skeleton width={normalize(100)} height={normalize(16)} />
                        </View>
                        <Skeleton width={normalize(80)} height={normalize(32)} borderRadius={6} />
                    </View>
                </View>
            ))}
        </View>
    );

    const renderItem = ({ item }: { item: Transaction }) => {
        const statusInfo = getStatusInfo(item.status);
        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
                        <Text style={[styles.statusText, { color: statusInfo.color }]}>
                            {statusInfo.label}
                        </Text>
                    </View>
                    <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
                </View>

                <View style={styles.productRow}>
                    <Icon name="package" size={normalize(40)} color={COLORS.lightGrey} style={styles.productIcon} />
                    <View style={styles.productInfo}>
                        <Text style={styles.productTitle} numberOfLines={1}>Transaksi #{item.id.slice(0, 8)}</Text>
                        <Text style={styles.quantityText}>Melalui {item.paymentMethod.replace('_', ' ')}</Text>
                    </View>
                </View>

                <View style={styles.cardFooter}>
                    <View>
                        <Text style={styles.totalLabel}>Total Belanja</Text>
                        <Text style={styles.totalPrice}>{formatCurrency(item.totalAmount)}</Text>
                    </View>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Detail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Daftar Transaksi</Text>
                <TouchableOpacity style={styles.headerIcon}>
                    <Icon name="search" size={22} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
                    {STATUS_TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab.value}
                            style={[styles.tab, status === tab.value && styles.activeTab]}
                            onPress={() => setStatus(tab.value)}
                        >
                            <Text style={[styles.tabText, status === tab.value && styles.activeTabText]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {isLoading && !isRefreshing ? (
                renderSkeleton()
            ) : (
                <FlatList
                    data={transactions}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
                    }
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Icon name="list" size={80} color={COLORS.lightGrey} />
                            <Text style={styles.emptyText}>Belum ada transaksi</Text>
                        </View>
                    }
                />
            )}
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
    productIcon: {
        marginRight: SPACING.sm,
    },
    tabsContainer: {
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    tabsContent: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
    },
    tab: {
        paddingHorizontal: SPACING.md,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    activeTab: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    tabText: {
        fontSize: normalize(13),
        color: COLORS.grey,
    },
    activeTabText: {
        color: COLORS.white,
        fontWeight: 'bold',
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
