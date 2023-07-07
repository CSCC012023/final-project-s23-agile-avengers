'use client';

import { Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import UnitCard from '@/components/UnitCard';
import UnitListItem from '@/components/UnitListItem';
import styles from '@/styles/pages/Course.module.scss';
import { CourseWithUnits } from '@/types/components/Dashboard-Learning/types';

type CourseProps = {
  params: {
    courseSlug?: string;
  };
};

export type Course = {
  name: string;
  units: [
    {
      name: string;
      slug: string;
      contents: [
        {
          name: string;
          slug: string;
          contentType: 'video' | 'article';
        },
      ];
    },
  ];
};

export default function CoursePage({ params }: CourseProps) {
  const { center, container, title, unitLists, unitsWrapper } = styles;

  const [course, setCourse] = useState<CourseWithUnits>();

  const getCourse = async () => {
    try {
      const url = `http://localhost:4000/units?courseSlug=${params?.courseSlug}`;
      const response = await fetch(url);
      const data: CourseWithUnits = await response.json();
      setCourse(data);
    } catch (error) {
      setCourse(undefined);
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    getCourse();
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
        <Text>Loading Course Information</Text>
      </div>
    );

  return (
    <div className={container}>
      <h1 className={title}>{course?.name}</h1>
      <div className={unitLists}>
        {course?.units.map(({ name, slug }, unitKey) => {
          return (
            <UnitListItem
              href={`/learning/${params?.courseSlug}/unit/${slug}`}
              key={unitKey}
              name={name}
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
