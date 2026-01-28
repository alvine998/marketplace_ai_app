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
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../context/AuthContext';
import {
    getSellerProfile,
    registerSeller,
    SellerProfile,
} from '../../services/sellerService';

const { width } = Dimensions.get('window');

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
            });

            if (response && !response.message?.toLowerCase().includes('error')) {
                setIsSuccess(true);
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

    // 2. Dashboard/Detail State (Verified) - REDESIGNED
    if (sellerProfile && sellerProfile.isVerified) {
        return (
            <View style={styles.container}>
                {/* Blue Header Section */}
                <View style={styles.blueHeader}>
                    <SafeAreaView>
                        <View style={styles.headerNav}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon name="arrow-left" size={24} color={COLORS.white} />
                            </TouchableOpacity>
                            <Text style={styles.headerTitleWhite}>Toko Saya</Text>
                            <TouchableOpacity onPress={() => Alert.alert('Info', 'Edit Profil Toko')}>
                                <View style={styles.editIconCircle}>
                                    <Icon name="edit-2" size={16} color={COLORS.primary} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.storeInfoContainer}>
                            <Text style={styles.storeNameTitle}>{sellerProfile.storeName}</Text>
                            <Text style={styles.storeAddressSubtitle}>{sellerProfile.address}</Text>
                        </View>
                    </SafeAreaView>

                    {/* Background decorations could be added here */}
                </View>

                {/* Overlapping Card */}
                <View style={styles.actionCardContainer}>
                    <View style={styles.actionCard}>
                        <TouchableOpacity
                            style={styles.actionItem}
                            onPress={() => navigation.navigate('SellerOrderCart')}
                        >
                            <View style={[styles.iconCircle, { backgroundColor: '#FFA726' }]}>
                                <Icon name="shopping-cart" size={24} color={COLORS.white} />
                            </View>
                            <Text style={styles.actionLabel}>Keranjang Pesanan</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionItem}
                            onPress={() => navigation.navigate('AddProduct')}
                        >
                            <View style={[styles.iconCircle, { backgroundColor: '#26C6DA' }]}>
                                <View style={styles.plusRing}>
                                    <View style={styles.plusInner} />
                                </View>
                            </View>
                            <Text style={styles.actionLabel}>Tambah Produk</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionItem}
                            onPress={() => navigation.navigate('SellerOrderHistory')}
                        >
                            <View style={[styles.iconCircle, { backgroundColor: '#EF5350' }]}>
                                <Icon name="file-text" size={24} color={COLORS.white} />
                            </View>
                            <Text style={styles.actionLabel}>Histori</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Content Below */}
                <ScrollView contentContainerStyle={styles.dashboardContent}>
                    {/* Mock Product Grid to match design */}
                    <View style={styles.productGrid}>
                        {/* Product Card Mockup */}
                        <View style={styles.productCard}>
                            <View style={styles.productImagePlaceholder} />
                            <View style={styles.productInfo}>
                                <TouchableOpacity
                                    style={styles.editProductIcon}
                                    onPress={() => navigation.navigate('EditProduct', {
                                        product: {
                                            id: 'mock_1',
                                            name: 'Lorem ipsum dolor sit amet, consetetur sadips...',
                                            price: 50000,
                                            stock: 10,
                                            category: 'Elektronik',
                                            description: 'Mock description'
                                        }
                                    })}
                                >
                                    <Icon name="edit-2" size={12} color={COLORS.grey} />
                                </TouchableOpacity>
                                <Text style={styles.productName} numberOfLines={2}>
                                    Lorem ipsum dolor sit amet, consetetur sadips...
                                </Text>
                                <Text style={styles.productPrice}>Rp 25.000</Text>
                                <Text style={styles.productLocation}>{sellerProfile.address.split(',')[0]}</Text>
                                <View style={styles.productRating}>
                                    <Icon name="star" size={12} color="#FFD700" />
                                    <Text style={styles.productRatingText}> 5.0 | Terjual 500+</Text>
                                </View>
                            </View>
                        </View>

                        {/* Additional Mock Cards (invisible for layout balance if needed) */}
                        <View style={[styles.productCard, { opacity: 0 }]} />
                    </View>
                </ScrollView>
            </View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA', // Light grey background for dashboard
    },
    // Blue Header Styles
    blueHeader: {
        backgroundColor: COLORS.primary,
        height: normalize(200), // Adjust height as needed
        paddingHorizontal: SPACING.md,
        paddingTop: Platform.OS === 'android' ? SPACING.md : 0,
        position: 'relative',
    },
    headerNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    headerTitleWhite: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.white,
    },
    editIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    storeInfoContainer: {
        alignItems: 'center',
        marginTop: SPACING.sm,
    },
    storeNameTitle: {
        fontSize: normalize(24),
        fontWeight: 'bold',
        color: COLORS.white,
        textAlign: 'center',
    },
    storeAddressSubtitle: {
        fontSize: normalize(14),
        color: COLORS.white,
        opacity: 0.9,
        marginTop: 4,
        textAlign: 'center',
    },
    // Action Card Styles
    actionCardContainer: {
        paddingHorizontal: SPACING.md,
        marginTop: -40, // Overlap the blue header
        marginBottom: SPACING.md,
    },
    actionCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radiusLg,
        padding: SPACING.lg,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    actionItem: {
        alignItems: 'center',
        width: '30%',
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    plusRing: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusInner: {
        width: 8,
        height: 8,
        backgroundColor: COLORS.white,
        borderRadius: 4,
    },
    actionLabel: {
        fontSize: normalize(12),
        color: COLORS.black,
        textAlign: 'center',
        fontWeight: '500',
    },
    // Dashboard Content
    dashboardContent: {
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.xl,
    },
    productGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    productCard: {
        width: '48%',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SPACING.sm,
        marginBottom: SPACING.md,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    productImagePlaceholder: {
        width: '100%',
        height: normalize(120),
        backgroundColor: '#EEE',
        borderRadius: SIZES.radiusSm,
        marginBottom: SPACING.sm,
    },
    productInfo: {
        position: 'relative',
    },
    editProductIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
    },
    productName: {
        fontSize: normalize(14),
        color: COLORS.black,
        marginBottom: 4,
        paddingRight: 16, // Space for edit icon
    },
    productPrice: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: '#F44336', // Reddish price
        marginBottom: 2,
    },
    productLocation: {
        fontSize: normalize(10),
        color: COLORS.grey,
        marginBottom: 4,
    },
    productRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productRatingText: {
        fontSize: normalize(10),
        color: COLORS.grey,
    },
    // ... Keeping Existing Registration Styles below ...
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        height: normalize(56),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.white,
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
        backgroundColor: COLORS.white,
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
        backgroundColor: COLORS.white,
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
});

export default BecomeSellerScreen;
