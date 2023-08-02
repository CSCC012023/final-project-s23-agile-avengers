'use client';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Tag,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const FavouritesPage = () => {
  const [favouriteArticles, setFavouriteArticles] = useState<any[]>([]);
  const [favouriteVideos, setFavouriteVideos] = useState<any[]>([]);
  const [contentType, setContentType] = useState<string>('Article');

  const getFavouriteArticles = async () => {
    try {
      // update to better promise handling
      const response: Response = await fetch(
        'http://localhost:4000/favouriteArticles',
      );
      const jsonArticles: any[] = await response.json();
      console.log('JSON ARTICLES:', jsonArticles);
      setFavouriteArticles(jsonArticles);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const getFavouriteVideos = async () => {
    try {
      // update to better promise handling
      const response: Response = await fetch(
        'http://localhost:4000/favouriteVideos',
      );
      const jsonVideos: any[] = await response.json();
      console.log('JSON Videos:', jsonVideos);
      setFavouriteVideos(jsonVideos);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  /* Without a dependency array the call to get all courses is only made once */
  useEffect(() => {
    getFavouriteArticles();
    getFavouriteVideos();
  }, []);

  return (
    <>
      <Flex justifyContent={'space-between'}>
        <Heading>Favourites Page</Heading>
        <Text>Filter by:</Text>
        <Menu isLazy>
          <Flex
            alignItems="center"
            gap="2"
            marginBottom={'20px'}
            marginTop={'10px'}
            minWidth="max-content">
            {' '}
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="outline">
              {contentType}
            </MenuButton>
          </Flex>
          <MenuList>
            <MenuItem onClick={() => setContentType('Article')}>
              Article
            </MenuItem>
            <MenuItem onClick={() => setContentType('Video')}>Video</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(350px, 1fr))">
        {contentType === 'Article'
          ? favouriteArticles.map((item, idx) => {
              return (
                <Card key={idx}>
                  <CardHeader>
                    <Flex justifyContent={'space-between'}>
                      <Heading size="md">{item.article.name}</Heading>
                      <Tag
                        size={'md'}
                        colorScheme="teal">
                        {item.article.contentType.toUpperCase()}
                      </Tag>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Text>Author: {item.article.author}</Text>
                  </CardBody>
                  <CardFooter>
                    <Link
                      href={`/learning/${item.courseSlug}/${item.article.contentType}/${item.article.slug}`}>
                      <Button>View here</Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })
          : favouriteVideos.map((item, idx) => {
              return (
                <Card key={idx}>
                  <CardHeader>
                    <Flex justifyContent={'space-between'}>
                      <Heading size="md">{item.video.name}</Heading>
                      <Tag
                        size={'md'}
                        colorScheme="blue">
                        {item.video.contentType.toUpperCase()}
                      </Tag>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Text>Author: {item.video.author}</Text>
                  </CardBody>
                  <CardFooter>
                    <Link
                      href={`/learning/${item.courseSlug}/${item.video.contentType}/${item.video.slug}`}>
                      <Button>View here</Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
      </SimpleGrid>
    </>
  );
};

export default FavouritesPage;
