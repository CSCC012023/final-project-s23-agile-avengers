'use client';
import { Card, Divider } from '@chakra-ui/react';
import styles from '../../styles/components/sidebar.module.scss';
import { Course } from '@/types/learning';
import DisplayCourses from './DisplayCourses';

type SideBarProps = {
  exploreCourses: Course[];
  userCourses: Course[];
  selectedCourse: Course | undefined;
  setSelectedCourse: React.Dispatch<React.SetStateAction<Course | undefined>>;
};

const Sidebar = ({
  exploreCourses,
  userCourses,
  selectedCourse,
  setSelectedCourse,
}: SideBarProps) => {
  return (
    <Card bg="brand.gray">
      {userCourses.length > 0 && (
        <>
          <DisplayCourses
            courses={userCourses}
            headerString={'My Courses'}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
          />
          <Divider
            className={styles.divider}
            width="88%"
          />
        </>
      )}

      <DisplayCourses
        courses={exploreCourses}
        headerString={'Explore'}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
      />
    </Card>
  );
};
export default Sidebar;
