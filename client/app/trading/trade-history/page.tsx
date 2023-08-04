'use client';
import styles from '@/styles/pages/Dashboard.module.scss';
import { Heading, Spinner, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Portfolio } from "../../../../server/src/types/trading";
import TradeHistioryRow from '../../../components/TradingHistory';
const TradeHistoryPage = () => {
  const [userPortfolio, setUserPortfolio] = useState<Portfolio| null>(null);
  const { userId } = useAuth();
  const [loaded, setLoaded] = useState(false);

  const getUserPortfolio = async () => {
    if (!userId)
      return;
    const url = `http://localhost:4000/portfolio?userID=${userId}`;
    const response = await fetch(url);
    if (response.ok) {
      const portfolio = await response.json();
      setUserPortfolio(portfolio);
    }
    setLoaded(true);
  }

  useEffect(() => {
   getUserPortfolio();
  }, [userId]);

  if (!loaded)
    return (
      <div className={styles.center}>
        <Spinner
          color="blue.500"
          emptyColor="gray.200"
          m={'auto'}
          size="xl"
          speed="0.65s"
          thickness="4px"
        />
      </div>
    );

  if (userPortfolio === null)
    return (<div>
      user has no Trade History
    </div>)

  return (
  <div>
    <Heading margin="5">
      Your Trade History
    </Heading>
    <TableContainer>
    <Table variant='simple'>
      <TableCaption>Your current 'buy' history</TableCaption>
      <Thead>
        <Tr>
          <Th>Symbol</Th>
          <Th>Purchase Price</Th>
          <Th>Current Price</Th>
          <Th>Quantity</Th>
          <Th>Total Value</Th>
          <Th>Todays Change</Th>
          <Th>Total Return</Th>
          <Th>Type</Th>

        </Tr>
      </Thead>
      <Tbody>
        {userPortfolio.equity.map((item) =>
          item.action === "buy" ?
             <TradeHistioryRow key={item.date.toString() + item.symbol.toString()}
            purchasePrice ={item.price}
            quantity={item.quantity}
            symbol={item.symbol.toString()}
            type={item.action}
            ></TradeHistioryRow>
          : <></>)}

      </Tbody>
    </Table>
  </TableContainer>
  </div>
  )
}

export default TradeHistoryPage;