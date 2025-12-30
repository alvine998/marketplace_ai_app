import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    TextInput,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: any) => void;
    currentFilters: any;
}

const SORT_OPTIONS = [
    { label: 'Paling Sesuai', value: 'relevant' },
    { label: 'Terbaru', value: 'newest' },
    { label: 'Harga Terendah', value: 'price_asc' },
    { label: 'Harga Tertinggi', value: 'price_desc' },
];

const LOCATIONS = ['Jakarta', 'Tangerang', 'Bandung', 'Surabaya', 'Medan', 'Makassar'];

const FilterModal = ({ visible, onClose, onApply, currentFilters }: FilterModalProps) => {
    const [tempSort, setTempSort] = useState(currentFilters.sort || 'relevant');
    const [minPrice, setMinPrice] = useState(currentFilters.minPrice || '');
    const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice || '');
    const [selectedLocations, setSelectedLocations] = useState<string[]>(currentFilters.locations || []);

    const toggleLocation = (loc: string) => {
        if (selectedLocations.includes(loc)) {
            setSelectedLocations(selectedLocations.filter(i => i !== loc));
        } else {
            setSelectedLocations([...selectedLocations, loc]);
        }
    };

    const handleReset = () => {
        setTempSort('relevant');
        setMinPrice('');
        setMaxPrice('');
        setSelectedLocations([]);
    };

    const handleApply = () => {
        onApply({
            sort: tempSort,
            minPrice,
            maxPrice,
            locations: selectedLocations,
        });
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="x" size={normalize(24)} color={COLORS.black} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Filter</Text>
                        <TouchableOpacity onPress={handleReset}>
                            <Text style={styles.resetText}>Reset</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
                        {/* Sort Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Urutkan</Text>
                            <View style={styles.optionsGrid}>
                                {SORT_OPTIONS.map((opt) => (
                                    <TouchableOpacity
                                        key={opt.value}
                                        style={[
                                            styles.optionChip,
                                            tempSort === opt.value && styles.activeChip,
                                        ]}
                                        onPress={() => setTempSort(opt.value)}
                                    >
                                        <Text
                                            style={[
                                                styles.chipText,
                                                tempSort === opt.value && styles.activeChipText,
                                            ]}
                                        >
                                            {opt.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Price Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Batas Harga</Text>
                            <View style={styles.priceRow}>
                                <View style={styles.priceInputContainer}>
                                    <Text style={styles.priceLabel}>Minimum</Text>
                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.rpText}>Rp</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="0"
                                            keyboardType="numeric"
                                            value={minPrice}
                                            onChangeText={setMinPrice}
                                        />
                                    </View>
                                </View>
                                <View style={styles.priceInputContainer}>
                                    <Text style={styles.priceLabel}>Maximum</Text>
                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.rpText}>Rp</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="0"
                                            keyboardType="numeric"
                                            value={maxPrice}
                                            onChangeText={setMaxPrice}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Location Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Lokasi</Text>
                            <View style={styles.optionsGrid}>
                                {LOCATIONS.map((loc) => (
                                    <TouchableOpacity
                                        key={loc}
                                        style={[
                                            styles.optionChip,
                                            selectedLocations.includes(loc) && styles.activeChip,
                                        ]}
                                        onPress={() => toggleLocation(loc)}
                                    >
                                        <Text
                                            style={[
                                                styles.chipText,
                                                selectedLocations.includes(loc) && styles.activeChipText,
                                            ]}
                                        >
                                            {loc}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </ScrollView>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                            <Text style={styles.applyButtonText}>Tampilkan Produk</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '85%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    resetText: {
        fontSize: normalize(14),
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    scrollContent: {
        padding: SPACING.md,
    },
    section: {
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.md,
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    optionChip: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginRight: SPACING.sm,
        marginBottom: SPACING.sm,
    },
    activeChip: {
        borderColor: COLORS.primary,
        backgroundColor: '#E8F5E9',
    },
    chipText: {
        fontSize: normalize(13),
        color: COLORS.black,
    },
    activeChipText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priceInputContainer: {
        flex: 0.48,
    },
    priceLabel: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginBottom: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        paddingHorizontal: SPACING.sm,
        height: normalize(40),
    },
    rpText: {
        fontSize: normalize(14),
        color: COLORS.grey,
        marginRight: 4,
    },
    input: {
        flex: 1,
        fontSize: normalize(14),
        color: COLORS.black,
        padding: 0,
    },
    footer: {
        padding: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    applyButton: {
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        height: normalize(48),
        alignItems: 'center',
        justifyContent: 'center',
    },
    applyButtonText: {
        color: COLORS.white,
        fontSize: normalize(16),
        fontWeight: 'bold',
    },
});

export default FilterModal;
