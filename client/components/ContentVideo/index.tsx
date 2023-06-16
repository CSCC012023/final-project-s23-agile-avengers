'use client';

import React, { useEffect, useState } from 'react';

import { Course, Video } from '@/types/learning';

import {
  Box,
  Heading,
  Text,
  Container,
  VStack,
  Spinner,
} from '@chakra-ui/react';

import YouTubePlayer from './YoutubePlayer';

const ContentVideo = () => {
  const [videos, setVideos] = useState<Video>();

  const fetchVideo = async () => {
    try {
      const response = await fetch('http://localhost:4000/video?videoSlug=${params?.videoSlug}');
      const jsonData = await response.json();
      setVideos(jsonData[0]);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <div>
      {videos == undefined ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          marginTop="240"
          justifyContent="center"
          alignSelf="center"
        />
      ) : (
        <Container
          maxW={'7xl'}
          p="12">
          <Heading as="h1">{videos.name}</Heading>

          <Box mt="5">
            <YouTubePlayer videoId={videos.videoId.toString()} />
          </Box>

          <VStack
            paddingTop="40px"
            spacing="2"
            alignItems="flex-start">
            <Text
              as="p"
              fontSize="lg">
              {videos.description}
            </Text>
          </VStack>
        </Container>
      )}
    </div>
  );
};

export default ContentVideo;
