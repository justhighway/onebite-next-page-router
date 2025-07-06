import SearchableLayout from '@/components/SearchableLayout';
import { ReactNode } from 'react';
import BookItem from '@/components/BookItem';
import { InferGetStaticPropsType } from 'next';
import { getBooks, getRandomBooks } from '@/services/books';
import Head from 'next/head';

// 페이지 컴포넌트를 서버사이드에서 실행시키는 함수
// 컴포넌트보다 먼저 실행되어서 컴포넌트에 필요한 데이터를 불러오는 함수
// 페이지 컴포넌트에 props를 전달해줄 수 있음
// !! 서버 측에서만 실행됨 -> 클라이언트에만 있는 window 등 사용 시 오류 발생
export const getStaticProps = async () => {
  // Promise.all: 비동기 함수를 병렬로 실행시켜주는 메서드
  const [allBooks, randomBooks] = await Promise.all([
    getBooks(),
    getRandomBooks(),
  ]);
  return {
    props: {
      randomBooks,
      allBooks,
    },
    // revalidate: 초마다 컨텐츠 재생성
  };
};

// 페이지 컴포넌트도 클라이언트 이전에 서버에서 1번 실행됨
// 따라서 서버에서 알 수 없는 거(window 등) 쓰면 서버 에러 발생함
// 그래서 클라이언트 측에서만 작동하는 코드 작성은 useEffect 써야함

// InferGetServerSidePropsType:
// getServerSideProps의 반환 값 타입을 자동으로 추론해주는 타입
// 제네릭과 함께 사용해야 함

// 2025. 07. 06: ISR 적용
const Home = ({
  randomBooks,
  allBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
      <div className='flex flex-col gap-4'>
        <section className='mt-8'>
          <h3 className='font-bold text-3xl'>지금 추천하는 도서</h3>
          {randomBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3 className='font-bold text-3xl'>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
};

export default Home;

// page라는 이름의 매개변수로 페이지 컴포넌트를 받아서 반환
// _app.tsx에서 응용함
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
