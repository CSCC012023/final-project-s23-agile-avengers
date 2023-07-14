'use client';

import UnitCard from '@/components/UnitCard';
import UnitListItem from '@/components/UnitListItem';
import styles from '@/styles/pages/Course.module.scss';
import { ErrorResponse } from '@/types/base';
import {
  CourseWithUnits,
  ProgressData,
} from '@/types/components/Dashboard-Learning/types';
import { Spinner, Text } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

type CourseProps = {
  params: {
    courseSlug?: string;
  };
};

const getIndexFromSlug = (
  slug: string,
  progressData: ProgressData[]
): number => {
  slug;
  return progressData.findIndex(({ unitID }) => unitID.slug === slug);
};

export default function CoursePage({ params }: CourseProps) {
  const { center, container, title, unitLists, unitsWrapper } = styles;

  const [course, setCourse] = useState<CourseWithUnits>();
  const [progress, setProgress] = useState<ProgressData[]>([]);

  const { userId } = useAuth();

  const getCourseWithUnits = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/units?courseSlug=${params?.courseSlug}`
      );
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

  const getProgress = async () => {
    try {
      const url = `http://localhost:4000/progress?userID=${userId}`;
      const response = await fetch(url);
      if (response.ok === false) {
        setProgress([]);
        return;
      }
      const data: ProgressData[] = await response.json();
      setProgress(data);
    } catch (error) {
      setProgress([]);
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    getCourseWithUnits();
    getProgress();
  }, [params]);

  if (!course)
    return (
      <div className={center}>
        <Spinner
          color="blue.500"
          emptyColor="gray.200"
          size="xl"
          speed="0.65s"
          thickness="4px"
        />
        <Text>Loading Course</Text>
      </div>
    );

  return (
    <div className={container}>
      <h1 className={title}>{course?.name}</h1>
      <div className={unitLists}>
        {course?.units.map(({ name, contents, slug }, unitKey) => {
          return (
            <UnitListItem
              doneValue={
                getIndexFromSlug(slug, progress) === -1
                  ? 0
                  : progress[getIndexFromSlug(slug, progress)].progress
              }
              href={`/learning/${params?.courseSlug}/unit/${slug}`}
              key={unitKey}
              name={name}
              totalValue={contents.length}
            />
          );
        })}
      </div>
      <div className={unitsWrapper}>
        {course?.units.map(({ name, contents }, unitKey) => {
          return (
            <UnitCard
              contents={contents}
              courseSlug={params?.courseSlug as string}
              key={unitKey}
              name={name}
            />
          );
        })}
      </div>
    </div>
  );
}
