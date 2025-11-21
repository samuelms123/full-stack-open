const Total = ({ parts }) => {
  return (
    <>
      <p>
        Total exercises:
        {parts.reduce((sum, part) => sum + part.exercises, 0)}
      </p>
    </>
  );
};

export default Total;
