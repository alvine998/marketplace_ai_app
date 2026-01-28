import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Switch,
    Image,
    ActivityIndicator,
    Alert,
    Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { updateProduct, deleteProduct } from '../../services/productService';
import Toast from 'react-native-toast-message';

// Reuse hardcoded categories for now
const CATEGORIES = [
    { id: 1, name: 'Elektronik' },
    { id: 2, name: 'Fashion Pria' },
    { id: 3, name: 'Fashion Wanita' },
    { id: 4, name: 'Handphone & Tablet' },
    { id: 5, name: 'Komputer & Laptop' },
    { id: 6, name: 'Kamera' },
    { id: 7, name: 'Kesehatan' },
    { id: 8, name: 'Kecantikan' },
    { id: 9, name: 'Ibu & Bayi' },
    { id: 10, name: 'Rumah Tangga' },
    { id: 11, name: 'Makanan & Minuman' },
    { id: 12, name: 'Olahraga' },
    { id: 13, name: 'Otomotif' },
    { id: 14, name: 'Buku' },
    { id: 15, name: 'Lain-lain' },
];

const EditProductScreen = ({ navigation, route }: any) => {
    const { product } = route.params || {};

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subcategoryId, setSubcategoryId] = useState('');
    const [isFlashSale, setIsFlashSale] = useState(false);
    const [flashSalePrice, setFlashSalePrice] = useState('');
    const [flashSaleExpiry, setFlashSaleExpiry] = useState(new Date());
    const [isDatePickerOpen, setDatePickerOpen] = useState(false);
    const [image, setImage] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);

    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setDescription(product.description || '');
            setPrice(product.price ? String(product.price) : '');
            setStock(product.stock ? String(product.stock) : '');
            setSelectedCategory(product.category || '');
            setSubcategoryId(product.subcategoryId || '');
            setIsFlashSale(product.isFlashSale || false);
            if (product.flashSalePrice) setFlashSalePrice(String(product.flashSalePrice));
            if (product.flashSaleExpiry) setFlashSaleExpiry(new Date(product.flashSaleExpiry));
            // Note: Image pre-fill is visual only, we don't convert URL to asset object unless changed
        }
    }, [product]);

    const handleSelectImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
        });

        if (result.assets && result.assets.length > 0) {
            setImage(result.assets[0]);
        }
    };

    const validate = () => {
        if (!name || !description || !price || !stock || !selectedCategory) {
            Alert.alert('Error', 'Mohon lengkapi semua field wajib (*) .');
            return false;
        }
        // Image is optional in edit if not changing
        if (isFlashSale) {
            if (!flashSalePrice) {
                Alert.alert('Error', 'Mohon isi harga flash sale.');
                return false;
            }
        }
        return true;
    };

    const handleUpdate = async () => {
        if (!validate() || !product?.id) return;

        setLoading(true);
        try {
            const payload = {
                name,
                description,
                price: parseInt(price.replace(/[^0-9]/g, '')),
                stock: parseInt(stock.replace(/[^0-9]/g, '')),
                category: selectedCategory,
                subcategoryId,
                isFlashSale,
                flashSalePrice: isFlashSale ? parseInt(flashSalePrice.replace(/[^0-9]/g, '')) : undefined,
                flashSaleExpiry: isFlashSale ? flashSaleExpiry.toISOString() : undefined,
                image: image ? {
                    uri: image.uri,
                    type: image.type,
                    name: image.fileName || `product_${Date.now()}.jpg`,
                } : undefined, // Only send image if changed
            };

            const response = await updateProduct(product.id, payload);

            if (response && (response.status === 200 || !response.error)) {
                Toast.show({
                    type: 'success',
                    text1: 'Sukses',
                    text2: 'Produk berhasil diperbarui',
                });
                navigation.goBack();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Gagal',
                    text2: response?.message || 'Gagal memperbarui produk',
                });
            }

        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Terjadi kesalahan sistem',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        if (!product?.id) return;

        Alert.alert(
            'Hapus Produk',
            'Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: async () => {
                        setDeleteLoading(true);
                        try {
                            const response = await deleteProduct(product.id);
                            if (response && (response.status === 200 || !response.error)) {
                                Toast.show({
                                    type: 'success',
                                    text1: 'Sukses',
                                    text2: 'Produk berhasil dihapus',
                                });
                                navigation.goBack();
                            } else {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Gagal',
                                    text2: response?.message || 'Gagal menghapus produk',
                                });
                            }
                        } catch (error) {
                            console.error(error);
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'Terjadi kesalahan sistem',
                            });
                        } finally {
                            setDeleteLoading(false);
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Produk</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Image Picker */}
                <TouchableOpacity style={styles.imagePicker} onPress={handleSelectImage}>
                    {image ? (
                        <Image source={{ uri: image.uri }} style={styles.previewImage} resizeMode="cover" />
                    ) : product?.image ? (
                        <Image source={{ uri: product.image }} style={styles.previewImage} resizeMode="cover" />
                    ) : (
                        <View style={styles.uploadPlaceholder}>
                            <Icon name="camera" size={32} color={COLORS.grey} />
                            <Text style={styles.uploadText}>Ubah Foto Produk</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Form Fields */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nama Produk *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: Sepatu Sneakers Pria"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Deskripsi Produk *</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Jelaskan detail produkmu..."
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                    />
                </View>

                <View style={styles.row}>
                    <View style={[styles.formGroup, { flex: 1, marginRight: SPACING.sm }]}>
                        <Text style={styles.label}>Harga *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Rp 0"
                            value={price}
                            keyboardType="numeric"
                            onChangeText={setPrice}
                        />
                    </View>
                    <View style={[styles.formGroup, { flex: 1, marginLeft: SPACING.sm }]}>
                        <Text style={styles.label}>Stok *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0"
                            value={stock}
                            keyboardType="numeric"
                            onChangeText={setStock}
                        />
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Kategori *</Text>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setCategoryModalVisible(!categoryModalVisible)}
                    >
                        <Text style={{ color: selectedCategory ? COLORS.black : '#999' }}>
                            {selectedCategory || 'Pilih Kategori'}
                        </Text>
                        <Icon name="chevron-down" size={20} color={COLORS.grey} style={{ position: 'absolute', right: 10, top: 12 }} />
                    </TouchableOpacity>
                    {categoryModalVisible && (
                        <View style={styles.dropdown}>
                            {CATEGORIES.map(cat => (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setSelectedCategory(cat.name);
                                        setCategoryModalVisible(false);
                                    }}
                                >
                                    <Text>{cat.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Sub Kategori ID (Opsional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ID Subkategori"
                        value={subcategoryId}
                        onChangeText={setSubcategoryId}
                    />
                </View>

                <View style={styles.divider} />

                <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>Flash Sale</Text>
                    <Switch
                        value={isFlashSale}
                        onValueChange={setIsFlashSale}
                        trackColor={{ false: '#767577', true: COLORS.primary + '80' }}
                        thumbColor={isFlashSale ? COLORS.primary : '#f4f3f4'}
                    />
                </View>

                {isFlashSale && (
                    <View style={styles.flashSaleContainer}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Harga Flash Sale *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Rp 0"
                                value={flashSalePrice}
                                keyboardType="numeric"
                                onChangeText={setFlashSalePrice}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Berakhir Pada</Text>
                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => setDatePickerOpen(true)}
                            >
                                <Text>{flashSaleExpiry.toLocaleString()}</Text>
                                <Icon name="calendar" size={20} color={COLORS.grey} style={{ position: 'absolute', right: 10, top: 12 }} />
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                open={isDatePickerOpen}
                                date={flashSaleExpiry}
                                onConfirm={(date) => {
                                    setDatePickerOpen(false);
                                    setFlashSaleExpiry(date);
                                }}
                                onCancel={() => {
                                    setDatePickerOpen(false);
                                }}
                            />
                        </View>
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.submitBtn, loading && styles.disabledBtn]}
                    onPress={handleUpdate}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color={COLORS.white} />
                    ) : (
                        <Text style={styles.submitBtnText}>Simpan Perubahan</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.deleteBtn, deleteLoading && styles.disabledBtn]}
                    onPress={handleDelete}
                    disabled={deleteLoading}
                >
                    {deleteLoading ? (
                        <ActivityIndicator size="small" color={COLORS.danger} />
                    ) : (
                        <Text style={styles.deleteBtnText}>Hapus Produk</Text>
                    )}
                </TouchableOpacity>

            </ScrollView>
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
    backButton: {
        marginRight: SPACING.md,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    content: {
        padding: SPACING.md,
    },
    imagePicker: {
        width: '100%',
        height: normalize(150),
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
        overflow: 'hidden',
    },
    uploadPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadText: {
        marginTop: SPACING.xs,
        color: COLORS.grey,
        fontSize: normalize(14),
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    formGroup: {
        marginBottom: SPACING.md,
    },
    label: {
        fontSize: normalize(14),
        color: COLORS.black,
        marginBottom: SPACING.xs,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        paddingHorizontal: SPACING.md,
        paddingVertical: Platform.OS === 'ios' ? SPACING.md : SPACING.sm,
        fontSize: normalize(14),
        color: COLORS.black,
        backgroundColor: '#FAFAFA',
    },
    textArea: {
        height: normalize(100),
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        marginTop: 5,
        backgroundColor: '#fff',
        maxHeight: 200,
    },
    dropdownItem: {
        padding: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.md,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    switchLabel: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    flashSaleContainer: {
        backgroundColor: '#FFF0F0',
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        marginBottom: SPACING.md,
    },
    submitBtn: {
        backgroundColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        marginTop: SPACING.lg,
    },
    disabledBtn: {
        opacity: 0.7,
    },
    submitBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(16),
    },
    deleteBtn: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: COLORS.danger,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        marginTop: SPACING.md,
        marginBottom: SPACING.xxl,
    },
    deleteBtnText: {
        color: COLORS.danger,
        fontWeight: 'bold',
        fontSize: normalize(16),
    }
});

export default EditProductScreen;
