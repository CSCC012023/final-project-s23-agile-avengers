'use client';

import courses from '../../api/data.json';
import { useRouter } from 'next/navigation';
import { Text, Spinner } from '@chakra-ui/react';

import UnitCard from '@/components/UnitCard';
import UnitListItem from '@/components/UnitListItem';

import { CourseProps } from '@/types/learning';
import styles from '@/styles/pages/Course.module.scss';

export default function CoursePage({ params }: CourseProps) {
  const { center, container, title, unitLists, unitsWrapper } = styles;

  const router = useRouter();
  const course = courses.find((course) => course.id == params?.courseID);

  if (!course) {
    router.push('/learning');
    return (
      <div className={center}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text>Loading Course Information</Text>
      </div>
    );
  } else {
    return (
      <>
        <div className={container}>
          <h1 className={title}>{course?.title}</h1>
          <div className={unitLists}>
            {course?.units.map(({ title }, unitKey) => {
              return (
                <UnitListItem
                  key={unitKey}
                  title={title}></UnitListItem>
              );
            })}
          </div>
          <div className={unitsWrapper}>
            {course?.units.map(({ title, contents }, unitKey) => {
              return (
                <UnitCard
                  key={unitKey}
                  title={title}
                  contents={contents}></UnitCard>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
