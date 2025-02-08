// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page or your desired page
    router.push('/login');
  }, [router]);

  return null; // Optional: You can show a loading screen here
};

export default Home;
