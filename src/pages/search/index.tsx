import SearchableLayout from '@/components/SearchableLayout';
import { ReactNode } from 'react';

import BookItem from '@/components/BookItem';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getSearchedBook } from '@/services/books';
import Head from 'next/head';

// getServerSideProps가 내보내지면 SSR로 동작한다
// GetServerSidePropsContext: 브라우저로부터 받은 요청에 대한 모든 정보
export const getServerSideProps = async (
  context: GetServerSidePropsContext,
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
    <>
      <Head>
        <title>한입북스</title>
        <meta property='og:title' content='한입북스' />
        <meta
          property='og:description'
          content='한입 북스에 등록된 도서들을 만나보세요'
        />
      </Head>

      <div>
        {searchedBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
};

export default SearchPage;

SearchPage.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
