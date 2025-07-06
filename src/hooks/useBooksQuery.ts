import { getBooks } from '@/services/books';
import { Book } from '@/types/books';
import { useQuery } from '@tanstack/react-query';

export const useBooksQuery = () => {
  const { data, isPending, error } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: getBooks,
  });

  return { data, isPending, error };
};
