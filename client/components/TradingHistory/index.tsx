import { Td, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type TradeHistoryRowProps = {
  symbol: string;
  purchasePrice: number;
  quantity: number;
};
type SymbolInfo = {
  currentPrice: number;
  currentChange: number;
};
const TradeHistioryRow = (Props: TradeHistoryRowProps) => {
  const { symbol, purchasePrice, quantity } = Props;

  const [loaded, setLoaded] = useState(false);
  const [symbolInfo, setSymbolInfo] = useState<SymbolInfo | null>(null);
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const getSymbolInfo = async () => {
    const url = `http://localhost:4000/trading/symbolPrice?symbol=${symbol}`;
    const response = await fetch(url);
    if (response.ok) {
      const symbolInfoJson = await response.json();
      setSymbolInfo({
        currentPrice: symbolInfoJson.price,
        currentChange: symbolInfoJson.change,
      });
    }
    setLoaded(true);
  };

  useEffect(() => {
    getSymbolInfo();
  }, []);

  if (!loaded || symbolInfo === null) return <></>;

  return (
    <Tr>
      <Td>{symbol}</Td>
      <Td>{USDollar.format(purchasePrice)}</Td>
      <Td>{USDollar.format(symbolInfo.currentPrice)}</Td>
      <Td>{quantity}</Td>
      <Td>{USDollar.format(symbolInfo.currentPrice * quantity)}</Td>
      <Td>{symbolInfo.currentChange}</Td>
      <Td>
        {USDollar.format((symbolInfo.currentPrice - purchasePrice) * quantity)}
      </Td>
      <Td>Buy</Td>
    </Tr>
  );
};

export default TradeHistioryRow;
