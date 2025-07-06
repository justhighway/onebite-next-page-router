import SearchableLayout from '@/components/SearchableLayout';
import { ReactNode } from 'react';

import BookItem from '@/components/BookItem';
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getSearchedBook } from '@/services/books';

// getServerSideProps가 내보내지면 SSR로 동작한다
// GetServerSidePropsContext: 브라우저로부터 받은 요청에 대한 모든 정보
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { q } = context.query;
  const searchedBooks = await getSearchedBook(q as string);

  return {
    props: {
      searchedBooks,
    },
  };
};

const SearchPage = ({
  searchedBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      {searchedBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

export default SearchPage;

SearchPage.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
