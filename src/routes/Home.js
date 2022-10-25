import { async } from '@firebase/util';
import { dbService } from 'fbase';
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [yweet, setYweet] = useState('');
  const [yweets, setYweets] = useState([]);
  //db데이터(트윗)을 받아오는함수
  const getYweets = async () => {
    const q = query(collection(dbService, 'yweets'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const yweetObj = {
        id: doc.id,
        ...doc.data(),
      };
      setYweet((prev) => [yweetObj, ...prev]);
    });
  };

  useEffect(() => {
    getYweets();
  }, []);
  //db에 데이터(트윗)을 저장하는 함수
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, 'yweets'), {
        yweet,
        createAt: Date.now(),
      });
      console.log('Document written with ID:', docRef);
    } catch (error) {
      console.log('error adding document:', error);
    }
    setYweet('');
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setYweet(value);
  };
  console.log(yweet);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type='text'
          placeholder="what's on your mind?"
          value={yweet}
          maxLength={120}
        />
        <input type='submit' value='Yweet' />
      </form>
    </div>
  );
};

export default Home;
