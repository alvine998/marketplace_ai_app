import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES, SHADOWS } from '../../utils/theme';
import normalize from 'react-native-normalize';

const { width } = Dimensions.get('window');

const AdScreen = ({ route, navigation }: any) => {
    const { imageUrl, title, description } = route.params || {
        imageUrl: 'https://picsum.photos/seed/promo/800/400',
        title: 'Promo Spesial Hari Ini!',
        description: 'Dapatkan diskon hingga 80% untuk produk pilihan terbaik kami. Jangan lewatkan kesempatan terbatas ini hanya hari ini!',
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detail Promo</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: imageUrl }} style={styles.banner} />

                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>

                    <View style={styles.separator} />

                    <Text style={styles.sectionTitle}>Sarat & Ketentuan</Text>
                    <Text style={styles.terms}>
                        1. Promo berlaku hingga stok habis.{"\n"}
                        2. Tidak dapat digabungkan dengan promo lain.{"\n"}
                        3. Berlaku untuk seluruh wilayah Indonesia.{"\n"}
                        4. Syarat lainnya berlaku.
                    </Text>

                    <TouchableOpacity style={styles.ctaButton}>
                        <Text style={styles.ctaText}>Gunakan Promo</Text>
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
    banner: {
        width: width,
        height: width * 0.6,
        resizeMode: 'cover',
    },
    content: {
        padding: SPACING.lg,
    },
    title: {
        fontSize: normalize(22),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.sm,
    },
    description: {
        fontSize: normalize(15),
        color: COLORS.grey,
        lineHeight: 22,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.xl,
    },
    sectionTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.sm,
    },
    terms: {
        fontSize: normalize(14),
        color: COLORS.grey,
        lineHeight: 20,
        marginBottom: SPACING.xl,
    },
    ctaButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        borderRadius: SIZES.radiusLg,
        alignItems: 'center',
        ...SHADOWS.medium,
    },
    ctaText: {
        color: COLORS.white,
        fontSize: normalize(16),
        fontWeight: 'bold',
    },
});

export default AdScreen;
