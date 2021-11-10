import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Container className="main-content">
        <Component {...pageProps} />
      </Container>
    </Layout>
  )
}

export default MyApp
