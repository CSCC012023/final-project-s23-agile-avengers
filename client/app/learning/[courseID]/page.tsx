'use client';

import { useRouter } from 'next/navigation';

import courses from '../../api/data.json';

import styles from '@/styles/pages/Course.module.scss';
import UnitCard from '@/components/UnitCard';
import UnitListItem from '@/components/UnitListItem';

type CourseProps = {
  params: {
    courseID?: string;
  };
};

export default function CoursePage(props: CourseProps) {
  const router = useRouter();
  const course = courses.find((course) => course.id == props.params?.courseID);

  if (!course) router.push('/learning');

  const { container, title, unitLists, unitsWrapper } = styles;

  return (
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
  );
}
