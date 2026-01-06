import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import SearchOverlay from './SearchOverlay';

const HomeHeader = () => {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const [searchVisible, setSearchVisible] = React.useState(false);

    // Mock unread counts
    const unreadMessages = 2;
    const unreadNotifications = 5;

    const renderBadge = (count: number) => {
        if (count <= 0) return null;
        return (
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.searchSection}
                    onPress={() => setSearchVisible(true)}
                    activeOpacity={0.7}
                >
                    <Icon name="search" size={20} color={COLORS.grey} style={styles.searchIcon} />
                    <View style={styles.inputPlaceholder}>
                        <Text style={styles.placeholderText}>Cari di marketplace...</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.iconSection}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => (navigation as any).navigate('Inbox')}
                    >
                        <View>
                            <Icon name="mail" size={normalize(22)} color={COLORS.black} />
                            {renderBadge(unreadMessages)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => (navigation as any).navigate('Notifications')}
                    >
                        <View>
                            <Icon name="bell" size={normalize(22)} color={COLORS.black} />
                            {renderBadge(unreadNotifications)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => (navigation as any).navigate('Cart')}
                    >
                        <Icon name="shopping-cart" size={normalize(22)} color={COLORS.black} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Icon name="menu" size={normalize(22)} color={COLORS.black} />
                    </TouchableOpacity>
                </View>
            </View>

            <SearchOverlay
                visible={searchVisible}
                onClose={() => setSearchVisible(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.white,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        backgroundColor: COLORS.white,
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
    searchIcon: {
        marginRight: SPACING.xs,
    },
    input: {
        flex: 1,
        fontSize: normalize(14),
        color: COLORS.black,
        padding: 0,
    },
    inputPlaceholder: {
        flex: 1,
        justifyContent: 'center',
    },
    placeholderText: {
        fontSize: normalize(14),
        color: COLORS.grey,
    },
    iconSection: {
        flexDirection: 'row',
        marginLeft: SPACING.sm,
    },
    iconButton: {
        padding: SPACING.xs,
        marginLeft: SPACING.xs,
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#FF4D4D',
        borderRadius: normalize(8),
        minWidth: normalize(16),
        height: normalize(16),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 2,
        borderWidth: 1.5,
        borderColor: COLORS.white,
    },
    badgeText: {
        color: COLORS.white,
        fontSize: normalize(9),
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomeHeader;
