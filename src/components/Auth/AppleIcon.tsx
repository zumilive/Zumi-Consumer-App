import {Flex} from 'native-base';
import React from 'react';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

interface AppleIconProps {}

function AppleIcon({}: AppleIconProps) {
  return (
    <Animated.View
      style={{
        width: 52,
        height: 52,
        backgroundColor: 'white',
        borderRadius: 9.4,
      }}>
      <Flex w="full" h="full" justifyContent={'center'} alignItems={'center'}>
        <Icon size={52} name={'apple'} />
      </Flex>
    </Animated.View>
  );
}

export default AppleIcon;
