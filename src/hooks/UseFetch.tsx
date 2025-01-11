import { useState } from 'react';

const DEFAULT_FETCH_OPTIONS = {};

type UseFetchProps = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
};

type Fetch = {
  body?: { [index: string]: any };
  fetchOptions?: RequestInit;
};

export function useFetch<T>({ url, method }: UseFetchProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const handleFetch = async ({ body, fetchOptions = {} }: Fetch) => {
    setIsLoading(true);

    const response = await fetch(url, {
      method,
      ...DEFAULT_FETCH_OPTIONS,
      ...fetchOptions,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    setIsLoading(false);
    setData(data);
  };

  return { isLoading, fetch: handleFetch, data };
}
