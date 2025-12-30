import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { searchWithAI } from '../../services/aiService';

interface SearchOverlayProps {
    visible: boolean;
    onClose: () => void;
}

const SearchOverlay = ({ visible, onClose }: SearchOverlayProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const trimmedQuery = query.trim();
        if (trimmedQuery.length > 2) {
            const delayDebounceFn = setTimeout(() => {
                handleSearch(trimmedQuery);
            }, 1200); // 1.2s debounce for better rate limit management

            return () => clearTimeout(delayDebounceFn);
        } else {
            setResults([]);
        }
    }, [query]);

    const handleSearch = async (searchQuery: string) => {
        setLoading(true);
        const aiResults = await searchWithAI(searchQuery);
        setResults(aiResults);
        setLoading(false);
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.resultItem}>
            <Icon name="search" size={18} color={COLORS.grey} style={styles.resultIcon} />
            <View>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <Text style={styles.resultPrice}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <Modal visible={visible} animationType="fade" transparent={false}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.backButton}>
                        <Icon name="arrow-left" size={24} color={COLORS.black} />
                    </TouchableOpacity>
                    <View style={styles.searchSection}>
                        <TextInput
                            style={styles.input}
                            placeholder="Cari dengan AI..."
                            value={query}
                            onChangeText={setQuery}
                            autoFocus
                        />
                        {query.length > 0 && (
                            <TouchableOpacity onPress={() => setQuery('')}>
                                <Icon name="x" size={20} color={COLORS.grey} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>
                        {loading ? 'Mencari dengan AI...' : results.length > 0 ? 'Sesuai pencarianmu' : 'Coba cari "Sepatu lari terbaik"'}
                    </Text>

                    {loading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
                    ) : (
                        <FlatList
                            data={results}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.list}
                        />
                    )}
                </View>
            </SafeAreaView>
        </Modal>
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
        padding: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        marginRight: SPACING.md,
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.searchBarBackground,
        borderRadius: SIZES.radius,
        paddingHorizontal: SPACING.sm,
        height: normalize(40),
    },
    input: {
        flex: 1,
        fontSize: normalize(14),
        color: COLORS.black,
        padding: 0,
    },
    content: {
        flex: 1,
        padding: SPACING.md,
    },
    sectionTitle: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.grey,
        marginBottom: SPACING.md,
    },
    loader: {
        marginTop: SPACING.xl,
    },
    list: {
        paddingBottom: SPACING.xl,
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    resultIcon: {
        marginRight: SPACING.md,
    },
    resultTitle: {
        fontSize: normalize(14),
        color: COLORS.black,
        fontWeight: '500',
    },
    resultPrice: {
        fontSize: normalize(12),
        color: COLORS.primary,
        fontWeight: 'bold',
        marginTop: 2,
    },
});

export default SearchOverlay;
