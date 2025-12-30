import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { notificationService, Notification } from '../../services/notificationService';

const NOTIFICATIONS = [
    {
        id: '1',
        title: 'Pesanan Telah Sampai',
        message: 'Pesanan INV/20231227/MPL/3654218907 telah sampai di tujuan. Jangan lupa konfirmasi pesanan ya!',
        time: '2 jam yang lalu',
        type: 'transaction',
        icon: 'package',
    },
    {
        id: '2',
        title: 'Promo Flash Sale!',
        message: 'Diskon hingga 90% untuk produk pilihan hari ini. Cek sekarang sebelum kehabisan!',
        time: '5 jam yang lalu',
        type: 'promo',
        icon: 'zap',
    },
    {
        id: '3',
        title: 'Keamanan Akun',
        message: 'Ada upaya login baru ke akunmu. Jika ini bukan kamu, segera amankan akunmu.',
        time: '1 hari yang lalu',
        type: 'info',
        icon: 'shield',
    },
];

const NotificationScreen = ({ navigation }: any) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        const data = await notificationService.getNotifications();
        setNotifications(data);
        setLoading(false);
    };

    const renderItem = ({ item }: { item: Notification }) => (
        <TouchableOpacity style={styles.notificationItem}>
            <View style={[styles.iconContainer, (styles as any)[item.type] || styles.info]}>
                <Icon
                    name={item.type === 'order' ? 'package' : item.type === 'promo' ? 'zap' : 'message-circle'}
                    size={normalize(20)}
                    color={COLORS.white}
                />
            </View>
            <View style={styles.content}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemTime}>Baru saja</Text>
                </View>
                <Text style={styles.itemMessage} numberOfLines={2}>{item.message}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifikasi</Text>
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                    <Text style={[styles.tabText, styles.activeTabText]}>Transaksi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Promo</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={notifications}
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
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
        marginLeft: SPACING.md,
    },
    tabs: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.md,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.sm,
    },
    tab: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: 20,
        marginRight: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    activeTab: {
        backgroundColor: COLORS.primary + '20',
        borderColor: COLORS.primary,
    },
    tabText: {
        fontSize: normalize(14),
        color: COLORS.grey,
    },
    activeTabText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    listContainer: {
        padding: SPACING.md,
    },
    notificationItem: {
        flexDirection: 'row',
        marginBottom: SPACING.xl,
    },
    iconContainer: {
        width: normalize(40),
        height: normalize(40),
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    transaction: {
        backgroundColor: COLORS.primary,
    },
    promo: {
        backgroundColor: '#FF5722',
    },
    info: {
        backgroundColor: '#2196F3',
    },
    content: {
        flex: 1,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    itemTitle: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    itemTime: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    itemMessage: {
        fontSize: normalize(13),
        color: COLORS.grey,
        lineHeight: normalize(18),
    },
});

export default NotificationScreen;
