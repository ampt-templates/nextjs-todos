import useSWR from "swr";
import { api } from "../api";

export const useTodos = () => {
  const {
    data,
    error: _error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR<any>("/todos", (url: string) => api(url));

  return {
    data: data?.data || [],
    mutate,
    error: _error,
    isValidating,
    isLoading,
  };
};
