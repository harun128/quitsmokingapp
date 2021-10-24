import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgCheckIcon(props) {
  return (
    <Svg height={24} viewBox="0 0 24 24" width={24} className="''" {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path
        fill="currentColor"
        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
      />
    </Svg>
  );
}

export default SvgCheckIcon;
