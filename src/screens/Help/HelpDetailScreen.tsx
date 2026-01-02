import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { getHelpFromAI } from '../../services/aiService';

const HelpDetailScreen = ({ route, navigation }: any) => {
    const { title, query, content: initialContent } = route.params;
    const [loading, setLoading] = useState(!initialContent);
    const [content, setContent] = useState(initialContent || '');
    const [displayTitle, setDisplayTitle] = useState(title || 'Detail Bantuan');

    useEffect(() => {
        if (!initialContent && query) {
            fetchAIHelp();
        }
    }, [query]);

    const fetchAIHelp = async () => {
        // AI Help fetch disabled
        console.log('AI Help fetch is currently disabled');
        setContent('Maaf, informasi bantuan untuk topik ini belum tersedia.');
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{displayTitle}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                        <Text style={styles.loadingText}>Menyiapkan bantuan terbaik untuk Anda...</Text>
                    </View>
                ) : (
                    <View style={styles.articleSection}>
                        <Text style={styles.articleTitle}>{displayTitle}</Text>
                        <Text style={styles.articleContent}>
                            {content}
                        </Text>
                    </View>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Apakah informasi ini membantu?</Text>
                <View style={styles.feedbackButtons}>
                    <TouchableOpacity style={styles.feedbackBtn}>
                        <Icon name="thumbs-up" size={normalize(20)} color={COLORS.grey} />
                        <Text style={styles.feedbackBtnText}>Ya</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.feedbackBtn}>
                        <Icon name="thumbs-down" size={normalize(20)} color={COLORS.grey} />
                        <Text style={styles.feedbackBtnText}>Tidak</Text>
                    </TouchableOpacity>
                </View>
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
    backButton: {
        marginRight: SPACING.md,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
        flex: 1,
    },
    contentContainer: {
        padding: SPACING.lg,
    },
    loadingContainer: {
        height: normalize(300),
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: SPACING.md,
        color: COLORS.grey,
        fontSize: normalize(14),
        textAlign: 'center',
    },
    articleSection: {
        backgroundColor: COLORS.white,
    },
    articleTitle: {
        fontSize: normalize(22),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.lg,
        lineHeight: normalize(28),
    },
    articleContent: {
        fontSize: normalize(16),
        color: COLORS.black,
        lineHeight: normalize(24),
    },
    footer: {
        padding: SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        alignItems: 'center',
    },
    footerText: {
        fontSize: normalize(14),
        color: COLORS.grey,
        marginBottom: SPACING.md,
    },
    feedbackButtons: {
        flexDirection: 'row',
    },
    feedbackBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: normalize(20),
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        marginHorizontal: SPACING.xs,
    },
    feedbackBtnText: {
        marginLeft: 8,
        color: COLORS.black,
        fontSize: normalize(14),
    },
});

export default HelpDetailScreen;
