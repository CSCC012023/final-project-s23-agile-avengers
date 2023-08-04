import { Td, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type TradeHistoryRowProps = {
    symbol: string;
    purchasePrice: number;
    quantity: number;
    type: string;
}
type SymbolInfo= {
    currentPrice: number;
    currentChange: number
}
const TradeHistioryRow = (Props: TradeHistoryRowProps) => {
    const {symbol, purchasePrice, quantity, type} = Props;

    const [loaded, setLoaded] = useState(false);
    const [symbolInfo, setSymbolInfo] = useState<SymbolInfo|null>(null);
    const getSymbolInfo = async () => {
    const url = `http://localhost:4000/currentPrice?symbol=${symbol}`;
    const response = await fetch(url);
    if (response.ok) {
      const symbolInfoJson = await response.json();
      setSymbolInfo({
        currentPrice: symbolInfoJson["Global Quote"]["05. price"],
        currentChange: symbolInfoJson["Global Quote"]["10. change percent"]
      });
    }
    setLoaded(true);
    }

    useEffect(() => {
        getSymbolInfo();
       }, []);

    if (!loaded || symbolInfo === null)
        return(<></>);

    return (<Tr>
        <Td>{symbol}</Td>
        <Td>{purchasePrice}</Td>
        <Td>{symbolInfo.currentPrice}</Td>
        <Td>{quantity}</Td>
        <Td>{symbolInfo.currentPrice * quantity}</Td>
        <Td>{symbolInfo.currentChange}</Td>
        <Td>{(symbolInfo.currentPrice - purchasePrice) * quantity }</Td>
        <Td>{type}</Td>
    </Tr>)
}

export default TradeHistioryRow