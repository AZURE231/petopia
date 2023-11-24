'use-client'
import { QueryClientProvider, QueryClient } from 'react-query'

export function QueryProvider(Children: () => JSX.Element) {
  const queryClient = new QueryClient()
  const result = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Children/>
      </QueryClientProvider>
    )
  }
  return result;
}