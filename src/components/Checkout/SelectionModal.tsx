import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Animated,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SelectionItem {
    id: string;
    title: string;
    subtitle?: string;
    price?: string;
    icon?: string;
    iconColor?: string;
    image?: string;
}

interface SelectionModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    data: SelectionItem[];
    selectedValue: string;
    onSelect: (item: SelectionItem) => void;
}

const SelectionModal = ({
    visible,
    onClose,
    title,
    data,
    selectedValue,
    onSelect
}: SelectionModalProps) => {
    const translateY = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    React.useEffect(() => {
        if (visible) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                friction: 8,
                tension: 40,
            }).start();
        } else {
            translateY.setValue(SCREEN_HEIGHT);
        }
    }, [visible]);

    const renderItem = ({ item }: { item: SelectionItem }) => {
        const isSelected = item.id === selectedValue;

        return (
            <TouchableOpacity
                style={[styles.item, isSelected && styles.selectedItem]}
                onPress={() => onSelect(item)}
                activeOpacity={0.7}
            >
                <View style={styles.itemLeft}>
                    {item.icon ? (
                        <View style={[styles.iconContainer, { backgroundColor: (item.iconColor || COLORS.primary) + '15' }]}>
                            <Icon name={item.icon} size={20} color={item.iconColor || COLORS.primary} />
                        </View>
                    ) : item.image ? (
                        <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
                    ) : null}

                    <View style={styles.itemInfo}>
                        <Text style={[styles.itemTitle, isSelected && styles.selectedText]}>{item.title}</Text>
                        {item.subtitle && <Text style={styles.itemSubtitle}>{item.subtitle}</Text>}
                    </View>
                </View>

                <View style={styles.itemRight}>
                    {item.price && <Text style={styles.itemPrice}>{item.price}</Text>}
                    <View style={[styles.radio, isSelected && styles.radioActive]}>
                        {isSelected && <View style={styles.radioInner} />}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <Animated.View
                    style={[
                        styles.sheet,
                        { transform: [{ translateY }] }
                    ]}
                >
                    <TouchableOpacity activeOpacity={1}>
                        <View style={styles.handle} />
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>{title}</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Icon name="x" size={normalize(24)} color={COLORS.black} />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            contentContainerStyle={styles.listContent}
                            showsVerticalScrollIndicator={false}
                        />
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: normalize(20),
        borderTopRightRadius: normalize(20),
        maxHeight: SCREEN_HEIGHT * 0.7,
        paddingBottom: SPACING.xl,
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: COLORS.border,
        borderRadius: 3,
        alignSelf: 'center',
        marginTop: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    listContent: {
        padding: SPACING.md,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    selectedItem: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary + '03',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: normalize(40),
        height: normalize(40),
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImage: {
        width: normalize(40),
        height: normalize(25),
    },
    itemInfo: {
        marginLeft: SPACING.md,
        flex: 1,
    },
    itemTitle: {
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    selectedText: {
        color: COLORS.primary,
    },
    itemSubtitle: {
        fontSize: normalize(12),
        color: COLORS.grey,
        marginTop: 2,
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemPrice: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: COLORS.black,
        marginRight: SPACING.md,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioActive: {
        borderColor: COLORS.primary,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
    },
});

export default SelectionModal;
