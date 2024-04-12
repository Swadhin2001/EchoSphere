import { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const QueryProvider = ({children}: {children: ReactNode}) => {
    const queryClient =new QueryClient();

  return (
    <QueryClientProvider client = {queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default QueryProvider