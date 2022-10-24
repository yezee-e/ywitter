import React, { useState } from 'react';

const Home = () => {
  const [yweet, setYweet] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setYweet(value);
  };
  return (
    <div>
      <form>
        <input
          onChange={onChange}
          type='text'
          placeholder="what's on your mind?"
          value='Yweet'
          maxLength={120}
        />
        <input type='submit' value='Yweet' />
      </form>
    </div>
  );
};

export default Home;
