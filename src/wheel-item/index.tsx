import { Animated } from 'react-native';
import { memo } from 'react';
import styles from './index.styles';
import type { ItemProps } from './index.types';

const WheelItem = ({
  children,
  computeOpacity,
  computeRotation,
  computeScale,
  currentScrollIndex,
  height,
  index,
  style,
  visibleItemsCount,
}: ItemProps) => {
  const relativeScrollIndex = Animated.subtract(index, currentScrollIndex);

  const inputRange = Array.from(
    { length: visibleItemsCount * 2 + 1 },
    (_, i) => i - visibleItemsCount
  );

  const translateY = relativeScrollIndex.interpolate({
    inputRange,
    outputRange: inputRange.map((pos) => {
      let y =
        (height / 2) *
        (1 - Math.sin(Math.PI / 2 - computeRotation(Math.abs(pos))));
      for (let j = 1; j < Math.abs(pos); j++) {
        y += height * (1 - Math.sin(Math.PI / 2 - computeRotation(j)));
      }
      return pos < 0 ? y : -y;
    }),
  });

  const opacity = relativeScrollIndex.interpolate({
    inputRange,
    outputRange: inputRange.map((pos) => computeOpacity(Math.abs(pos))),
  });

  const scale = relativeScrollIndex.interpolate({
    inputRange,
    outputRange: inputRange.map((pos) => computeScale(Math.abs(pos))),
  });

  const rotateX = relativeScrollIndex.interpolate({
    inputRange,
    outputRange: inputRange.map(
      (pos) => `${computeRotation(Math.abs(pos))}deg`
    ),
  });

  return (
    <Animated.View
      style={[
        styles.option,
        style,
        {
          height,
          opacity,
          transform: [{ translateY }, { rotateX }, { scale }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default memo(WheelItem);
