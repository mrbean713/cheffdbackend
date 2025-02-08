import '../src/app/globals.css'; // Correct path to globals.css
import '../styles/styles.css';    // Import the styles.css


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
