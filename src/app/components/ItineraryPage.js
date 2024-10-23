import React, { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import ReactMarkdown from 'react-markdown';
import styles from './itinerary.module.css';

const { Paragraph } = Typography;

export default function Itinerary() {
  const [displayText, setDisplayText] = useState('');
  const itinerary = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('itinerary')) : '';

  useEffect(() => {
    if (itinerary) {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayText(itinerary.slice(0, index));
        index++;
        if (index > itinerary.length) {
          clearInterval(interval);
        }
      }, 2); //typewritter

      return () => clearInterval(interval);
    }
  }, [itinerary]);

  return (
    <div className={styles.container}>
      <Card title="" bordered={false} className={styles.card}>
        <Paragraph className={styles.markdown}>
          <ReactMarkdown>{displayText}</ReactMarkdown>
        </Paragraph>
      </Card>
    </div>
  );
}
