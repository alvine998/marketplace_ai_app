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
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../context/AuthContext';
import { getSellerProfile, registerSeller, SellerProfile } from '../../services/sellerService';

const BecomeSellerScreen = ({ navigation }: any) => {
    const { user } = useAuth();
    const [storeName, setShopName] = useState('');
    const [description, setShopDescription] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingProfile, setIsCheckingProfile] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null);

    React.useEffect(() => {
        checkSellerProfile();
    }, [user?.id]);

    const checkSellerProfile = async () => {
        if (!user?.id) return;

        setIsCheckingProfile(true);
        try {
            const profile = await getSellerProfile();
            setSellerProfile(profile);
        } catch (error) {
            console.error('Error fetching seller profile:', error);
        } finally {
            setIsCheckingProfile(false);
        }
    };

    const handleRegister = async () => {
        if (!storeName || !description || !address) {
            Toast.show({
                type: 'error',
                text1: 'Data belum lengkap',
                text2: 'Mohon isi nama toko, deskripsi, dan alamat',
            });
            return;
        }

        if (!user?.id) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Session expired. Please login again.',
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await registerSeller({
                storeName,
                description,
                address,
                userId: user.id,
                // Logo upload requires an image picker library which is currently not installed.
                // leaving it undefined for now as it matches the optional interface in service.
            });

            // Check if successful (adjust based on your API response structure)
            if (response && !response.message?.toLowerCase().includes('error')) {
                setIsSuccess(true);
                // Refresh profile after successful registration
                checkSellerProfile();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Gagal Mendaftar',
                    text2: response.message || 'Terjadi kesalahan saat mendaftar',
                });
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            Toast.show({
                type: 'error',
                text1: 'Gagal Mendaftar',
                text2: error.message || 'Terjadi kesalahan sistem',
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isCheckingProfile) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContent]}>
                <Text>Loading seller profile...</Text>
            </SafeAreaView>
        );
    }

    // 1. Waiting Verification State
    if (sellerProfile && !sellerProfile.isVerified) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Status Pendaftaran</Text>
                </View>
                <View style={styles.successContent}>
                    <View style={styles.successIconContainer}>
                        <Icon name="clock" size={normalize(80)} color={COLORS.secondary} />
                    </View>
                    <Text style={styles.successTitle}>Menunggu Verifikasi</Text>
                    <Text style={styles.successSubtitle}>
                        Toko <Text style={{ fontWeight: 'bold' }}>{sellerProfile.storeName}</Text> sedang dalam proses peninjauan oleh Admin.
                        Mohon tunggu 1x24 jam.
                    </Text>
                    <TouchableOpacity
                        style={[styles.primaryBtn, { backgroundColor: COLORS.secondary }]}
                        onPress={() => navigation.navigate('HomeMain')}
                    >
                        <Text style={styles.primaryBtnText}>Kembali ke Beranda</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // 2. Dashboard/Detail State (Verified)
    if (sellerProfile && sellerProfile.isVerified) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Seller Dashboard</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileCard}>
                        <View style={styles.profileHeader}>
                            <View style={styles.avatarPlaceholder}>
                                <Icon name="shopping-bag" size={30} color={COLORS.white} />
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={styles.storeName}>{sellerProfile.storeName}</Text>
                                <Text style={styles.storeAddress}>{sellerProfile.address}</Text>
                                <View style={styles.ratingContainer}>
                                    <Icon name="star" size={14} color="#FFD700" />
                                    <Text style={styles.ratingText}>{sellerProfile.rating} / 5.0</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{sellerProfile.totalProducts}</Text>
                                <Text style={styles.statLabel}>Produk</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>0</Text>
                                <Text style={styles.statLabel}>Penjualan</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>0</Text>
                                <Text style={styles.statLabel}>Pengikut</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.actionBtn}>
                            <Icon name="plus-circle" size={24} color={COLORS.white} />
                            <Text style={styles.actionBtnText}>Tambah Produk</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: COLORS.secondary }]}>
                            <Icon name="settings" size={24} color={COLORS.white} />
                            <Text style={styles.actionBtnText}>Pengaturan Toko</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    if (isSuccess) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.successContent}>
                    <View style={styles.successIconContainer}>
                        <Icon name="check-circle" size={normalize(80)} color={COLORS.primary} />
                    </View>
                    <Text style={styles.successTitle}>Pendaftaran Terkirim!</Text>
                    <Text style={styles.successSubtitle}>
                        Toko {storeName} berhasil didaftarkan. Mohon tunggu verifikasi admin.
                    </Text>
                    <TouchableOpacity
                        style={styles.primaryBtn}
                        onPress={() => checkSellerProfile()}
                    >
                        <Text style={styles.primaryBtnText}>Lihat Status Bisnis</Text>
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
                            value={storeName}
                            onChangeText={setShopName}
                        />

                        <Text style={styles.label}>Alamat Toko</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Alamat lengkap toko..."
                            value={address}
                            onChangeText={setAddress}
                            multiline
                            numberOfLines={3}
                        />

                        <Text style={styles.label}>Deskripsi Toko</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Ceritakan sedikit tentang apa yang Anda jual..."
                            value={description}
                            onChangeText={setShopDescription}
                            multiline
                            numberOfLines={4}
                        />

                        {/* Logo Upload Placeholder */}
                        <Text style={styles.label}>Logo Toko (Optional)</Text>
                        <TouchableOpacity
                            style={styles.uploadBtn}
                            onPress={() => Alert.alert('Info', 'Fitur upload logo belum tersedia')}
                        >
                            <Icon name="image" size={24} color={COLORS.grey} />
                            <Text style={styles.uploadBtnText}>Pilih Logo</Text>
                        </TouchableOpacity>

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
                <TouchableOpacity
                    style={[styles.primaryBtn, isLoading && styles.disabledBtn]}
                    onPress={handleRegister}
                    disabled={isLoading}
                >
                    <Text style={styles.primaryBtnText}>{isLoading ? 'Memproses...' : 'Buka Toko Sekarang'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

// ... existing styles ...
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
    uploadBtn: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
        borderRadius: SIZES.radius,
        height: normalize(80),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightGrey,
    },
    uploadBtnText: {
        marginTop: SPACING.xs,
        color: COLORS.grey,
        fontSize: normalize(12),
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
    disabledBtn: {
        backgroundColor: COLORS.grey,
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
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    avatarPlaceholder: {
        width: normalize(60),
        height: normalize(60),
        borderRadius: normalize(30),
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfo: {
        marginLeft: SPACING.md,
        flex: 1,
    },
    storeName: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    storeAddress: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginTop: 2,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    ratingText: {
        fontSize: normalize(12),
        color: COLORS.black,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: SPACING.md,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    statLabel: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginTop: 2,
    },
    actionContainer: {
        marginTop: SPACING.md,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        marginBottom: SPACING.md,
    },
    actionBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(16),
        marginLeft: SPACING.sm,
    },
});

export default BecomeSellerScreen;
