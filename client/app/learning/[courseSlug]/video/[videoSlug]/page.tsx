'use client';
import {
  Accordion,
  AspectRatio,
  Container,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import SidePaneItem from '@/components/ContentVideo/SidePaneItem';
import YoutubePlayer from '@/components/ContentVideo/YoutubePlayer';

import styles from '@/styles/pages/Video.module.scss';

import { ErrorResponse } from '@/types/base';
import { CourseWithUnits } from '@/types/components/Dashboard-Learning/types';
import { Video } from '@/types/learning';

type VideoProps = {
  params: {
    courseSlug?: string;
    videoSlug?: string;
  };
};

export default function ContentPage({ params }: VideoProps) {
  const { center, container, title, unitLists } = styles;

  const [video, setVideo] = useState<Video>();
  const [course, setCourse] = useState<CourseWithUnits>();

  const getCourseWithUnits = async () => {
    try {
      const url = `http://localhost:4000/units?courseSlug=${params?.courseSlug}`;
      const response = await fetch(url);
      if (response.ok) {
        const data: CourseWithUnits = await response.json();
        setCourse(data);
      } else {
        const error: ErrorResponse = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getVideo = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/video?videoSlug=${params?.videoSlug}`,
      );
      if (response.ok) {
        const data: Video = await response.json();
        setVideo(data);
      } else {
        const error: ErrorResponse = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourseWithUnits();
    getVideo();
  }, [params]);

  if (!course && !video)
    return (
      <div className={center}>
        <Spinner
          color="blue.500"
          emptyColor="gray.200"
          size="xl"
          speed="0.65s"
          thickness="4px"
        />
        <Text>Loading Video</Text>
      </div>
    );

  return (
    <div className={container}>
      <h1 className={title}>{course?.name}</h1>
      <div className={unitLists}>
        <Accordion allowToggle>
          {course?.units.map(({ name, contents }, unitKey) => {
            return (
              <SidePaneItem
                contents={contents}
                courseSlug={params?.courseSlug as string}
                key={unitKey}
                name={name}
              />
            );
          })}
        </Accordion>
      </div>
      <Container
        maxW={'7xl'}
        p="12">
        <Heading as="h1">{video?.name}</Heading>
        <AspectRatio
          ratio={16 / 9}
          w="100%">
          <YoutubePlayer videoId={video?.videoId || ''} />
        </AspectRatio>

        <VStack
          alignItems="flex-start"
          paddingTop="40px"
          spacing="2">
          <Text
            as="p"
            fontSize="lg">
            {video?.description}
          </Text>
        </VStack>
      </Container>
    </div>
  );
}
