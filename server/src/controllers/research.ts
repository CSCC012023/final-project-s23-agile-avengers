import { Request, Response } from 'express';

import { queryAlphaVantage } from '../utils/query';

type SymbolSearchResults = {
  symbol: string;
  name: string;
};

export const getSymbolAutoComplete = async (req: Request, res: Response) => {
  const searchText = req.query.searchText as string;
  if (!searchText)
    return res.status(400).json({ message: 'Please provide searchText' });

  const userIDRegex = /^[A-Za-z]+/;
  if (!userIDRegex.test(searchText))
    return res.status(400).json({ message: 'Invalid searchText' });

  try {
    const { bestMatches }: { bestMatches: Record<string, string>[] } =
      await queryAlphaVantage({
        function: 'SYMBOL_SEARCH',
        keywords: searchText,
      });

    if (!bestMatches)
      return res.status(400).json({ message: 'Unable Find Results' });

    const result: SymbolSearchResults[] = bestMatches
      .filter((result) => {
        return result['3. type'] === 'Equity';
      })
      .map((result) => {
        return {
          symbol: result['1. symbol'],
          name: result['2. name'],
        };
      });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: 'Unable Search Symbol' });
  }
};
