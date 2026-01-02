import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import Toast from 'react-native-toast-message';

const AddAddressScreen = ({ navigation, route }: any) => {
    const editAddress = route.params?.address;

    const [label, setLabel] = useState(editAddress?.label || '');
    const [recipient, setRecipient] = useState(editAddress?.recipient || '');
    const [phone, setPhone] = useState(editAddress?.phone || '');
    const [city, setCity] = useState(editAddress?.address?.split(', ')[1] || '');
    const [fullAddress, setFullAddress] = useState(editAddress?.address || '');
    const [isPrimary, setIsPrimary] = useState(editAddress?.isPrimary || false);

    const handleSave = () => {
        if (!label || !recipient || !phone || !fullAddress) {
            Toast.show({
                type: 'error',
                text1: 'Data tidak lengkap',
                text2: 'Harap isi semua bidang yang wajib.',
            });
            return;
        }

        // Mock Save Logic
        Toast.show({
            type: 'success',
            text1: editAddress ? 'Alamat diperbarui' : 'Alamat ditambahkan',
            text2: `Alamat "${label}" berhasil disimpan.`,
        });
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="x" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{editAddress ? 'Ubah Alamat' : 'Tambah Alamat'}</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text style={styles.saveText}>Simpan</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Label Alamat (Rumah, Kantor, dll)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: Rumah"
                        value={label}
                        onChangeText={setLabel}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nama Penerima</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: John Doe"
                        value={recipient}
                        onChangeText={setRecipient}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nomor HP</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0812xxxx"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Kota atau Kecamatan</Text>
                    <TouchableOpacity style={styles.selector}>
                        <Text style={[styles.selectorText, !city && { color: COLORS.grey }]}>
                            {city || 'Pilih Kota atau Kecamatan'}
                        </Text>
                        <Icon name="chevron-right" size={18} color={COLORS.grey} />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Alamat Lengkap</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Nama Jalan, Gedung, No. Rumah"
                        multiline
                        numberOfLines={4}
                        value={fullAddress}
                        onChangeText={setFullAddress}
                    />
                </View>

                <View style={styles.switchContainer}>
                    <View style={styles.switchTextContainer}>
                        <Text style={styles.switchTitle}>Jadikan Alamat Utama</Text>
                        <Text style={styles.switchSub}>Alamat ini akan otomatis terpilih saat belanja</Text>
                    </View>
                    <Switch
                        value={isPrimary}
                        onValueChange={setIsPrimary}
                        trackColor={{ false: '#D1D1D1', true: COLORS.primary + '80' }}
                        thumbColor={isPrimary ? COLORS.primary : '#f4f3f4'}
                    />
                </View>

                <TouchableOpacity style={styles.mainSaveBtn} onPress={handleSave}>
                    <Text style={styles.mainSaveBtnText}>Simpan Alamat</Text>
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
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        height: normalize(56),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    saveText: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    content: {
        padding: SPACING.lg,
    },
    inputGroup: {
        marginBottom: SPACING.lg,
    },
    label: {
        fontSize: normalize(12),
        fontWeight: 'bold',
        color: COLORS.grey,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        paddingHorizontal: SPACING.md,
        height: normalize(44),
        fontSize: normalize(14),
        color: COLORS.black,
    },
    textArea: {
        height: normalize(100),
        textAlignVertical: 'top',
        paddingTop: 12,
    },
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        paddingHorizontal: SPACING.md,
        height: normalize(44),
    },
    selectorText: {
        fontSize: normalize(14),
        color: COLORS.black,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        marginTop: SPACING.md,
    },
    switchTextContainer: {
        flex: 1,
        marginRight: SPACING.md,
    },
    switchTitle: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 2,
    },
    switchSub: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    mainSaveBtn: {
        backgroundColor: COLORS.primary,
        height: normalize(48),
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.xl,
        marginBottom: SPACING.xl,
    },
    mainSaveBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(16),
    },
});

export default AddAddressScreen;
