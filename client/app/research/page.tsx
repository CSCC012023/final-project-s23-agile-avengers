'use client';

import {
  Box,
  Divider,
  Heading,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Key, useEffect, useState } from 'react';
import {
  CopyrightStyles,
  MiniChart,
  Screener,
} from 'react-ts-tradingview-widgets';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import Slider from 'react-slick';

export default function ResearchPage() {
  const [top10Stocks, setTop10Stocks] = useState<any>([]);

  const [slider, setSlider] = useState<Slider | null>(null);

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

  const styles: CopyrightStyles = {
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

  return (
    <>
      <Heading fontSize={'xl'}>Top 10 Stocks</Heading>

      <Box
        height={'600px'}
        overflow={'hidden'}
        position={'relative'}
        width={'full'}>
        {/* CSS files for react-slick */}
        <link
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          rel="stylesheet"
          type="text/css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          borderRadius="full"
          colorScheme="messenger"
          left={side}
          onClick={() => slider?.slickPrev()}
          position="absolute"
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}>
          <ArrowBackIcon />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          borderRadius="full"
          colorScheme="messenger"
          onClick={() => slider?.slickNext()}
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}>
          <ArrowForwardIcon />
        </IconButton>
        {/* Slider */}
        <Slider
          {...settings}
          ref={(slider) => setSlider(slider)}>
          {top10Stocks &&
            Array.isArray(top10Stocks) &&
            top10Stocks.map((item: any, idx: Key) => {
              return (
                <MiniChart
                  colorTheme="dark"
                  copyrightStyles={styles}
                  key={idx}
                  symbol={item.ticker}
                  width={'100%'}></MiniChart>
              );
            })}
        </Slider>
      </Box>

      <Heading
        mb="1"
        mt="3"
        size="md"
        w="100%">
        STOCK SCREENER
      </Heading>
      <Screener
        colorTheme="light"
        copyrightStyles={styles}
        defaultScreen="most_capitalized"
        height={300}
        market="america"
        width="100%"></Screener>
      <Divider />
    </>
  );
}
