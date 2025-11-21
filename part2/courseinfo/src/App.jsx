import Course from './components/Course.jsx';
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      courseId: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          partId: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          partId: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          partId: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          partId: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      courseId: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          partId: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          partId: 2,
        },
      ],
    },
  ];

  return (
    <div>
      {courses.map((course) => (
        <Course key={course.courseId} course={course} />
      ))}
    </div>
  );
};

export default App;
