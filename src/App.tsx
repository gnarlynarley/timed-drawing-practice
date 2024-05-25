import React from 'react';
import useFormValue from './lib/hooks/useFormValue';
import ConfigurationPage from './lib/views/ConfigurationPage';
import PracticePage from './lib/views/PracticePage';

function App() {
  const [page, setPage] = React.useState<'practice' | 'configuration'>(
    'practice'
  );
  const duration = useFormValue(3);
  const amount = useFormValue(3);

  if (page === 'practice') {
    return (
      <PracticePage
        duration={duration.value}
        amount={amount.value}
        onCloseClick={() => setPage('configuration')}
      />
    );
  }
  return (
    <ConfigurationPage
      duration={duration}
      amount={amount}
      onStartClick={() => setPage('practice')}
    />
  );
}

export default App;
