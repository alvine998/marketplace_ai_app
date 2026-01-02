import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Animated,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

const { width } = Dimensions.get('window');

const PaymentSuccessScreen = ({ navigation, route }: any) => {
    const { total, paymentMethod, orderId = `TRX-${Math.floor(Math.random() * 1000000)}` } = route.params || {};

    const scaleAnim = React.useRef(new Animated.Value(0)).current;
    const opacityAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                tension: 20,
                friction: 7,
                delay: 300,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                delay: 600,
            })
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Animated.View style={[styles.successIconContainer, { transform: [{ scale: scaleAnim }] }]}>
                    <View style={styles.successOuterCircle}>
                        <View style={styles.successInnerCircle}>
                            <Icon name="check" size={normalize(50)} color={COLORS.white} />
                        </View>
                    </View>
                </Animated.View>

                <Animated.View style={{ opacity: opacityAnim, alignItems: 'center' }}>
                    <Text style={styles.title}>Pembayaran Berhasil!</Text>
                    <Text style={styles.subtitle}>Terima kasih, pesananmu sedang kami siapkan.</Text>

                    <View style={styles.card}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>ID Transaksi</Text>
                            <Text style={styles.detailValue}>{orderId}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Metode Pembayaran</Text>
                            <Text style={styles.detailValue}>{paymentMethod || 'Gopay'}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.detailRow}>
                            <Text style={styles.totalLabel}>Total Bayar</Text>
                            <Text style={styles.totalValue}>{total || 'Rp 0'}</Text>
                        </View>
                    </View>
                </Animated.View>
            </View>

            <Animated.View style={[styles.footer, { opacity: opacityAnim }]}>
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => navigation.navigate('Transactions')}
                >
                    <Text style={styles.primaryBtnText}>Lihat Pesanan</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => navigation.navigate('HomeMain')}
                >
                    <Text style={styles.secondaryBtnText}>Belanja Lagi</Text>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.xl,
    },
    successIconContainer: {
        marginBottom: SPACING.xl,
    },
    successOuterCircle: {
        width: normalize(120),
        height: normalize(120),
        borderRadius: normalize(60),
        backgroundColor: COLORS.primary + '20',
        justifyContent: 'center',
        alignItems: 'center',
    },
    successInnerCircle: {
        width: normalize(90),
        height: normalize(90),
        borderRadius: normalize(45),
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    title: {
        fontSize: normalize(24),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: normalize(15),
        color: COLORS.grey,
        textAlign: 'center',
        marginBottom: SPACING.xl * 1.5,
    },
    card: {
        width: width - SPACING.xl * 2,
        backgroundColor: '#F8F9FA',
        borderRadius: SIZES.radius,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    detailLabel: {
        fontSize: normalize(14),
        color: COLORS.grey,
    },
    detailValue: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.sm,
    },
    totalLabel: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    totalValue: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    footer: {
        padding: SPACING.xl,
    },
    primaryBtn: {
        backgroundColor: COLORS.primary,
        height: normalize(48),
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    primaryBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(16),
    },
    secondaryBtn: {
        height: normalize(48),
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    secondaryBtnText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: normalize(16),
    },
});

export default PaymentSuccessScreen;
