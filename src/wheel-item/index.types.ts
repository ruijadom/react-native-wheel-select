import { type StyleProp, type ViewStyle } from 'react-native';

export interface ItemProps {
  style: StyleProp<ViewStyle>;
  height: number;
  children: React.ReactElement | null;
}
