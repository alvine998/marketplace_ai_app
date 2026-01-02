import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import Toast from 'react-native-toast-message';
import SelectionModal from '../../components/Checkout/SelectionModal';

interface ShippingMethod {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    numericPrice: number;
    icon: string;
    iconColor?: string;
}

interface PaymentMethod {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    iconColor?: string;
}

const SHIPPING_METHODS: ShippingMethod[] = [
    { id: 'reg', title: 'Reguler', subtitle: 'Estimasi tiba 1 - 3 Jan', price: 'Rp 15.000', numericPrice: 15000, icon: 'truck' },
    { id: 'eco', title: 'Ekonomi', subtitle: 'Estimasi tiba 4 - 6 Jan', price: 'Rp 10.000', numericPrice: 10000, icon: 'package' },
    { id: 'inst', title: 'Instan', subtitle: 'Tiba dalam 3 jam', price: 'Rp 45.000', numericPrice: 45000, icon: 'zap', iconColor: '#FFA000' },
];

const PAYMENT_METHODS: PaymentMethod[] = [
    { id: 'gopay', title: 'Gopay', subtitle: 'Saldo: Rp 250.000', icon: 'wallet', iconColor: '#00AED6' },
    { id: 'ovo', title: 'OVO', subtitle: 'Saldo: Rp 120.000', icon: 'credit-card', iconColor: '#4C2A86' },
    { id: 'va_bca', title: 'BCA Virtual Account', subtitle: 'Dicek otomatis', icon: 'layers' },
    { id: 'cc', title: 'Kartu Kredit', subtitle: 'Visa / Mastercard', icon: 'credit-card' },
];

const CheckoutScreen = ({ route, navigation }: any) => {
    const { product } = route.params || {};

    const [selectedShipping, setSelectedShipping] = React.useState(SHIPPING_METHODS[0]);
    const [selectedPayment, setSelectedPayment] = React.useState(PAYMENT_METHODS[0]);

    const [shippingVisible, setShippingVisible] = React.useState(false);
    const [paymentVisible, setPaymentVisible] = React.useState(false);

    // Dynamic price calculation
    const basePrice = product?.price ? parseInt(product.price.replace(/[^\d]/g, '')) : 0;
    const adminFee = 1000;
    const totalPrice = basePrice + selectedShipping.numericPrice + adminFee;

    const formatCurrency = (val: number) => {
        return 'Rp ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pengiriman</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Address Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Alamat Pengiriman</Text>
                    <View style={styles.addressBox}>
                        <View style={styles.addressHeader}>
                            <Text style={styles.addressName}>Rumah • Alvin</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('AddressList')}>
                                <Text style={styles.changeText}>Ganti</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.addressText}>Jl. Sudirman No. 123, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190</Text>
                    </View>
                </View>

                {/* Product Section */}
                {product && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pesanan</Text>
                        <View style={styles.productRow}>
                            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
                            <View style={styles.productDetails}>
                                <Text style={styles.productTitle} numberOfLines={2}>{product.title}</Text>
                                <Text style={styles.productPrice}>{product.price}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Delivery Options */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pilih Pengiriman</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setShippingVisible(true)}
                    >
                        <View style={styles.dropdownLeft}>
                            <Icon name={selectedShipping.icon} size={20} color={COLORS.primary} style={{ marginRight: 12 }} />
                            <View>
                                <Text style={styles.dropdownTitle}>{selectedShipping.title}</Text>
                                <Text style={styles.dropdownSub}>{selectedShipping.subtitle}</Text>
                            </View>
                        </View>
                        <View style={styles.dropdownRight}>
                            <Text style={styles.deliveryPrice}>{selectedShipping.price}</Text>
                            <Icon name="chevron-right" size={normalize(20)} color={COLORS.grey} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Payment Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setPaymentVisible(true)}
                    >
                        <View style={styles.paymentMethod}>
                            <Icon name={selectedPayment.icon} size={normalize(20)} color={selectedPayment.iconColor || COLORS.primary} />
                            <Text style={styles.paymentText}>{selectedPayment.title}</Text>
                        </View>
                        <Icon name="chevron-right" size={normalize(20)} color={COLORS.grey} />
                    </TouchableOpacity>
                </View>

                {/* Summary Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ringkasan Pembayaran</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total Harga (1 Barang)</Text>
                        <Text style={styles.summaryValue}>{product?.price || "Rp 0"}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total Ongkos Kirim</Text>
                        <Text style={styles.summaryValue}>{selectedShipping.price}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Biaya Layanan</Text>
                        <Text style={styles.summaryValue}>{formatCurrency(adminFee)}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>Total Tagihan</Text>
                        <Text style={styles.totalValue}>{formatCurrency(totalPrice)}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.footerTotal}>
                    <Text style={styles.totalLabelSmall}>Total Tagihan</Text>
                    <Text style={styles.totalValueLarge}>{formatCurrency(totalPrice)}</Text>
                </View>
                <TouchableOpacity
                    style={styles.payButton}
                    onPress={() => {
                        navigation.navigate('PaymentSuccess', {
                            total: formatCurrency(totalPrice),
                            paymentMethod: selectedPayment.title,
                        });
                    }}
                >
                    <Text style={styles.payButtonText}>Bayar Sekarang</Text>
                </TouchableOpacity>
            </View>

            {/* Modals */}
            <SelectionModal
                visible={shippingVisible}
                onClose={() => setShippingVisible(false)}
                title="Pilih Pengiriman"
                data={SHIPPING_METHODS}
                selectedValue={selectedShipping.id}
                onSelect={(item) => {
                    setSelectedShipping(item as any as ShippingMethod);
                    setShippingVisible(false);
                }}
            />

            <SelectionModal
                visible={paymentVisible}
                onClose={() => setPaymentVisible(false)}
                title="Metode Pembayaran"
                data={PAYMENT_METHODS}
                selectedValue={selectedPayment.id}
                onSelect={(item) => {
                    setSelectedPayment(item as any as PaymentMethod);
                    setPaymentVisible(false);
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        height: normalize(56),
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
        marginLeft: SPACING.md,
    },
    section: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        marginTop: SPACING.sm,
    },
    sectionTitle: {
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.md,
    },
    addressBox: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        padding: SPACING.md,
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xs,
    },
    addressName: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    changeText: {
        fontSize: normalize(14),
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    addressText: {
        fontSize: normalize(13),
        color: COLORS.grey,
        lineHeight: normalize(18),
    },
    productRow: {
        flexDirection: 'row',
    },
    productImage: {
        width: normalize(60),
        height: normalize(60),
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGrey,
    },
    productDetails: {
        flex: 1,
        marginLeft: SPACING.md,
    },
    productTitle: {
        fontSize: normalize(14),
        color: COLORS.black,
        marginBottom: 4,
    },
    productPrice: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        padding: SPACING.md,
    },
    dropdownLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdownTitle: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    dropdownSub: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    deliveryPrice: {
        fontSize: normalize(14),
        color: COLORS.black,
        marginRight: SPACING.xs,
    },
    dropdownRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentText: {
        fontSize: normalize(14),
        color: COLORS.black,
        marginLeft: SPACING.sm,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    summaryLabel: {
        fontSize: normalize(14),
        color: COLORS.grey,
    },
    summaryValue: {
        fontSize: normalize(14),
        color: COLORS.black,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.sm,
    },
    totalLabel: {
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    totalValue: {
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    footerTotal: {
        flex: 1,
    },
    totalLabelSmall: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    totalValueLarge: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: '#D80032',
    },
    payButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.sm,
        borderRadius: SIZES.radius,
    },
    payButtonText: {
        color: COLORS.white,
        fontSize: normalize(14),
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;
