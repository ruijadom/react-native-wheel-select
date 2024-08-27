import {
  Animated,
  FlatList,
  type ListRenderItemInfo,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import WheelItem from '../wheel-item';
import styles from './index.styles';
import type { WheelPickerProps } from './index.types';

// Wrap FlatList with Animated.createAnimatedComponent
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const computeFunctions = {
  computeOpacity: (x: number) => Math.pow(1 / 3, x),
  computeRotation: (x: number) => 1 - Math.pow(1 / 2, x),
  computeScale: (x: number) => Math.pow(1, x), // Simplified for performance
};

// Memoized WheelItem to avoid unnecessary re-renders
const MemoizedWheelItem = React.memo(WheelItem);

export const Wheel = ({
  computeOpacity = computeFunctions.computeOpacity,
  computeRotation = computeFunctions.computeRotation,
  computeScale = computeFunctions.computeScale,
  containerProps = {},
  containerStyle = {},
  itemHeight = 40,
  itemSelectedStyle = {},
  itemStyle = {},
  listProps = {},
  onChange,
  options,
  renderItem,
  scrollDecelerationRate = 'fast',
  selectedIndex,
  visibleItemsCount = 2,
}: WheelPickerProps) => {
  const flatListRef = useRef<Animated.FlatList<string | null>>(null);
  const [scrollY] = useState(new Animated.Value(0));

  const containerHeight = useMemo(
    () => (1 + visibleItemsCount * 2) * itemHeight,
    [visibleItemsCount, itemHeight]
  );

  const customOptions = useMemo(() => {
    const array: (string | null)[] = [...options];
    for (let i = 0; i < visibleItemsCount; i++) {
      array.unshift(null);
      array.push(null);
    }
    return array;
  }, [options, visibleItemsCount]);

  const offsets = useMemo(
    () => customOptions.map((_, i) => i * itemHeight),
    [customOptions, itemHeight]
  );

  const currentScrollIndex = useMemo(
    () => Animated.add(Animated.divide(scrollY, itemHeight), visibleItemsCount),
    [visibleItemsCount, scrollY, itemHeight]
  );

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = Math.min(
        itemHeight * (options.length - 1),
        Math.max(event.nativeEvent.contentOffset.y, 0)
      );

      let index = Math.floor(offsetY / itemHeight);
      const last = offsetY % itemHeight;
      if (last > itemHeight / 2) index++;

      if (index !== selectedIndex) {
        onChange(index);
      }
    },
    [itemHeight, options.length, selectedIndex, onChange]
  );

  const renderWheelItem = useCallback(
    ({ index, item }: ListRenderItemInfo<string | null>) => (
      <MemoizedWheelItem
        key={`option-${index}`}
        index={index}
        style={itemStyle}
        height={itemHeight}
        currentScrollIndex={currentScrollIndex}
        computeRotation={computeRotation}
        computeScale={computeScale}
        computeOpacity={computeOpacity}
        visibleItemsCount={visibleItemsCount}
      >
        {renderItem(item, index)}
      </MemoizedWheelItem>
    ),
    [
      itemStyle,
      itemHeight,
      currentScrollIndex,
      computeRotation,
      computeScale,
      computeOpacity,
      visibleItemsCount,
      renderItem,
    ]
  );

  useEffect(() => {
    if (selectedIndex < 0 || selectedIndex >= options.length) {
      throw new Error(
        `Selected index ${selectedIndex} is out of bounds [0, ${options.length - 1}]`
      );
    }

    // Clean up animations or listeners when component unmounts
    return () => {
      scrollY.removeAllListeners(); // Ensure all listeners are removed
    };
  }, [selectedIndex, options, scrollY]);

  return (
    <View
      style={[styles.container, { height: containerHeight }, containerStyle]}
      {...containerProps}
    >
      <View
        style={[
          styles.selectedIndicator,
          itemSelectedStyle,
          {
            transform: [{ translateY: -itemHeight / 2 }],
            height: itemHeight,
          },
        ]}
      />
      <AnimatedFlatList
        {...listProps}
        ref={flatListRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onLayout={() => {
          flatListRef.current?.scrollToIndex({
            index: selectedIndex,
            animated: false,
          });
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true } // Enable native driver
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToOffsets={offsets}
        decelerationRate={scrollDecelerationRate}
        initialScrollIndex={selectedIndex}
        renderItem={renderWheelItem}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        data={customOptions}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default React.memo(Wheel);
