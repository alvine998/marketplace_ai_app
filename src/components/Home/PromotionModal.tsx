import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

const { width, height } = Dimensions.get('window');

interface PromotionModalProps {
    visible: boolean;
    onClose: () => void;
    onPressCTA?: () => void;
    imageUrl?: string;
    ctaText?: string;
}

const PromotionModal = ({
    visible,
    onClose,
    onPressCTA,
    imageUrl = 'https://picsum.photos/seed/promo1/800/1200',
    ctaText = 'Cek Sekarang'
}: PromotionModalProps) => {
    const scaleAnim = React.useRef(new Animated.Value(0)).current;
    console.log('imageUrl', imageUrl);
    React.useEffect(() => {
        if (visible) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                friction: 8,
                tension: 40,
            }).start();
        } else {
            scaleAnim.setValue(0);
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.container,
                        { transform: [{ scale: scaleAnim }] }
                    ]}
                >
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Icon name="x" size={24} color={COLORS.white} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={onPressCTA}
                        style={styles.imageContainer}
                    >
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.promoImage}
                            resizeMode="cover"
                        />
                        <View style={styles.ctaContainer}>
                            <Text style={styles.ctaText}>{ctaText}</Text>
                            <Icon name="chevron-right" size={20} color={COLORS.white} />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: width * 0.85,
        height: height * 0.6,
        borderRadius: SIZES.radius * 2,
        overflow: 'hidden',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: SPACING.md,
        right: SPACING.md,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: normalize(36),
        height: normalize(36),
        borderRadius: normalize(18),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
    },
    promoImage: {
        width: '100%',
        height: '100%',
    },
    ctaContainer: {
        position: 'absolute',
        bottom: SPACING.xl,
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    ctaText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(16),
        marginRight: 8,
    },
});

export default PromotionModal;
