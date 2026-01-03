import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SIZES } from '../utils/theme';
import normalize from 'react-native-normalize';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';

import HomeScreen from '../screens/Home/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetail/ProductDetailScreen';
import CartScreen from '../screens/Cart/CartScreen';
import NotificationScreen from '../screens/Notifications/NotificationScreen';
import InboxScreen from '../screens/Inbox/InboxScreen';
import ChatDetailScreen from '../screens/Inbox/ChatDetailScreen';
import CheckoutScreen from '../screens/Checkout/CheckoutScreen';
import PaymentSuccessScreen from '../screens/Checkout/PaymentSuccessScreen';
import WishlistScreen from '../screens/Wishlist/WishlistScreen';
import TransactionScreen from '../screens/Transactions/TransactionScreen';
import FeedScreen from '../screens/Feed/FeedScreen';
import OfficialStoreScreen from '../screens/OfficialStore/OfficialStoreScreen';
import PromoScreen from '../screens/Promo/PromoScreen';
import PromotionDetailScreen from '../screens/Promo/PromotionDetailScreen';
import AddressListScreen from '../screens/Address/AddressListScreen';
import AddAddressScreen from '../screens/Address/AddAddressScreen';
import BecomeSellerScreen from '../screens/Seller/BecomeSellerScreen';
import CategoryProductListScreen from '../screens/Category/CategoryProductListScreen';
import AllCategoriesScreen from '../screens/Category/AllCategoriesScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import HelpScreen from '../screens/Help/HelpScreen';
import HelpDetailScreen from '../screens/Help/HelpDetailScreen';
import SplashScreen from '../screens/SplashScreen';
import TermsScreen from '../screens/Legal/TermsScreen';
import PrivacyPolicyScreen from '../screens/Legal/PrivacyPolicyScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain" component={HomeScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
            <Stack.Screen name="Inbox" component={InboxScreen} />
            <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
            <Stack.Screen name="Promo" component={PromoScreen} />
            <Stack.Screen name="PromotionDetail" component={PromotionDetailScreen} />
            <Stack.Screen name="AddressList" component={AddressListScreen} />
            <Stack.Screen name="AddAddress" component={AddAddressScreen} />
            <Stack.Screen name="BecomeSeller" component={BecomeSellerScreen} />
            <Stack.Screen name="CategoryProductList" component={CategoryProductListScreen} />
            <Stack.Screen name="AllCategories" component={AllCategoriesScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <Stack.Screen name="HelpDetail" component={HelpDetailScreen} />
        </Stack.Navigator>
    );
};

const SidebarContent = (props: any) => {
    const { isLoggedIn, user, logout } = useAuth();
    const { t } = useTranslation();

    return (
        <View style={styles.sidebarContainer}>
            {!isLoggedIn ? (
                <View style={styles.loginSection}>
                    <Icon name="user" size={normalize(40)} color={COLORS.lightGrey} />
                    <Text style={styles.loginTitle}>{t('sidebar.notLoggedIn')}</Text>
                    <Text style={styles.loginSubtitle}>{t('sidebar.loginToFeatures')}</Text>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => {
                            props.navigation.closeDrawer();
                            props.navigation.navigate('Login');
                        }}
                    >
                        <Text style={styles.loginBtnText}>{t('sidebar.loginOrRegister')}</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.profileHeader}>
                    <View style={styles.profileIcon}>
                        <Icon name="user" size={normalize(30)} color={COLORS.white} />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{user?.name || 'User'}</Text>
                        <Text style={styles.profileEmail}>{user?.email}</Text>
                    </View>
                </View>
            )}

            <View style={styles.divider} />

            {isLoggedIn && (
                <View style={styles.sellerSection}>
                    <TouchableOpacity
                        style={styles.sellerBtn}
                        onPress={() => {
                            props.navigation.closeDrawer();
                            props.navigation.navigate('BecomeSeller');
                        }}
                    >
                        <Icon name="shopping-bag" size={normalize(20)} color={COLORS.primary} />
                        <Text style={styles.sellerBtnText}>Buka Toko Gratis</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.divider} />

            {isLoggedIn && (
                <TouchableOpacity style={styles.sidebarItem} onPress={() => props.navigation.closeDrawer()}>
                    <Icon name="user" size={20} color={COLORS.black} />
                    <Text style={styles.sidebarItemText}>{t('common.profile')}</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={styles.sidebarItem}
                onPress={() => {
                    props.navigation.closeDrawer();
                    props.navigation.navigate('Settings');
                }}
            >
                <Icon name="settings" size={20} color={COLORS.black} />
                <Text style={styles.sidebarItemText}>{t('common.settings')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.sidebarItem}
                onPress={() => {
                    props.navigation.closeDrawer();
                    props.navigation.navigate('Help');
                }}
            >
                <Icon name="help-circle" size={20} color={COLORS.black} />
                <Text style={styles.sidebarItemText}>{t('common.help')}</Text>
            </TouchableOpacity>

            {isLoggedIn && (
                <TouchableOpacity
                    style={[styles.sidebarItem, { marginTop: 'auto', marginBottom: SPACING.xl }]}
                    onPress={() => {
                        logout();
                        props.navigation.closeDrawer();
                    }}
                >
                    <Icon name="log-out" size={20} color="#FF4D4D" />
                    <Text style={[styles.sidebarItemText, { color: '#FF4D4D' }]}>{t('common.logout')}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = 'help-circle';

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Feed') {
                        iconName = 'rss';
                    } else if (route.name === 'Official Store') {
                        iconName = 'shopping-bag';
                    } else if (route.name === 'Wishlist') {
                        iconName = 'heart';
                    } else if (route.name === 'Transactions') {
                        iconName = 'list';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Official Store" component={OfficialStoreScreen} />
            <Tab.Screen name="Wishlist" component={WishlistScreen} />
            <Tab.Screen name="Transactions" component={TransactionScreen} />
        </Tab.Navigator>
    );
};

const MainDrawer = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <SidebarContent {...props} />}
            screenOptions={{
                drawerPosition: 'right',
                headerShown: false,
                drawerType: 'front',
            }}
        >
            <Drawer.Screen name="MainTabs" component={MainTabs} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Register" component={RegisterScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="Help" component={HelpScreen} />
            <Drawer.Screen name="HelpDetail" component={HelpDetailScreen} />
            <Drawer.Screen name="TermsDrawer" component={TermsScreen} />
            <Drawer.Screen name="PrivacyDrawer" component={PrivacyPolicyScreen} />
        </Drawer.Navigator>
    );
};

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Main" component={MainDrawer} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    sidebarContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: SPACING.md,
        backgroundColor: COLORS.white,
    },
    sidebarTitle: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: SPACING.md,
    },
    loginSection: {
        marginBottom: SPACING.lg,
    },
    loginTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
        marginTop: SPACING.sm,
    },
    loginSubtitle: {
        fontSize: normalize(13),
        color: COLORS.grey,
        marginTop: 4,
        marginBottom: SPACING.md,
    },
    loginBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.sm,
        borderRadius: SIZES.radius,
        alignItems: 'center',
    },
    loginBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(14),
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    profileIcon: {
        width: normalize(50),
        height: normalize(50),
        borderRadius: normalize(25),
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfo: {
        marginLeft: SPACING.sm,
    },
    profileName: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    profileEmail: {
        fontSize: normalize(12),
        color: COLORS.grey,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: SPACING.md,
    },
    sellerSection: {
        marginBottom: SPACING.md,
    },
    sellerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary + '15',
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.primary + '30',
    },
    sellerBtnText: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.primary,
        marginLeft: SPACING.sm,
    },
    sidebarItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.md,
    },
    sidebarItemText: {
        fontSize: normalize(16),
        color: COLORS.black,
        marginLeft: SPACING.md,
    },
});

export default RootNavigator;
