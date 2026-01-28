import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

// Mock Data for History
const MOCK_HISTORY = [
    {
        id: '1319872405',
        status: 'DONE',
        total: 550000,
        date: '20/05/2021 14:30',
        statusCode: 'done',
        statusLabel: 'Selesai'
    },
    {
        id: '1319872406',
        status: 'CANCELLED',
        total: 120000,
        date: '18/05/2021 09:15',
        statusCode: 'cancelled',
        statusLabel: 'Dibatalkan'
    },
    {
        id: '1319872407',
        status: 'DONE',
        total: 340000,
        date: '15/05/2021 11:20',
        statusCode: 'done',
        statusLabel: 'Selesai'
    }
];

const SellerOrderHistoryScreen = ({ navigation }: any) => {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'done': return '#0288D1'; // Blue to match "Pesanan saya" reference
            case 'cancelled': return '#D32F2F'; // Red
            default: return COLORS.grey;
        }
    };

    const getStatusHeaderTitle = (item: any) => {
        return item.statusCode === 'cancelled' ? 'Pesanan Dibatalkan' : 'Pesanan saya';
    };

    // Helper to format currency
    const formatCurrency = (amount: number) => {
        return `Rp${amount.toLocaleString('id-ID').replace(/,/g, '.')}`;
    };

    const renderOrderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SellerOrderDetail', { orderId: item.id, readonly: true })}
        >
            {/* Colored Header */}
            <View style={[styles.cardHeader, { backgroundColor: getStatusColor(item.statusCode) }]}>
                <Icon
                    name="x"
                    size={20}
                    color={COLORS.white}
                    style={{ marginRight: SPACING.sm }}
                />
                <Text style={styles.cardHeaderTitle}>{getStatusHeaderTitle(item)}</Text>
            </View>

            {/* Content */}
            <View style={styles.cardContent}>
                <View style={styles.row}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.orderId}>{item.id}</Text>
                        <Text style={styles.statusText}>{item.statusLabel}</Text>
                        <Text style={styles.totalText}>Total {formatCurrency(item.total)}</Text>
                        <Text style={styles.dateText}>{item.date}</Text>
                    </View>
                    <Icon name="chevron-right" size={24} color="#CCC" />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Histori Pesanan</Text>
            </View>

            <FlatList
                data={MOCK_HISTORY}
                renderItem={renderOrderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: COLORS.primary,
        height: normalize(56),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
    },
    backButton: {
        marginRight: SPACING.md,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.white,
    },
    listContent: {
        padding: SPACING.md,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radiusSm,
        overflow: 'hidden',
        marginBottom: SPACING.md,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
    },
    cardHeaderTitle: {
        color: COLORS.white,
        fontSize: normalize(14),
        fontWeight: '500',
    },
    cardContent: {
        padding: SPACING.md,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoColumn: {
        flex: 1,
    },
    orderId: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 4,
    },
    statusText: {
        fontSize: normalize(14),
        color: COLORS.grey,
        marginBottom: 4,
    },
    totalText: {
        fontSize: normalize(14),
        color: COLORS.grey,
        marginBottom: 4,
    },
    dateText: {
        fontSize: normalize(12),
        color: COLORS.black,
    },
});

export default SellerOrderHistoryScreen;
