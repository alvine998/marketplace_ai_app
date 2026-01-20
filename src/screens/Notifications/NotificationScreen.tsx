import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useAuth } from '../../context/AuthContext';
import { getNotifications, Notification } from '../../services/notificationService';
import Skeleton from '../../components/Common/Skeleton';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
    const navigation = useNavigation<any>();
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchNotifications = useCallback(async (pageNum: number, refresh = false) => {
        if (!user?.id) return;

        try {
            const response = await getNotifications({
                userId: user.id,
                page: pageNum,
                limit: 10,
            });

            if (refresh) {
                setNotifications(response.data || []);
            } else {
                setNotifications(prev => [...prev, ...(response.data || [])]);
            }

            setHasMore(response.currentPage < response.totalPages);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
            setIsLoadingMore(false);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchNotifications(1, true);
    }, [fetchNotifications]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setPage(1);
        fetchNotifications(1, true);
    };

    const handleLoadMore = () => {
        if (!hasMore || isLoadingMore) return;
        setIsLoadingMore(true);
        const nextPage = page + 1;
        setPage(nextPage);
        fetchNotifications(nextPage);
    };

    const renderSkeleton = () => (
        <View style={styles.skeletonContainer}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <View key={i} style={styles.notificationItem}>
                    <Skeleton width={normalize(40)} height={normalize(40)} borderRadius={normalize(20)} />
                    <View style={styles.textContainer}>
                        <Skeleton width="60%" height={normalize(14)} style={{ marginBottom: 6 }} />
                        <Skeleton width="90%" height={normalize(12)} style={{ marginBottom: 4 }} />
                        <Skeleton width="30%" height={normalize(10)} />
                    </View>
                </View>
            ))}
        </View>
    );

    const getIcon = (type: string) => {
        switch (type) {
            case 'order':
                return { name: 'shopping-bag', color: COLORS.primary };
            case 'promo':
                return { name: 'tag', color: '#FF9800' };
            default:
                return { name: 'bell', color: COLORS.grey };
        }
    };

    const renderItem = ({ item }: { item: Notification }) => {
        const iconInfo = getIcon(item.type);
        return (
            <TouchableOpacity
                style={[styles.notificationItem, !item.isRead && styles.unreadItem]}
                onPress={() => {
                    // Placeholder for future detail navigation
                }}
            >
                <View style={[styles.iconContainer, { backgroundColor: iconInfo.color + '15' }]}>
                    <Icon name={iconInfo.name} size={normalize(20)} color={iconInfo.color} />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{item.title}</Text>
                        {!item.isRead && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                    <Text style={styles.time}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderFooter = () => {
        if (!isLoadingMore) return null;
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifikasi</Text>
                <View style={{ width: 24 }} />
            </View>

            {isLoading ? (
                renderSkeleton()
            ) : (
                <FlatList
                    data={notifications}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} colors={[COLORS.primary]} />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Icon name="bell-off" size={normalize(60)} color={COLORS.border} />
                            <Text style={styles.emptyText}>Belum ada notifikasi</Text>
                        </View>
                    }
                />
            )}
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
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    listContent: {
        flexGrow: 1,
    },
    notificationItem: {
        flexDirection: 'row',
        padding: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        alignItems: 'flex-start',
    },
    unreadItem: {
        backgroundColor: COLORS.primary + '05',
    },
    iconContainer: {
        width: normalize(40),
        height: normalize(40),
        borderRadius: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.md,
    },
    textContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    title: {
        fontSize: normalize(14),
        fontWeight: '600',
        color: COLORS.black,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
    },
    message: {
        fontSize: normalize(13),
        color: COLORS.grey,
        lineHeight: normalize(18),
        marginBottom: 6,
    },
    time: {
        fontSize: normalize(11),
        color: COLORS.grey,
    },
    skeletonContainer: {
        flex: 1,
    },
    footerLoader: {
        paddingVertical: SPACING.md,
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: normalize(100),
    },
    emptyText: {
        marginTop: SPACING.md,
        fontSize: normalize(16),
        color: COLORS.grey,
    },
});

export default NotificationScreen;
