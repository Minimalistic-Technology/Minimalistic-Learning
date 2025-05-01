import React from "react";
import Course from "../../components/Course";
import Contactus from '../../components/Contactus';
import SearchBarCourse from "../../components/SearchBarCourse";

const CoursesPage = () => {
  return (
    <div className="bg-blue-200">
      <SearchBarCourse/>
      <Course/>
      <Contactus/>
    </div>
  );
};
export default CoursesPage;