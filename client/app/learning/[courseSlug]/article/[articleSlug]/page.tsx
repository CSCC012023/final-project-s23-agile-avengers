'use client';

import React, { useState, useEffect } from 'react';
import { Article } from '@/types/learning';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import BlogAuthor from '@/components/ContentArticle/BlogAuthor';
import ArticleImage from '@/components/ContentArticle/ArticleImage';

type ArticleProps = {
  params: {
    courseSlug?: string;
    articleSlug?: string;
  };
};

const ArticleList = ({ params }: ArticleProps) => {
  const [article, setArticle] = useState<Article>();

  const getArticle = async () => {
    try {
      // update to better promise handling
      const response: Response = await fetch(
        `http://localhost:4000/articles?articleSlug=${params.articleSlug}`
      );
      const jsonData: any = await response.json();
      setArticle(jsonData.article);
    } catch (e: any) {
      console.error(e.message);
    }
  };

  /* Without a dependency array the call to get all article is only made once */
  useEffect(() => {
    getArticle();
  }, []);
  return article == undefined ? (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  ) : (
    <div>
      <Container maxW={'7xl'}>
        <Heading>{article?.name}</Heading>
        <Box>
          <BlogAuthor
            name={String(article.author)}
            date={String(article.createdAt)}
          />
        </Box>

        <Divider marginTop="5" />
        <Wrap
          spacing="30px"
          marginTop="5">
          <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
            <Box w="100%">
              <ArticleImage image={article.image} />
            </Box>
          </WrapItem>
        </Wrap>

        <VStack
          paddingTop="20px"
          spacing="2"
          alignItems="flex-start">
          <Text fontSize="lg">{article?.articleText} </Text>
        </VStack>
      </Container>
    </div>
  );
};

export default ArticleList;
