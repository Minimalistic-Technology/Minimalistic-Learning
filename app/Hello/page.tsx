'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HelloPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/hello')
      .then((res) => {
        console.log("Backend Response:", res.data);  // Log full response
        setMessage(res.data.message || 'No message received');
      })
      .catch((err) => {
        console.error('Error fetching hello message:', err);
        setMessage(`Failed to fetch message: ${err.message}`);
      });
  }, []);

  return (
    <div>
      <h1>Message from Backend:</h1>
      <p>{message}</p>
    </div>
  );
}
