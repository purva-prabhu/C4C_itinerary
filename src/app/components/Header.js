'use client';

import { Layout, Typography, Button } from 'antd';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

const { Header } = Layout;
const { Title, Text } = Typography;

const AppHeader = () => {
  const router = useRouter();
  return (
    <Header className={styles.header}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <Title className={styles.title}>
            Itinerary Generator
          </Title>
          <Text className={styles.description}>
            Discover new destinations and plan your perfect getaway!
          </Text>
          <Button
            type="primary"
            onClick={() => router.push('/about')}
            className={styles.learnMoreButton}>
            Start Planning
          </Button>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
