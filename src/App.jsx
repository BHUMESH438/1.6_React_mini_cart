// components
import Navbar from './Navbar';
import CartContainer from './CartContainer';
import { useGlobalcontext } from './Context';

function App() {
  const { loading } = useGlobalcontext();
  if (loading) {
    return (
      <main>
        <div className='loading' style={{ marginTop: '10rem' }}>
          {' '}
        </div>
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
