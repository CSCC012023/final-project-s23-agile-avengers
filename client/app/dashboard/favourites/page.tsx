"use client";
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Link, SimpleGrid, Tag, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';


const FavouritesPage = () => {

    const [favouriteArticles, setFavouriteArticles] = useState<any[]>([]);
    const [favouriteVideos, setFavouriteVideos] = useState<any[]>([]);

    const getFavouriteArticles = async () => {
        try {
          // update to better promise handling
          const response: Response = await fetch('http://localhost:4000/favouriteArticles');
          const jsonArticles: any[] = await response.json();
          console.log('JSON ARTICLES:', jsonArticles);
          setFavouriteArticles(jsonArticles);
        } catch (error) {
          console.error((error as Error).message);
        }
      };
    
      /* Without a dependency array the call to get all courses is only made once */
      useEffect(() => {
        getFavouriteArticles();
      }, []);

    return (
        <>
            <Heading>Favourites Page</Heading>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(350px, 1fr))'>
            {
                favouriteArticles.map((item, idx) => {
                    return (
                    <Card key={idx}>
                        <CardHeader>
                            <Flex justifyContent={'space-between'}>
                                <Heading size='md'>{item.article.name}</Heading>
                                <Tag size={'md'} colorScheme='teal'>{item.article.contentType.toUpperCase()}</Tag>
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <Text>View a summary of all your customers over the last month.</Text>
                        </CardBody>
                        <CardFooter>
                            <Link href={`/learning/${item.courseSlug}/${item.article.contentType}/${item.article.slug}`}>
                                <Button>View here</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                 ) })
            }
            </SimpleGrid>
        </>
    );
};

export default FavouritesPage;