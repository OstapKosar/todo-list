import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from '@/router';

const App = () => {
  return (
    <>
      <Router />
      <ToastContainer position="top-right" closeOnClick draggable theme="colored" />
    </>
  );
};

export default App;
