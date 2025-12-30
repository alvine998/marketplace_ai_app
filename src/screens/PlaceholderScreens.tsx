import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { COLORS, SPACING, SIZES } from '../utils/theme';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/Feather';

const PlaceholderScreen = ({ name, icon }: { name: string; icon: string }) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Icon name={icon} size={normalize(80)} color={COLORS.primary + '30'} />
                <Text style={styles.text}>{name} Screen</Text>
                <Text style={styles.subText}>This feature is coming soon to your marketplace app!</Text>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Kembali ke Beranda</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    text: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: COLORS.black,
        marginTop: SPACING.md,
    },
    subText: {
        fontSize: normalize(14),
        color: COLORS.grey,
        textAlign: 'center',
        marginTop: SPACING.sm,
        marginBottom: SPACING.xl,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderRadius: SIZES.radius,
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(14),
    },
});

export const FeedScreen = () => <PlaceholderScreen name="Feed" icon="rss" />;
export const OfficialStoreScreen = () => <PlaceholderScreen name="Official Store" icon="shopping-bag" />;
export const WishlistScreen = () => <PlaceholderScreen name="Wishlist" icon="heart" />;
export const TransactionScreen = () => <PlaceholderScreen name="Transaction" icon="list" />;
