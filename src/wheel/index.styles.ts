import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  scrollView: {
    flex: 1,
    overflow: 'hidden',
  },

  selectedIndicator: {
    backgroundColor: 'hsl(200, 8%, 94%)',
    borderRadius: 5,
    position: 'absolute',
    top: '50%',
    width: '100%',
  },

  option: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    zIndex: 100,
  },

  overlay: {
    backgroundColor: 'white',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
});
