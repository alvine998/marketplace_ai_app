import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

// Mock Data matching the image
const MOCK_ORDERS = [
    {
        id: '1319872402',
        status: 'UNPAID', // Belum melakukan pembayaran
        total: 1011500,
        date: '23/05/2021 08:09',
        statusCode: 'waiting_payment'
    },
    {
        id: '1319872403',
        status: 'IN_PROGRESS', // Pesanan saya (Dalam Pengiriman/Proses)
        total: 1011500,
        date: '23/05/2021 08:09',
        statusCode: 'in_progress',
        statusLabel: 'Dalam Pengiriman'
    },
    {
        id: '1319872404',
        status: 'DONE', // Pesanan saya (Selesai - though this might go to history, showing here for Ref)
        total: 1011500,
        date: '23/05/2021 08:09',
        statusCode: 'done',
        statusLabel: 'Selesai'
    }
];

const SellerOrderCartScreen = ({ navigation }: any) => {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'waiting_payment': return '#EF5350'; // Red
            case 'in_progress': return '#0288D1'; // Blue
            case 'done': return '#00897B'; // Teal/Green
            default: return COLORS.grey;
        }
    };

    const getStatusHeaderTitle = (item: any) => {
        if (item.statusCode === 'waiting_payment') return 'Belum melakukan pembayaran';
        return 'Pesanan saya';
    };

    // Helper to format currency
    const formatCurrency = (amount: number) => {
        return `Rp${amount.toLocaleString('id-ID').replace(/,/g, '.')}`;
    };

    const renderOrderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SellerOrderDetail', { orderId: item.id })}
        >
            {/* Colored Header */}
            <View style={[styles.cardHeader, { backgroundColor: getStatusColor(item.statusCode) }]}>
                <Icon name="x" size={20} color={COLORS.white} style={{ marginRight: SPACING.sm }} />
                <Text style={styles.cardHeaderTitle}>{getStatusHeaderTitle(item)}</Text>
            </View>

            {/* Content */}
            <View style={styles.cardContent}>
                <View style={styles.row}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.orderId}>{item.id}</Text>
                        <Text style={styles.statusText}>
                            {item.statusCode === 'waiting_payment' ? 'Belum melakukan pembayaran' : item.statusLabel}
                        </Text>
                        <Text style={styles.totalText}>Belanja {formatCurrency(item.total)}</Text>
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
                <Text style={styles.headerTitle}>Keranjang Pesanan</Text>
            </View>

            <FlatList
                data={MOCK_ORDERS}
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

export default SellerOrderCartScreen;
