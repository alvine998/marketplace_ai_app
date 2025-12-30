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

const CHATS = [
    {
        id: '1',
        shopName: 'Official Store',
        lastMessage: 'Halo, stok iPhone 15 Pro Blue Titanium ready ya kak. Silahkan diorder.',
        time: '10:30',
        unreadCount: 1,
        imageUrl: 'https://picsum.photos/seed/shop1/100/100',
    },
    {
        id: '2',
        shopName: 'Samsung Official',
        lastMessage: 'Pesanan sedang diproses dan akan segera dikirim.',
        time: 'Kemarin',
        unreadCount: 0,
        imageUrl: 'https://picsum.photos/seed/shop2/100/100',
    },
    {
        id: '3',
        shopName: 'Sony Center',
        lastMessage: 'Baik, ditunggu konfirmasinya.',
        time: 'Senin',
        unreadCount: 0,
        imageUrl: 'https://picsum.photos/seed/shop3/100/100',
    },
];

const InboxScreen = ({ navigation }: any) => {
    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatDetail', {
                shopName: item.shopName,
                imageUrl: item.imageUrl
            })}
        >
            <Image source={{ uri: item.imageUrl }} style={styles.shopImage} />
            <View style={styles.content}>
                <View style={styles.itemHeader}>
                    <Text style={styles.shopName}>{item.shopName}</Text>
                    <Text style={styles.itemTime}>{item.time}</Text>
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

            <FlatList
                data={CHATS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
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
        backgroundColor: '#F44336',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
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
