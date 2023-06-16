'use client';

import React, { useState, useEffect } from 'react';
import { Article } from '../../../server/src/types/learning';

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
} from '@chakra-ui/react';

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack
      spacing={2}
      marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag
            size={'md'}
            variant="solid"
            colorScheme="gray"
            key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: String;
  name: String;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack
      marginTop="2"
      spacing="2"
      display="flex"
      alignItems="center">
      <Text fontWeight="medium">By: {props.name}</Text>
      <Text>— {props.date}</Text>
    </HStack>
  );
};

const ArticlePage = () => {
  const [article, setArticle] = useState<Array<Article>>([]);
  const getArticle = async () => {
    try {
      // update to better promise handling
      const response: Response = await fetch('http://localhost:4000/article');
      const jsonData: any = await response.json();

      setArticle(jsonData);
    } catch (e: any) {
      console.error(e.message);
    }
  };

  /* Without a dependency array the call to get all article is only made once */
  useEffect(() => {
    getArticle();
  }, []);

  return article.map((article, index) => {
    return (
      <div key={index}>
        <Container
          maxW={'7xl'}
          p="12">
          <Heading as="h1">{article.name}</Heading>
          <Text>
            <BlogAuthor
              name={String(article.author)}
              date={article.createdAt.toString()}
            />
          </Text>

          <Divider marginTop="5" />
          <Wrap
            spacing="30px"
            marginTop="5">
            <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
              <Box w="100%">
                <Box
                  borderRadius="lg"
                  overflow="hidden">
                  <Link
                    textDecoration="none"
                    _hover={{ textDecoration: 'none' }}>
                    <Image
                      float="left"
                      transform="scale(1.0)"
                      src={String(article.image)}
                      alt="some text"
                      objectFit="contain"
                      width="100%"
                      transition="0.3s ease-in-out"
                      _hover={{
                        transform: 'scale(1.05)',
                      }}
                    />
                  </Link>
                </Box>
              </Box>
            </WrapItem>
          </Wrap>

          <VStack
            paddingTop="40px"
            spacing="2"
            alignItems="flex-start">
            <Text
              as="p"
              fontSize="lg">
              {article.articleText}{' '}
            </Text>
            <Text
              as="p"
              fontSize="lg">
              {article.articleText}{' '}
            </Text>
            <Text
              as="p"
              fontSize="lg">
              {article.articleText}{' '}
            </Text>
          </VStack>
        </Container>
      </div>
    );
  });
};

export default ArticlePage;
