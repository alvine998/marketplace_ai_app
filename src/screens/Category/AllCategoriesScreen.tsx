import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES, SHADOWS } from '../../utils/theme';
import normalize from 'react-native-normalize';

const { width } = Dimensions.get('window');

const ALL_CATEGORIES = [
    { id: 1, name: 'UMKM', icon: require('../../assets/icons/umkm.png') },
    { id: 2, name: 'Fashion', icon: require('../../assets/icons/fashion.png') },
    { id: 3, name: 'Kesehatan', icon: require('../../assets/icons/kesehatan.png') },
    { id: 4, name: 'Otomotif', icon: require('../../assets/icons/otomotif.png') },
    { id: 5, name: 'Kecantikan', icon: require('../../assets/icons/kecantikan.png') },
    { id: 6, name: 'Properti', icon: require('../../assets/icons/properti.png') },
    { id: 7, name: 'Kebutuhan Rumah', icon: require('../../assets/icons/kebutuhan_rumah.png') },
    { id: 8, name: 'Peluang Usaha', icon: require('../../assets/icons/peluang_usaha.png') },
    { id: 9, name: 'Lain-lain', icon: require('../../assets/icons/lain_lain.png') },
];

const AllCategoriesScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Semua Kategori</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.grid}>
                    {ALL_CATEGORIES.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={styles.categoryCard}
                            onPress={() => navigation.navigate('CategoryProductList', { category })}
                        >
                            <View style={styles.iconBox}>
                                <Image source={category.icon} style={styles.categoryIcon} resizeMode="contain" />
                            </View>
                            <Text style={styles.categoryName}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
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
    scrollContent: {
        padding: SPACING.sm, // Reduced from SPACING.md
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: (width - (SPACING.sm * 3)) / 2, // Use SPACING.sm for tighter gap
        backgroundColor: '#F8F9FA',
        borderRadius: SIZES.radius,
        padding: SPACING.sm, // Reduced from SPACING.md
        alignItems: 'center',
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    iconBox: {
        width: normalize(64),
        height: normalize(64),
        borderRadius: normalize(32),
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.sm,
        ...SHADOWS.soft,
    },
    categoryIcon: {
        width: normalize(44),
        height: normalize(44),
    },
    categoryName: {
        fontSize: normalize(13),
        fontWeight: '600',
        color: COLORS.black,
        textAlign: 'center',
    },
});

export default AllCategoriesScreen;
