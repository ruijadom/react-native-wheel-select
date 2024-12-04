import {
  FlatList,
  type ListRenderItemInfo,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './index.styles';
import type { WheelPickerProps } from './index.types';

export const Wheel = ({
  containerProps = {},
  containerStyle = {},
  itemHeight = 40,
  itemSelectedStyle = {},
  listProps = {},
  onChange,
  options,
  renderItem,
  selectedIndex,
  visibleItemsCount = 2,
}: WheelPickerProps) => {
  const flatListRef = useRef<FlatList<string | null>>(null);

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
    ({ item }: ListRenderItemInfo<string | null>) => {
      return (
        <View
          style={[
            styles.option,
            {
              height: itemHeight,
            },
          ]}
        >
          {typeof item === 'string' && renderItem(item, selectedIndex)}
        </View>
      );
    },
    [itemHeight, renderItem, selectedIndex]
  );

  useEffect(() => {
    if (options.length === 0) {
      return; // Don't validate if there are no options
    }

    if (selectedIndex < 0 || selectedIndex >= options.length) {
      throw new Error(
        `Selected index ${selectedIndex} is out of bounds [0, ${options.length - 1}]`
      );
    }
  }, [selectedIndex, options]);

  return (
    <View
      style={[styles.container, { height: containerHeight }, containerStyle]}
      {...containerProps}
    >
      <View
        style={[
          styles.overlay,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            height: containerHeight / 2 - itemHeight / 2,
            opacity: 0.5,
            top: 0,
          },
        ]}
      />
      <View
        style={[
          styles.overlay,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            height: containerHeight / 2 - itemHeight / 2,
            bottom: 0,
            opacity: 0.5,
          },
        ]}
      />
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
      <FlatList
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
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToOffsets={offsets}
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
