import { Text } from '@chakra-ui/react';

import styles from '@/styles/components/Ticker.module.scss';

type TickerProps = {
  name: string;
  symbol: string;
  callback: (symbol: string) => void;
};

const Ticker = ({ name, symbol, callback }: TickerProps) => {
  const { container } = styles;

  return (
    <div
      className={container}
      onClick={() => callback(symbol)}>
      <Text
        fontSize="xl"
        paddingRight={'4em'}>
        {symbol}
      </Text>
      <Text fontSize="md"> {name}</Text>
    </div>
  );
};

export default Ticker;
