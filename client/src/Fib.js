import React from 'react';
import axios from 'axios';

export default () => {
  const [seenIndexes, setSeenIndexes] = React.useState([]);
  const [values, setValues] = React.useState({});
  const [index, setIndex] = React.useState('');

  React.useEffect(() => {
    const fetchIndexes = async () => {
      const indexes = await axios.get('/api/values/all');
      setSeenIndexes(indexes.data);
    };

    const fetchValues = async () => {
      const values = await axios.get('/api/values/current');
      setValues(values.data);
    };

    fetchIndexes();
    fetchValues();
  }, [setSeenIndexes, setValues]);

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ');
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key}, I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    await axios.post('/api/values', {
      index,
    });

    setIndex('');
    console.log(seenIndexes, values);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={({ target }) => setIndex(target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  );
};
