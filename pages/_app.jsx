import { Provider } from 'react-redux';
import { useStore } from '../redux/store'
import Game from '../components/Game';
import '../styles/index.css';
import Link from 'next/link'

export default function App({Component, pageProps}) {

  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}