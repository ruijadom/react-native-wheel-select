import { Animated, type StyleProp, type ViewStyle } from 'react-native';

export interface ItemProps {
  style: StyleProp<ViewStyle>;
  height: number;
  index: number;
  currentScrollIndex: Animated.AnimatedAddition<number>;
  visibleRest: number;
  computeRotation: (x: number) => number;
  opacityFunction: (x: number) => number;
  computeScale: (x: number) => number;
  children: React.ReactElement | null;
}
