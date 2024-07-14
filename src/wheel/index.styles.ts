import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'relative',
    width: 80,
  },
  selectedIndicator: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'hsl(200, 8%, 94%)',
    borderRadius: 5,
    top: '50%',
  },
  scrollView: {
    overflow: 'hidden',
    flex: 1,
  },
});
