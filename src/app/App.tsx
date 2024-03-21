import './styles/index.scss';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { BilliardBoard } from 'pages/BilliardBoard';

const App = () => {
  return (
    <>
      <Header />
      <main className='container'>
        <BilliardBoard />
      </main>
      <Footer />
    </>
  );
};

export default App;
