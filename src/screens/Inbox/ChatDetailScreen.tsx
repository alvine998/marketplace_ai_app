import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

const INITIAL_MESSAGES = [
    {
        id: '1',
        text: 'Halo kak, iPhone 15 Pro Blue Titanium ready?',
        sender: 'me',
        time: '10:25',
    },
    {
        id: '2',
        text: 'Halo, stok iPhone 15 Pro Blue Titanium ready ya kak. Silahkan diorder.',
        sender: 'other',
        time: '10:30',
    },
    {
        id: '3',
        text: 'Bisa pengiriman hari ini?',
        sender: 'me',
        time: '10:32',
    },
];

const ChatDetailScreen = ({ route, navigation }: any) => {
    const { shopName, imageUrl } = route.params || { shopName: 'Shop Name', imageUrl: 'https://picsum.photos/seed/shop1/100/100' };
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef<FlatList>(null);

    const handleSend = () => {
        if (inputText.trim() === '') return;

        const newMessage = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };

    const renderMessage = ({ item }: any) => {
        const isMe = item.sender === 'me';
        return (
            <View style={[styles.messageWrapper, isMe ? styles.myMessageWrapper : styles.otherMessageWrapper]}>
                <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
                    <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.otherMessageText]}>
                        {item.text}
                    </Text>
                    <Text style={[styles.timeText, isMe ? styles.myTimeText : styles.otherTimeText]}>
                        {item.time}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Image source={{ uri: imageUrl }} style={styles.shopImage} />
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.shopName} numberOfLines={1}>{shopName}</Text>
                    <Text style={styles.onlineStatus}>Online</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Icon name="phone" size={normalize(20)} color={COLORS.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Icon name="more-vertical" size={normalize(20)} color={COLORS.black} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Message List */}
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.listContainer}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

            {/* Input Bar */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={styles.inputBar}>
                    <TouchableOpacity style={styles.attachmentButton}>
                        <Icon name="plus" size={normalize(24)} color={COLORS.primary} />
                    </TouchableOpacity>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Tulis pesan..."
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                        onPress={handleSend}
                        disabled={!inputText.trim()}
                    >
                        <Icon name="send" size={normalize(20)} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.md,
        height: normalize(60),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        marginRight: SPACING.sm,
    },
    shopImage: {
        width: normalize(36),
        height: normalize(36),
        borderRadius: 18,
    },
    headerTitleContainer: {
        flex: 1,
        marginLeft: SPACING.sm,
    },
    shopName: {
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    onlineStatus: {
        fontSize: normalize(11),
        color: COLORS.primary,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    headerIcon: {
        marginLeft: SPACING.md,
        padding: 4,
    },
    listContainer: {
        padding: SPACING.md,
        paddingBottom: SPACING.xl,
    },
    messageWrapper: {
        marginBottom: SPACING.md,
        flexDirection: 'row',
    },
    myMessageWrapper: {
        justifyContent: 'flex-end',
    },
    otherMessageWrapper: {
        justifyContent: 'flex-start',
    },
    bubble: {
        maxWidth: '75%',
        padding: SPACING.sm,
        paddingHorizontal: SPACING.md,
        borderRadius: 20,
    },
    myBubble: {
        backgroundColor: '#E7F9E9',
        borderBottomRightRadius: 4,
    },
    otherBubble: {
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: 4,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    messageText: {
        fontSize: normalize(14),
        lineHeight: normalize(20),
    },
    myMessageText: {
        color: COLORS.black,
    },
    otherMessageText: {
        color: COLORS.black,
    },
    timeText: {
        fontSize: normalize(10),
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    myTimeText: {
        color: '#66B166',
    },
    otherTimeText: {
        color: COLORS.grey,
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.sm,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    attachmentButton: {
        padding: SPACING.sm,
    },
    inputWrapper: {
        flex: 1,
        backgroundColor: '#F0F3F7',
        borderRadius: 20,
        paddingHorizontal: SPACING.md,
        marginHorizontal: SPACING.xs,
        maxHeight: normalize(100),
        justifyContent: 'center',
    },
    input: {
        fontSize: normalize(14),
        color: COLORS.black,
        paddingVertical: Platform.OS === 'ios' ? 10 : 10,
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        width: normalize(40),
        height: normalize(40),
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: COLORS.lightGrey,
    },
});

export default ChatDetailScreen;
