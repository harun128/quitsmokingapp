import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgStats(props) {
  return (
    <Svg height={24} viewBox="0 0 24 24" width={24} className="''" {...props}>
      <Path
        fill="currentColor"
        d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"
      />
      <Path d="M0 0h24v24H0z" fill="none" />
    </Svg>
  );
}

export default SvgStats;
