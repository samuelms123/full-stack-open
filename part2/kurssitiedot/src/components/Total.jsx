const Total = ({ parts }) => {
  if (!parts || parts.length === 0) return null;

  const total = parts.reduce((sum, part) => sum + (part.exercises || 0), 0);

  return (
    <>
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </>
  );
};

export default Total;
