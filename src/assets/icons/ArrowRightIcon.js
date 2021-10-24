import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgArrowRightIcon(props) {
  return (
    <Svg height={24} viewBox="0 0 24 24" width={24} className="''" {...props}>
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path
        fill="currentColor"
        d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
      />
    </Svg>
  );
}

export default SvgArrowRightIcon;
