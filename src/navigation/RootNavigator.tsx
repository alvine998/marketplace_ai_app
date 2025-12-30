import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SIZES } from '../utils/theme';
import normalize from 'react-native-normalize';

import HomeScreen from '../screens/Home/HomeScreen';
import WishlistScreen from '../screens/Wishlist/WishlistScreen';
import TransactionScreen from '../screens/Transactions/TransactionScreen';
import {
    FeedScreen,
    OfficialStoreScreen,
} from '../screens/PlaceholderScreens';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const SidebarContent = (props: any) => (
    <View style={styles.sidebarContainer}>
        <Text style={styles.sidebarTitle}>Menu</Text>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.sidebarItem} onPress={() => props.navigation.closeDrawer()}>
            <Icon name="user" size={20} color={COLORS.black} />
            <Text style={styles.sidebarItemText}>Profil Saya</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem} onPress={() => props.navigation.closeDrawer()}>
            <Icon name="settings" size={20} color={COLORS.black} />
            <Text style={styles.sidebarItemText}>Pengaturan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem} onPress={() => props.navigation.closeDrawer()}>
            <Icon name="help-circle" size={20} color={COLORS.black} />
            <Text style={styles.sidebarItemText}>Bantuan</Text>
        </TouchableOpacity>
    </View>
);

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
                tabBarActiveTintColor: '#03AC0E',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Official Store" component={OfficialStoreScreen} />
            <Tab.Screen name="Wishlist" component={WishlistScreen} />
            <Tab.Screen name="Transactions" component={TransactionScreen} />
        </Tab.Navigator>
    );
};

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <SidebarContent {...props} />}
                screenOptions={{
                    drawerPosition: 'right',
                    headerShown: false,
                    drawerType: 'front',
                }}
            >
                <Drawer.Screen name="MainTabs" component={MainTabs} />
            </Drawer.Navigator>
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
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: SPACING.md,
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
