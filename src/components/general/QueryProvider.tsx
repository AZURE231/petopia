'use-client';
import { QueryClientProvider, QueryClient } from 'react-query';

export function QueryProvider<T extends {}>(Children: (props: T) => JSX.Element) {
  const queryClient = new QueryClient();
  const result = (props: T) => {
    return (
      <QueryClientProvider client={queryClient}>
        <Children {...props} />
      </QueryClientProvider>
    );
  };
  return result;
}