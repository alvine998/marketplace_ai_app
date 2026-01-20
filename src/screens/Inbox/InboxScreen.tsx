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
import { useAuth } from '../../context/AuthContext';
import { getChatRooms, ChatRoom } from '../../services/chatService';
import { RefreshControl } from 'react-native';
import Skeleton from '../../components/Common/Skeleton';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

const InboxScreen = ({ navigation }: any) => {
    const { user, isLoggedIn } = useAuth();
    const [rooms, setRooms] = React.useState<ChatRoom[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const fetchRooms = async (showLoading = true) => {
        if (!isLoggedIn || !user?.id) return;

        if (showLoading) setIsLoading(true);
        try {
            const data = await getChatRooms(user.id);
            setRooms(data);
        } catch (error) {
            console.error('Error fetching chat rooms:', error);
        } finally {
            if (showLoading) setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchRooms();
    }, [isLoggedIn, user?.id]);

    const onRefresh = async () => {
        setIsRefreshing(true);
        await fetchRooms(false);
        setIsRefreshing(false);
    };

    const formatTime = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), {
                addSuffix: true,
                locale: id,
            });
        } catch (e) {
            return dateString;
        }
    };

    const renderSkeleton = () => (
        <View style={styles.listContainer}>
            {[1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={styles.chatItem}>
                    <Skeleton width={normalize(50)} height={normalize(50)} borderRadius={25} />
                    <View style={styles.content}>
                        <View style={styles.itemHeader}>
                            <Skeleton width={normalize(120)} height={normalize(16)} />
                            <Skeleton width={normalize(60)} height={normalize(12)} />
                        </View>
                        <View style={styles.messageRow}>
                            <Skeleton width="80%" height={normalize(13)} style={{ marginTop: 8 }} />
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );

    const renderItem = ({ item }: { item: ChatRoom }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatDetail', {
                roomId: item.id,
                participantName: item.participant.username,
                participantId: item.participant.id
            })}
        >
            <View style={styles.shopImageContainer}>
                {item.participant.avatar ? (
                    <Image source={{ uri: item.participant.avatar }} style={styles.shopImage} />
                ) : (
                    <View style={[styles.shopImage, styles.avatarPlaceholder]}>
                        <Icon name="user" size={normalize(24)} color={COLORS.grey} />
                    </View>
                )}
            </View>
            <View style={styles.content}>
                <View style={styles.itemHeader}>
                    <Text style={styles.shopName}>{item.participant.username}</Text>
                    <Text style={styles.itemTime}>{formatTime(item.updatedAt)}</Text>
                </View>
                <View style={styles.messageRow}>
                    <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
                    {item.unreadCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{item.unreadCount}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chat</Text>
                <TouchableOpacity style={styles.headerIcon}>
                    <Icon name="settings" size={normalize(22)} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchBar}>
                <Icon name="search" size={normalize(18)} color={COLORS.grey} />
                <Text style={styles.searchPlaceholder}>Cari kontak atau pesan</Text>
            </View>

            {isLoading && !isRefreshing ? (
                renderSkeleton()
            ) : (
                <FlatList
                    data={rooms}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Icon name="message-square" size={normalize(64)} color={COLORS.lightGrey} />
                            <Text style={styles.emptyText}>Belum ada pesan masuk</Text>
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
        paddingHorizontal: SPACING.md,
        height: normalize(56),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        flex: 1,
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
        marginLeft: SPACING.md,
    },
    headerIcon: {
        padding: SPACING.xs,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.searchBarBackground,
        margin: SPACING.md,
        paddingHorizontal: SPACING.md,
        height: normalize(40),
        borderRadius: SIZES.radius,
    },
    searchPlaceholder: {
        fontSize: normalize(14),
        color: COLORS.grey,
        marginLeft: SPACING.sm,
    },
    listContainer: {
        paddingHorizontal: SPACING.md,
    },
    chatItem: {
        flexDirection: 'row',
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    shopImage: {
        width: normalize(50),
        height: normalize(50),
        borderRadius: 25,
        backgroundColor: COLORS.lightGrey,
    },
    shopImageContainer: {
        position: 'relative',
    },
    avatarPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    content: {
        flex: 1,
        marginLeft: SPACING.md,
        justifyContent: 'center',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    shopName: {
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    itemTime: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        flex: 1,
        fontSize: normalize(13),
        color: COLORS.grey,
        marginRight: SPACING.md,
    },
    badge: {
        backgroundColor: '#FF4D4D',
        borderRadius: normalize(10),
        minWidth: normalize(18),
        height: normalize(18),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: COLORS.white,
        fontSize: normalize(10),
        fontWeight: 'bold',
    },
});

export default InboxScreen;
