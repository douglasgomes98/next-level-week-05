import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface SliderProps {
  max: number;
  value: number;
  onChange: (amount: number) => void;
}

function SliderWrapper({ max, value, onChange }: SliderProps) {
  return (
    <>
      <Slider
        trackStyle={{ backgroundColor: '#04d361' }}
        railStyle={{ backgroundColor: '#9f75ff' }}
        handleStyle={{
          borderColor: '#04d361',
          borderWidth: 4,
        }}
        max={max}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default SliderWrapper;
