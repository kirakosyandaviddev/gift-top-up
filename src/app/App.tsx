import {QueryClientProvider} from '@tanstack/react-query';

import {queryClient} from '../libs/queryClient';
import {Router} from './Router';

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </div>
  );
}

export default App;
