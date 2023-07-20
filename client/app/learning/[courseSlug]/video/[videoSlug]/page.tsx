'use client';

import { useEffect, useState } from 'react';

import SidePaneItem from '@/components/ContentVideo/SidePaneItem';
import YoutubePlayer from '@/components/ContentVideo/YoutubePlayer';
import styles from '@/styles/pages/Video.module.scss';
import { Video } from '@/types/learning';
import {
  Accordion,
  AspectRatio,
  Container,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { Course } from '../../page';

type VideoProps = {
  params: {
    courseSlug: string;
    videoSlug: string;
  };
};

type CourseVideo = {
  video: Video;
};

export default function ContentPage({ params }: VideoProps) {
  const { container, title, unitLists } = styles;
  const { userId } = useAuth();
  const [courseVideo, setCourseVideo] = useState<CourseVideo>();
  const [course, setCourse] = useState<Course>();
  const [videoProgress, setVideoProgress] = useState(0);
  const fetchVideo = async () => {
    try {
      const urlCourse = `http://localhost:4000/units?courseSlug=${params.courseSlug}`;
      const responseCourse = await fetch(urlCourse);
      const dataCourse: Course = await responseCourse.json();
      const url = `http://localhost:4000/video?videoSlug=${params?.videoSlug}`;
      const response = await fetch(url);
      const data: CourseVideo = await response.json();
      const progressResponse = await fetch(
        `http://localhost:4000/progress/video?userID=${userId}&videoSlug=${params.videoSlug}`
      );
      const progressData = await progressResponse.json();
      setVideoProgress(progressData.progressPercent);
      setCourse(dataCourse);
      setCourseVideo(data);
    } catch (error) {
      setCourseVideo(undefined);
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  if (!userId || userId == null)
    return (
      <Spinner
        alignSelf="center"
        color="blue.500"
        emptyColor="gray.200"
        justifyContent="center"
        marginTop="240"
        size="xl"
        speed="0.65s"
        thickness="4px"
      />
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
      {courseVideo == undefined ? (
        <Spinner
          alignSelf="center"
          color="blue.500"
          emptyColor="gray.200"
          justifyContent="center"
          marginTop="240"
          size="xl"
          speed="0.65s"
          thickness="4px"
        />
      ) : (
        <Container
          maxW={'7xl'}
          p="12">
          <Heading as="h1">{courseVideo.video.name}</Heading>

          <AspectRatio
            ratio={16 / 9}
            w="100%">
            <YoutubePlayer
              progressPercent={videoProgress}
              userId={userId}
              videoId={courseVideo.video.videoId.toString()}
              videoSlug={params.videoSlug}
            />
          </AspectRatio>

          <VStack
            alignItems="flex-start"
            paddingTop="40px"
            spacing="2">
            <Text
              as="p"
              fontSize="lg">
              {courseVideo.video.description}
            </Text>
          </VStack>
        </Container>
      )}
    </div>
  );
}
