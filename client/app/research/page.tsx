'use client';

import { Divider, Heading, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  CopyrightStyles,
  MiniChart,
  Screener,
} from 'react-ts-tradingview-widgets';

import Slider from 'react-slick';

import styles from '@/styles/pages/Research.module.scss';

const Card = (props: any) => {
  const twStyles: CopyrightStyles = {
    parent: {
      display: 'none',
    },
  };

  const { content } = styles;

  return (
    <div className={content}>
      <MiniChart
        colorTheme="dark"
        copyrightStyles={twStyles}
        largeChartUrl={'http://localhost:3000/research/AAPL'}
        symbol={'AAPL'}
        width={'auto'}></MiniChart>
    </div>
  );
};

const CardContainer = (props: any) => {
  const { wrapper } = styles;
  return (
    <>
      <div className={wrapper}>
        {props.cards.map((card: any, idx: any) => (
          <Card
            content={card.content}
            imgUrl={card.imgUrl}
            key={idx}
            title={card.title}
          />
        ))}
      </div>
    </>
  );
};

export default function ResearchPage() {
  const [top10Stocks, setTop10Stocks] = useState<any>([]);

  const [slider, setSlider] = useState<Slider | null>(null);

  const cardsData = [
    {
      id: 1,
      title: 'CARD 1',
      content: 'Clark Kent',
      imgUrl: 'https://unsplash.it/200/200',
    },
    {
      id: 2,
      title: 'CARD 2',
      content: 'Bruce Wayne',
      imgUrl: 'https://unsplash.it/201/200',
    },
    {
      id: 3,
      title: 'CARD 3',
      content: 'Peter Parker',
      imgUrl: 'https://unsplash.it/200/201',
    },
    {
      id: 4,
      title: 'CARD 4',
      content: 'Tony Stark',
      imgUrl: 'https://unsplash.it/201/201',
    },
    {
      id: 5,
      title: 'CARD 5',
      content: 'Reed Richards',
      imgUrl: 'https://unsplash.it/202/200',
    },
    {
      id: 6,
      title: 'CARD 6',
      content: 'Wade Wilson',
      imgUrl: 'https://unsplash.it/200/199',
    },
    {
      id: 7,
      title: 'CARD 7',
      content: 'Peter Quill',
      imgUrl: 'https://unsplash.it/199/199',
    },
    {
      id: 8,
      title: 'CARD 8',
      content: 'Steven Rogers',
      imgUrl: 'https://unsplash.it/199/200',
    },
    {
      id: 9,
      title: 'CARD 9',
      content: 'Bruce Banner',
      imgUrl: 'https://unsplash.it/200/198',
    },
    {
      id: 10,
      title: 'CARD 10',
      content: 'Vincent Strange',
      imgUrl: 'https://unsplash.it/198/199',
    },
  ];

  useEffect(() => {
    const getTops = async () => {
      try {
        const response: Response = await fetch(
          `http://localhost:4000/top10Stocks`
        );
        const jsonResponse: any = await response.json();
        setTop10Stocks(jsonResponse);
      } catch (e: any) {
        console.error(e);
      }
    };

    getTops();
  }, []);

  const twStyles: CopyrightStyles = {
    parent: {
      display: 'none',
    },
  };

  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 10,
    slidesToScroll: 10,
  };

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  const { container } = styles;

  return (
    <>
      <Heading fontSize={'xl'}>Top 10 Stocks</Heading>

      <div className={container}>
        <CardContainer cards={cardsData} />
      </div>

      <Heading
        mb="1"
        mt="3"
        size="md"
        w="100%">
        STOCK SCREENER
      </Heading>
      <Screener
        colorTheme="light"
        copyrightStyles={twStyles}
        defaultScreen="most_capitalized"
        height={300}
        market="america"
        width="100%"></Screener>
      <Divider />
    </>
  );
}
