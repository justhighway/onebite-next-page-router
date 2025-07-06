import { apiClient } from '@/libs/apiClient';
import { Book } from '@/types/books';

export const getBooks = async (): Promise<Book[]> => {
  return apiClient.get('book').json();
};

export const getRandomBooks = async (): Promise<Book[]> => {
  return apiClient.get('book/random').json();
};

export const getSearchedBook = async (
  query?: string
): Promise<Book[]> => {
  return apiClient
    .get('book/search', {
      searchParams: query ? { q: query } : undefined,
    })
    .json();
};

export const getDetailedBook = async (
  bookId: number
): Promise<Book> => {
  return apiClient.get(`book/${bookId}`).json();
};
