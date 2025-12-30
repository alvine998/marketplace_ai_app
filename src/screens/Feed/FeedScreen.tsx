import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const FEED_DATA = [
    {
        id: 'f1',
        merchantName: 'Samsung Official',
        merchantLogo: 'https://picsum.photos/seed/samsung/100/100',
        content: 'Galaxy S24 Ultra kini hadir dengan AI terbaru. Transformasi cara Anda berkreasi dan bermain!',
        imageUrl: 'https://picsum.photos/seed/s24/800/800',
        likes: '2.5rb',
        comments: '124',
        time: '2 jam yang lalu',
    },
    {
        id: 'f2',
        merchantName: 'Nike Store',
        merchantLogo: 'https://picsum.photos/seed/nike/100/100',
        content: 'Air Jordan Retro. Klasik yang tak pernah luntur. Check it out now!',
        imageUrl: 'https://picsum.photos/seed/nikejordan/800/800',
        likes: '4.7rb',
        comments: '256',
        time: '5 jam yang lalu',
    },
    {
        id: 'f3',
        merchantName: 'Uniqlo Indonesia',
        merchantLogo: 'https://picsum.photos/seed/uniqlo/100/100',
        content: 'Koleksi LifeWear terbaru untuk kenyamanan aktivitas harian Anda. Berkualitas dan stylish.',
        imageUrl: 'https://picsum.photos/seed/lifestyle/800/800',
        likes: '1.2rb',
        comments: '85',
        time: 'Kemarin',
    },
];

const FeedScreen = () => {
    const navigation = useNavigation<any>();
    const renderFeedItem = ({ item }: any) => (
        <View style={styles.feedCard}>
            {/* Header */}
            <View style={styles.cardHeader}>
                <Image source={{ uri: item.merchantLogo }} style={styles.merchantLogo} />
                <View style={styles.headerText}>
                    <Text style={styles.merchantName}>{item.merchantName}</Text>
                    <Text style={styles.postTime}>{item.time}</Text>
                </View>
                <TouchableOpacity style={styles.followBtn}>
                    <Text style={styles.followBtnText}>Follow</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreIcon}>
                    <Icon name="more-horizontal" size={20} color={COLORS.grey} />
                </TouchableOpacity>
            </View>

            {/* Content Text */}
            <Text style={styles.caption}>{item.content}</Text>

            {/* Main Image */}
            <Image source={{ uri: item.imageUrl }} style={styles.postImage} />

            {/* Actions */}
            <View style={styles.actionRow}>
                <View style={styles.leftActions}>
                    <TouchableOpacity style={styles.actionItem}>
                        <Icon name="heart" size={normalize(22)} color={COLORS.grey} />
                        <Text style={styles.actionCount}>{item.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionItem}>
                        <Icon name="message-circle" size={normalize(22)} color={COLORS.grey} />
                        <Text style={styles.actionCount}>{item.comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionItem}>
                        <Icon name="share-2" size={normalize(22)} color={COLORS.grey} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.viewProductBtn}>
                    <Text style={styles.viewProductBtnText}>Lihat Produk</Text>
                    <Icon name="chevron-right" size={16} color={COLORS.white} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Feed</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Icon name="search" size={normalize(22)} color={COLORS.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Cart')}>
                        <Icon name="shopping-cart" size={normalize(22)} color={COLORS.black} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={FEED_DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderFeedItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        height: normalize(56),
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    headerRight: {
        flexDirection: 'row',
    },
    headerIcon: {
        marginLeft: SPACING.md,
    },
    listContent: {
        paddingVertical: SPACING.sm,
    },
    feedCard: {
        backgroundColor: COLORS.white,
        marginBottom: SPACING.sm,
        paddingBottom: SPACING.md,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
    },
    merchantLogo: {
        width: normalize(40),
        height: normalize(40),
        borderRadius: 20,
        backgroundColor: COLORS.lightGrey,
    },
    headerText: {
        flex: 1,
        marginLeft: SPACING.sm,
    },
    merchantName: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    postTime: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginTop: 2,
    },
    followBtn: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        paddingHorizontal: SPACING.md,
        paddingVertical: 4,
        borderRadius: SIZES.radius,
        marginRight: SPACING.sm,
    },
    followBtnText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: normalize(12),
    },
    moreIcon: {
        padding: 4,
    },
    caption: {
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.sm,
        fontSize: normalize(14),
        color: COLORS.black,
        lineHeight: normalize(18),
    },
    postImage: {
        width: width,
        height: width,
        resizeMode: 'cover',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: SPACING.md,
        paddingHorizontal: SPACING.md,
    },
    leftActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.lg,
    },
    actionCount: {
        marginLeft: 4,
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    viewProductBtn: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.sm,
        paddingVertical: 6,
        borderRadius: SIZES.radius,
    },
    viewProductBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(12),
        marginRight: 4,
    },
});

export default FeedScreen;
