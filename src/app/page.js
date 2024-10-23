'use client';
import { useState } from 'react';
import { Input, DatePicker, Button, Form, Layout, Typography, message } from 'antd';
import moment from 'moment';
import styles from './page.module.css';
import ItineraryPage from './components/ItineraryPage';

const { RangePicker } = DatePicker;
const { Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const [city, setCity] = useState('');
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [itineraryFetched, setItineraryFetched] = useState(false);

  const handleSubmit = async () => {
    if (!city || dates.length !== 2) {
      message.error('Please enter a valid city and select travel dates!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city, dates }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch itinerary');
      }
      const itineraryResponse = await response.json();
      localStorage.setItem('itinerary', JSON.stringify(itineraryResponse));
      setItineraryFetched(true);
      message.success('Itinerary fetched successfully!');
      setError('')
    } catch (error) {
      setError('Error fetching itinerary. Please try again later.');
      message.error('Error fetching itinerary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className={styles.container}>
      <Content style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        {!itineraryFetched ? (
          <>
            <Title level={2}>Plan Your Trip</Title>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label={<span style={{ fontWeight: 600 }}>Enter City</span>} name="city" rules={[{ required: true, message: 'Please enter a city!' }]}>
                <Input placeholder="e.g., New York" value={city} onChange={(e) => setCity(e.target.value)} />
              </Form.Item>
              <Form.Item
                label={<span style={{ fontWeight: 600 }}>Select Travel Dates</span>}
                name="dates"
                rules={[{ required: true, message: 'Please select dates!' }]}
              >
                <RangePicker
                  style={{ width: '100%' }}
                  value={dates}
                  onChange={(dates) => setDates(dates)}
                  disabledDate={(current) => current && current < moment().endOf('day')}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                  Get Itinerary
                </Button>
              </Form.Item>
            </Form>

            {error && (
              <Typography.Paragraph type="danger" style={{ color: 'red', marginTop: '20px' }}>
                {error}
              </Typography.Paragraph>
            )}
          </>
        ) : (
          <ItineraryPage />
        )}
      </Content>
    </Layout>
  );
}
