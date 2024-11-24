import { View } from 'react-native';
import { memo } from 'react';
import styles from './index.styles';
import type { ItemProps } from './index.types';

const WheelItem = ({ children, height, style }: ItemProps) => (
  <View style={[styles.option, style, { height }]}>{children}</View>
);

export default memo(WheelItem);
