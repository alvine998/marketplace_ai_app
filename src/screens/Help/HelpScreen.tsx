import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { getHelpFromAI } from '../../services/aiService';
import { useTranslation } from '../../context/LanguageContext';

const HelpScreen = ({ navigation }: any) => {
    const FAQ_CATEGORIES = [
        { id: '1', title: 'Akun', icon: 'user' },
        { id: '2', title: 'Pembayaran', icon: 'credit-card' },
        { id: '3', title: 'Pengiriman', icon: 'truck' },
        { id: '4', title: 'Promo', icon: 'percent' },
        { id: '5', title: 'Komplain', icon: 'alert-circle' },
        { id: '6', title: 'Privasi', icon: 'lock' },
    ];

    const POPULAR_TOPICS = [
        'Cara membatalkan pesanan',
        'Kenapa bayar pakai GoPay gagal?',
        'Cara retur barang yang rusak',
        'Lupa PIN Transaksi',
    ];

    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [aiResult, setAiResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (text: string) => {
        setSearchQuery(text);
        if (text.length > 3) {
            // AI Help Search disabled
            console.log('AI Help Search is currently disabled');
            setAiResult(null);
        } else {
            setAiResult(null);
        }
    };

    const navigateToDetail = (title: string, query: string, content?: string) => {
        navigation.navigate('HelpDetail', { title, query, content });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bantuan</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Search Header */}
                <View style={styles.searchSection}>
                    <Text style={styles.searchTitle}>Hai, ada yang bisa kami bantu?</Text>
                    <View style={styles.searchBar}>
                        <Icon name="search" size={normalize(20)} color={COLORS.grey} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Cari masalah atau topik bantuan..."
                            placeholderTextColor={COLORS.grey}
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                        {loading && <ActivityIndicator size="small" color={COLORS.primary} />}
                    </View>
                </View>

                {/* AI Result Section Disabled */}

                {/* FAQ Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Kategori Populer</Text>
                    <View style={styles.categoriesGrid}>
                        {FAQ_CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                style={styles.categoryCard}
                                onPress={() => navigateToDetail(cat.title, `Bantuan kategori ${cat.title}`)}
                            >
                                <View style={styles.categoryIcon}>
                                    <Icon name={cat.icon} size={normalize(24)} color={COLORS.primary} />
                                </View>
                                <Text style={styles.categoryLabel}>{cat.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Popular Topics */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Sering ditanyakan</Text>
                    {POPULAR_TOPICS.map((topic, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.topicRow}
                            onPress={() => navigateToDetail(topic, topic)}
                        >
                            <Text style={styles.topicText}>{topic}</Text>
                            <Icon name="chevron-right" size={normalize(18)} color={COLORS.grey} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Contact Section */}
                <View style={styles.contactSection}>
                    <Text style={styles.contactHeader}>Masih butuh bantuan?</Text>
                    <TouchableOpacity style={styles.contactBtn}>
                        <Icon name="message-square" size={normalize(20)} color={COLORS.white} />
                        <Text style={styles.contactBtnText}>Hubungi Care</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.contactBtn, styles.emailBtn]}>
                        <Icon name="mail" size={normalize(20)} color={COLORS.primary} />
                        <Text style={[styles.contactBtnText, styles.emailBtnText]}>Email Kami</Text>
                    </TouchableOpacity>
                </View>
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
    searchSection: {
        backgroundColor: COLORS.primary,
        padding: SPACING.lg,
        paddingBottom: SPACING.xl,
    },
    searchTitle: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: SPACING.md,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        paddingHorizontal: SPACING.md,
        height: normalize(44),
    },
    searchInput: {
        flex: 1,
        marginLeft: SPACING.sm,
        fontSize: normalize(14),
        color: COLORS.black,
    },
    section: {
        padding: SPACING.md,
        marginTop: SPACING.sm,
    },
    sectionHeader: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.md,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: '31%',
        aspectRatio: 1,
        backgroundColor: '#F8F9FA',
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.sm,
        padding: SPACING.xs,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    categoryIcon: {
        marginBottom: 8,
    },
    categoryLabel: {
        fontSize: normalize(11),
        color: COLORS.black,
        textAlign: 'center',
        fontWeight: '500',
    },
    topicRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    topicText: {
        fontSize: normalize(14),
        color: COLORS.black,
    },
    contactSection: {
        padding: SPACING.lg,
        backgroundColor: '#F7F8FA',
        marginTop: SPACING.xl,
        alignItems: 'center',
    },
    contactHeader: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.md,
    },
    contactBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        width: '100%',
        height: normalize(48),
        borderRadius: SIZES.radius,
        marginBottom: SPACING.md,
    },
    contactBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(16),
        marginLeft: 8,
    },
    emailBtn: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    emailBtnText: {
        color: COLORS.primary,
    },
    aiResultSection: {
        padding: SPACING.md,
        backgroundColor: '#F0F7FF',
        marginTop: SPACING.sm,
    },
    aiResultCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        marginTop: SPACING.sm,
        borderWidth: 1,
        borderColor: '#B3D7FF',
    },
    aiIconWrapper: {
        width: normalize(36),
        height: normalize(36),
        borderRadius: normalize(18),
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    aiResultInfo: {
        flex: 1,
    },
    aiResultTitle: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 2,
    },
    aiResultSnippet: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
});

export default HelpScreen;
