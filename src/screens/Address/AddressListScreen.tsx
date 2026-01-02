import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

const MOCK_ADDRESSES = [
    {
        id: '1',
        label: 'Rumah',
        recipient: 'Alvin',
        phone: '08123456789',
        address: 'Jl. Sudirman No. 123, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190',
        isPrimary: true,
    },
    {
        id: '2',
        label: 'Kantor',
        recipient: 'Alvin (Work)',
        phone: '08123456780',
        address: 'Menara Mandiri, Jl. Jend. Sudirman Kav 52-53, Senayan, Jakarta Selatan, DKI Jakarta 12190',
        isPrimary: false,
    },
    {
        id: '3',
        label: 'Apartemen',
        recipient: 'Alvin Yoga',
        phone: '08129876543',
        address: 'Sudirman Park, Jl. K.H. Mas Mansyur Kav. 35, Karet Tengsin, Jakarta Pusat 10220',
        isPrimary: false,
    },
];

const AddressListScreen = ({ navigation }: any) => {
    const renderAddressItem = ({ item }: { item: any }) => (
        <View style={[styles.addressCard, item.isPrimary && styles.primaryCard]}>
            <View style={styles.addressHeader}>
                <View style={styles.labelRow}>
                    <Text style={styles.addressLabel}>{item.label}</Text>
                    {item.isPrimary && (
                        <View style={styles.primaryBadge}>
                            <Text style={styles.primaryBadgeText}>Utama</Text>
                        </View>
                    )}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('AddAddress', { address: item })}>
                    <Text style={styles.editText}>Ubah</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.recipientName}>{item.recipient}</Text>
            <Text style={styles.phoneText}>{item.phone}</Text>
            <Text style={styles.addressText}>{item.address}</Text>

            {item.isPrimary ? (
                <View style={styles.selectedIcon}>
                    <Icon name="check" size={16} color={COLORS.white} />
                </View>
            ) : (
                <TouchableOpacity style={styles.selectBtn}>
                    <Text style={styles.selectBtnText}>Pilih Alamat</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Daftar Alamat</Text>
            </View>

            <FlatList
                data={MOCK_ADDRESSES}
                keyExtractor={(item) => item.id}
                renderItem={renderAddressItem}
                contentContainerStyle={styles.listContent}
                ListFooterComponent={
                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => navigation.navigate('AddAddress')}
                    >
                        <Icon name="plus" size={20} color={COLORS.primary} />
                        <Text style={styles.addBtnText}>Tambah Alamat Baru</Text>
                    </TouchableOpacity>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
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
    listContent: {
        padding: SPACING.md,
    },
    addressCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        position: 'relative',
    },
    primaryCard: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary + '03',
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressLabel: {
        fontSize: normalize(12),
        fontWeight: 'bold',
        color: COLORS.grey,
        textTransform: 'uppercase',
    },
    primaryBadge: {
        backgroundColor: COLORS.primary + '20',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 8,
    },
    primaryBadgeText: {
        fontSize: 10,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    editText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: normalize(14),
    },
    recipientName: {
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 2,
    },
    phoneText: {
        fontSize: normalize(14),
        color: COLORS.black,
        marginBottom: 8,
    },
    addressText: {
        fontSize: normalize(13),
        color: COLORS.grey,
        lineHeight: 18,
        marginBottom: 12,
    },
    selectedIcon: {
        position: 'absolute',
        top: -1,
        right: -1,
        backgroundColor: COLORS.primary,
        width: 24,
        height: 24,
        borderTopRightRadius: SIZES.radius,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectBtn: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: SIZES.radius,
        paddingVertical: 8,
        alignItems: 'center',
    },
    selectBtnText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: normalize(13),
    },
    addBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
        borderRadius: SIZES.radius,
        marginTop: SPACING.sm,
    },
    addBtnText: {
        marginLeft: 8,
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: normalize(14),
    },
});

export default AddressListScreen;
