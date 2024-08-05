import { useEffect } from 'react';
import { SDKProvider, useMainButton } from '@telegram-apps/sdk-react';
import { mockTelegramEnv, parseInitData, initHapticFeedback } from '@telegram-apps/sdk';

const initDataRaw = new URLSearchParams([
  ['user', JSON.stringify({
    id: 99281932,
    first_name: 'Andrew',
    last_name: 'Rogue',
    username: 'rogue',
    language_code: 'en',
    is_premium: true,
    allows_write_to_pm: true,
  })],
  ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
  ['auth_date', '1716922846'],
  ['start_param', 'debug'],
  ['chat_type', 'sender'],
  ['chat_instance', '8428209589180549439'],
]).toString();

mockTelegramEnv({
  themeParams: {
    accentTextColor: '#6ab2f2',
    bgColor: '#17212b',
    buttonColor: '#5288c1',
    buttonTextColor: '#ffffff',
    destructiveTextColor: '#ec3942',
    headerBgColor: '#17212b',
    hintColor: '#708499',
    linkColor: '#6ab3f3',
    secondaryBgColor: '#232e3c',
    sectionBgColor: '#17212b',
    sectionHeaderTextColor: '#6ab3f3',
    subtitleTextColor: '#708499',
    textColor: '#f5f5f5',
  },
  initData: parseInitData(initDataRaw),
  initDataRaw,
  version: '7.2',
  platform: 'tdesktop',
});

const hapticFeedback = initHapticFeedback();

function App() {
  const mainButton = useMainButton();

  useEffect(() => {
    if (mainButton) {
      mainButton.setText('Click Me');
      mainButton.show();
      mainButton.on('click', () => {
        console.log('MainButton clicked');
        alert('MainButton clicked');
        hapticFeedback.impactOccurred('medium');  
      });

      console.log('MainButton properties:', mainButton);
      console.log('MainButton state:', mainButton.state);
    }
  }, [mainButton]);

  const handleButtonClick = () => {
    if (mainButton) {
      mainButton.setText('Click Me');
      mainButton.show();
      console.log('Initialize Telegram Button clicked');
      alert('Telegram Button initialized. Click the Telegram MainButton!');
      
      console.log('MainButton after initialization:', mainButton);
      console.log('MainButton state after initialization:', mainButton.state);
      
      setTimeout(() => {
        mainButton.emit('click');
      }, 1000);
    } else {
      console.log('MainButton is not initialized');
      alert('MainButton is not initialized');
    }
  };

  return (
    <SDKProvider acceptCustomStyles debug>
      <div className="App">
        <h1>Telegram Mini App</h1>
        <button onClick={handleButtonClick}>Initialize Telegram Button</button>
      </div>
    </SDKProvider>
  );
}

export default App;
