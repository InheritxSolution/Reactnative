import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/**
 * SkeletonLoader Component
 * Provides a premium shimmering effect for loading states.
 * Inheritx Solutions - Premium Portfolio Showcase
 */
const SkeletonLoader = ({ width, height, borderRadius = 8, style }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startAnimation = () => {
            animatedValue.setValue(0);
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => startAnimation());
        };

        startAnimation();
    }, [animatedValue]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, width],
    });

    return (
        <View style={[styles.container, { width, height, borderRadius }, style]}>
            <Animated.View style={[styles.shimmer, { transform: [{ translateX }] }]}>
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E0E0E0',
        overflow: 'hidden',
    },
    shimmer: {
        width: '100%',
        height: '100%',
    },
});

export default SkeletonLoader;
