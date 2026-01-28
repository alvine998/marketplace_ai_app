import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

const SellerOrderDetailScreen = ({ route, navigation }: any) => {
    // In a real app, fetch order details by ID from route.params.orderId
    const { orderId, readonly } = route.params || {};

    const handleAccept = () => {
        Alert.alert('Sukses', 'Pesanan diterima');
        navigation.goBack();
    };

    const handleCancel = () => {
        Alert.alert('Konfirmasi', 'Yakin ingin membatalkan pesanan?', [
            { text: 'Tidak', style: 'cancel' },
            { text: 'Ya', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detail Pesanan</Text>
            </View>

            <ScrollView contentContainerStyle={[styles.scrollContent, readonly && { paddingBottom: SPACING.md }]}>
                {/* Order Info Header */}
                <View style={styles.sectionHeader}>
                    <View style={styles.rowBetween}>
                        <View>
                            <Text style={styles.label}>Order Id</Text>
                            <Text style={styles.value}>{orderId || '1319872402'}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.label}>No. Resi</Text>
                            <Text style={styles.value}>JD132145R32</Text>
                        </View>
                    </View>
                    <View style={styles.marginTop}>
                        <Text style={styles.label}>Waktu Pembelian</Text>
                        <Text style={styles.valueSM}>23/05/2021 08:09</Text>
                    </View>
                    <View style={styles.marginTop}>
                        <Text style={styles.label}>Status Pemesanan</Text>
                        <Text style={styles.valueSM}>Belum melakukan pembayaran</Text>
                    </View>
                </View>

                {/* Customer Info */}
                <View style={styles.section}>
                    <View style={styles.customerRow}>
                        <View style={styles.avatar} />
                        <View style={styles.customerInfo}>
                            <Text style={styles.customerName}>Nato</Text>
                            <View style={styles.locationRow}>
                                <Icon name="user" size={12} color={COLORS.primary} />
                                <Text style={styles.locationText}> Kab. Bekasi</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Product List */}
                <View style={styles.section}>
                    <View style={styles.productRow}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/60' }}
                            style={styles.productImage}
                        />
                        <View style={styles.productDetail}>
                            <Text style={styles.productName}>Balsem Geliga</Text>
                            <Text style={styles.productDesc}>Untuk mengobati pegel- pegel & masuk angin</Text>
                        </View>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.label}>Jumlah</Text>
                        <Text style={styles.value}>1</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.label}>Harga</Text>
                        <Text style={styles.value}>Rp1.000.000</Text>
                    </View>
                </View>

                {/* Shipping Info */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Icon name="truck" size={20} color={COLORS.primary} style={{ marginRight: 8 }} />
                        <Text style={styles.subHeading}>Pilih Pengiriman</Text>
                    </View>
                    <Text style={styles.shippingName}>Same Day (Rp14.1500 - Rp15.000)</Text>
                    <Text style={styles.shippingDesc}>Estimasi tiba hari ini - besok</Text>
                </View>

                {/* Payment Breakdown */}
                <View style={styles.section}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.label}>Total Pembelanjaan</Text>
                        <Text style={styles.value}>Rp1.000.000</Text>
                    </View>
                    <View style={styles.rowBetween}>
                        <Text style={styles.label}>Ongkos Kirim</Text>
                        <Text style={styles.value}>Rp15.000</Text>
                    </View>
                    <View style={styles.rowBetween}>
                        <Text style={styles.label}>Biaya Penanganan</Text>
                        <Text style={styles.value}>Rp2.500</Text>
                    </View>
                    <View style={[styles.rowBetween, styles.marginTop]}>
                        <Text style={styles.label}>Total Biaya</Text>
                        <Text style={styles.value}>Rp1.017.500</Text>
                    </View>
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={[styles.label, { marginBottom: 8 }]}>Metode Pembayaran</Text>
                    <View style={styles.rowBetween}>
                        <View style={styles.row}>
                            <Icon name="credit-card" size={20} color={COLORS.primary} />
                            <Text style={[styles.value, { marginLeft: 8 }]}>BRI Syariah</Text>
                        </View>
                        <Text style={styles.value}>Rp1.011.500</Text>
                    </View>
                    <Text style={styles.transferNote}>Transfer ke no rek xxxxxxxxxxxx</Text>
                </View>

                {/* Address */}
                <View style={styles.section}>
                    <Text style={[styles.label, { marginBottom: 8 }]}>Alamat penerima</Text>
                    <View style={styles.addressBox}>
                        <Text style={styles.addressText}>Jl. Movieland Bekasi</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Bottom Actions - Hidden if readonly */}
            {!readonly && (
                <View style={styles.bottomActions}>
                    <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                        <Text style={styles.acceptButtonText}>Terima Pesanan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                        <Text style={styles.cancelButtonText}>Cancel Pesanan</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
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
    scrollContent: {
        paddingBottom: 100, // Space for bottom actions
    },
    sectionHeader: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
    },
    section: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    marginTop: {
        marginTop: SPACING.sm,
    },
    label: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    value: {
        fontSize: normalize(14),
        color: COLORS.black,
        fontWeight: '500',
    },
    valueSM: {
        fontSize: normalize(13),
        color: COLORS.black,
        fontWeight: '500',
    },
    customerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#eee',
        marginRight: SPACING.md,
    },
    customerInfo: {
        justifyContent: 'center',
    },
    customerName: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    locationText: {
        fontSize: normalize(12),
        color: COLORS.black,
    },
    productRow: {
        flexDirection: 'row',
        marginBottom: SPACING.md,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginRight: SPACING.md,
    },
    productDetail: {
        flex: 1,
    },
    productName: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    productDesc: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginTop: 2,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    subHeading: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    shippingName: {
        fontSize: normalize(14),
        color: COLORS.black,
        marginTop: 8,
        fontWeight: '500',
    },
    shippingDesc: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginTop: 2,
    },
    transferNote: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginTop: 4,
    },
    addressBox: {
        backgroundColor: '#F9F9F9',
        padding: SPACING.sm,
        borderRadius: 4,
    },
    addressText: {
        fontSize: normalize(14),
        color: COLORS.black,
    },
    bottomActions: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        flexDirection: 'column',
    },
    acceptButton: {
        backgroundColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    acceptButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(16),
    },
    cancelButton: {
        backgroundColor: '#D1D5DB', // Light grey
        padding: SPACING.md,
        borderRadius: 4,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(16),
    },
});

export default SellerOrderDetailScreen;
