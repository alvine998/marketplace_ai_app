import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import Toast from 'react-native-toast-message';

const BecomeSellerScreen = ({ navigation }: any) => {
    const [shopName, setShopName] = useState('');
    const [shopDescription, setShopDescription] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleRegister = () => {
        if (!shopName || !shopDescription) {
            Toast.show({
                type: 'error',
                text1: 'Data belum lengkap',
                text2: 'Mohon isi semua field untuk melanjutkan',
            });
            return;
        }

        // Mock registration logic
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.successContent}>
                    <View style={styles.successIconContainer}>
                        <Icon name="check-circle" size={normalize(80)} color={COLORS.primary} />
                    </View>
                    <Text style={styles.successTitle}>Pendaftaran Terkirim!</Text>
                    <Text style={styles.successSubtitle}>
                        Toko {shopName} sedang kami tinjau. Kami akan memberitahu Anda segera setelah toko Anda aktif.
                    </Text>
                    <TouchableOpacity
                        style={styles.primaryBtn}
                        onPress={() => navigation.navigate('HomeMain')}
                    >
                        <Text style={styles.primaryBtnText}>Kembali ke Beranda</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Buka Toko Gratis</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.heroSection}>
                        <Icon name="shopping-bag" size={normalize(60)} color={COLORS.primary} />
                        <Text style={styles.heroTitle}>Mulai Jualan di Marketplace</Text>
                        <Text style={styles.heroSubtitle}>
                            Jangkau jutaan pembeli dan kembangkan bisnismu sekarang juga.
                        </Text>
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.label}>Nama Toko</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Contoh: Toko Elektronik Jaya"
                            value={shopName}
                            onChangeText={setShopName}
                        />

                        <Text style={styles.label}>Deskripsi Toko</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Ceritakan sedikit tentang apa yang Anda jual..."
                            value={shopDescription}
                            onChangeText={setShopDescription}
                            multiline
                            numberOfLines={4}
                        />

                        <View style={styles.benefitSection}>
                            <Text style={styles.benefitTitle}>Keuntungan menjadi Seller:</Text>
                            <View style={styles.benefitItem}>
                                <Icon name="check" size={16} color={COLORS.primary} />
                                <Text style={styles.benefitText}>Bebas biaya pendaftaran</Text>
                            </View>
                            <View style={styles.benefitItem}>
                                <Icon name="check" size={16} color={COLORS.primary} />
                                <Text style={styles.benefitText}>Akses ke jutaan calon pembeli</Text>
                            </View>
                            <View style={styles.benefitItem}>
                                <Icon name="check" size={16} color={COLORS.primary} />
                                <Text style={styles.benefitText}>Platform yang aman dan terpercaya</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.primaryBtn} onPress={handleRegister}>
                    <Text style={styles.primaryBtnText}>Buka Toko Sekarang</Text>
                </TouchableOpacity>
            </View>
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
    scrollContent: {
        padding: SPACING.lg,
    },
    heroSection: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
        paddingVertical: SPACING.lg,
    },
    heroTitle: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: COLORS.black,
        marginTop: SPACING.md,
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: normalize(14),
        color: COLORS.grey,
        textAlign: 'center',
        marginTop: SPACING.xs,
        paddingHorizontal: SPACING.xl,
    },
    formSection: {
        marginBottom: SPACING.xl,
    },
    label: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.xs,
        marginTop: SPACING.md,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        padding: SPACING.md,
        fontSize: normalize(14),
        color: COLORS.black,
    },
    textArea: {
        height: normalize(100),
        textAlignVertical: 'top',
    },
    benefitSection: {
        marginTop: SPACING.xl,
        padding: SPACING.md,
        backgroundColor: COLORS.lightGrey,
        borderRadius: SIZES.radius,
    },
    benefitTitle: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.sm,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    benefitText: {
        fontSize: normalize(13),
        color: COLORS.grey,
        marginLeft: SPACING.xs,
    },
    footer: {
        padding: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    primaryBtn: {
        backgroundColor: COLORS.primary,
        height: normalize(48),
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(16),
    },
    successContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    successIconContainer: {
        marginBottom: SPACING.xl,
    },
    successTitle: {
        fontSize: normalize(24),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.sm,
        textAlign: 'center',
    },
    successSubtitle: {
        fontSize: normalize(15),
        color: COLORS.grey,
        textAlign: 'center',
        marginBottom: SPACING.xl * 2,
    },
});

export default BecomeSellerScreen;
