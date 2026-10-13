import { courses } from "../dtu-source/courses.mjs";
import { buildCourse } from "./lib/build-course.mjs";
for (const course of courses) {
  if (course.source) await buildCourse(course.source, courses);
  else await import(new URL(`../${course.build}`, import.meta.url));
}
await import("./build-directory.mjs");
await import("./build-site.mjs");
