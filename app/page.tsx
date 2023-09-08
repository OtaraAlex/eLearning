"use client";

import React from "react";
import CourseGrid from "./components/CourseGrid/CourseGrid";
import useFetchCoursesData from "./hooks/useFetchCourseData";
import Hero from "./components/Hero/Hero";

export default function Home() {
  const courses = useFetchCoursesData();

  return (
    <>
      <Hero />
      <CourseGrid courseData={courses} />
    </>
  );
}