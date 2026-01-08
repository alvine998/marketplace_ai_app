import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
} from 'react-native';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

const { width, height } = Dimensions.get('window');

const ONBOARDING_DATA = [
    {
        id: '1',
        title: 'Selamat Datang\nDi Pretty Shop',
        description: 'Beragam produk kebutuhan\nhingga promo menarik untuk\nanda',
        image: require('../../assets/images/onboarding1.png'),
    },
    {
        id: '2',
        title: 'Banyak Diskon %',
        description: 'Pretty Shop mempermudah\npembelian produk kebutuhan\nanda',
        image: require('../../assets/images/onboarding2.png'),
    },
    {
        id: '3',
        title: 'Mitra Pretty Shop',
        description: 'Jadilah mitra Pretty Shop untuk\nMeningkatkan penjualan anda',
        image: require('../../assets/images/onboarding3.png'),
    },
];

const OnboardingScreen = ({ navigation }: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef<any>(null);

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0]?.index || 0);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollToNext = () => {
        if (currentIndex < ONBOARDING_DATA.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.replace('Login');
        }
    };

    const scrollToPrev = () => {
        if (currentIndex > 0) {
            slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
        }
    };

    const Paginator = () => {
        return (
            <View style={styles.paginatorContainer}>
                {ONBOARDING_DATA.map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 20, 10],
                        extrapolate: 'clamp',
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            style={[
                                styles.dot,
                                { width: dotWidth, opacity, backgroundColor: COLORS.primary },
                            ]}
                            key={i.toString()}
                        />
                    );
                })}
            </View>
        );
    };

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.slide}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} resizeMode="cover" />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={ONBOARDING_DATA}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                })}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
            />

            <View style={styles.footer}>
                <Paginator />

                <View style={styles.buttonContainer}>
                    {currentIndex > 0 ? (
                        <TouchableOpacity onPress={scrollToPrev}>
                            <Text style={styles.prevText}>Kembali</Text>
                        </TouchableOpacity>
                    ) : (
                        <View />
                    )}

                    <TouchableOpacity onPress={scrollToNext}>
                        <Text style={styles.nextText}>
                            {currentIndex === ONBOARDING_DATA.length - 1 ? 'Mulai' : 'Selanjutnya'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    slide: {
        width,
        flex: 1,
    },
    imageContainer: {
        flex: 0.65,
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 0.35,
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.lg,
    },
    title: {
        fontSize: normalize(28),
        fontWeight: 'bold',
        color: COLORS.black,
        lineHeight: normalize(34),
        marginBottom: SPACING.md,
    },
    description: {
        fontSize: normalize(16),
        color: COLORS.grey,
        lineHeight: normalize(22),
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height * 0.15,
        paddingHorizontal: SPACING.xl,
        justifyContent: 'center',
    },
    paginatorContainer: {
        flexDirection: 'row',
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    prevText: {
        fontSize: normalize(16),
        fontWeight: '600',
        color: COLORS.black,
    },
    nextText: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.primary,
    },
});

export default OnboardingScreen;
