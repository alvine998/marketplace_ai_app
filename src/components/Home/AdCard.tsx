import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../utils/theme';
import normalize from 'react-native-normalize';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AdCardProps {
    imageUrl: string;
    overlayText?: string;
    subText?: string;
    width?: any;
    onPress?: () => void;
}

const AdCard = ({ imageUrl, overlayText, subText, width = '100%', onPress }: AdCardProps) => {
    return (
        <TouchableOpacity style={[styles.container, { width }]} onPress={onPress} activeOpacity={0.9}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.overlay}>
                {overlayText && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{overlayText}</Text>
                    </View>
                )}
                {subText && <Text style={styles.subText}>{subText}</Text>}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: normalize(240), // Match product card approx height
        borderRadius: SIZES.radius,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        padding: SPACING.sm,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    badge: {
        backgroundColor: '#00AA5B',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: 4,
    },
    badgeText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: normalize(12),
    },
    subText: {
        color: COLORS.white,
        fontSize: normalize(16),
        fontWeight: '900',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
});

export default AdCard;
