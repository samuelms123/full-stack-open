import Part from './Part';

const Content = ({ parts }) => {
  if (!parts || parts.length === 0) return null;

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

export default Content;
