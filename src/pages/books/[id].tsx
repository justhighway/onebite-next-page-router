import { getDetailedBook } from '@/services/books';

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

// SSG로 렌더링하게 하는 함수
export const getStaticProps = async (
  context: GetStaticPropsContext // SSG 전용 Context
) => {
  const id = context.params!.id;
  const detailedBook = await getDetailedBook(Number(id));

  // getStaticProps 내부에서 방어코드 적용 가능
  if (
    !id ||
    Array.isArray(id) ||
    isNaN(Number(id)) ||
    !detailedBook
  ) {
    // 위 조건들에 만족하면 notFound로 바로 처리
    return {
      notFound: true,
    };
  }

  return {
    props: {
      detailedBook,
    },
  };
};

export const getStaticPaths = () => {
  return {
    // paths: 미리 SSG로 만들어둘 동적 경로
    paths: [
      // id는 string으로 작성해야 함
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    // fallback: paths 외의 경로에 대해서 어떻게 처리할 지
    fallback: true,
    // false: 없으면 바로 404
    // 'blocking': 없는 경로에 대해서는 SSR 방식으로 렌더링
    // true: props가 undefined인 fallback 상태 페이지부터 반환 -> SSR 방식으로 렌더링
  };
};

const BookDetailPage = ({
  detailedBook,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  // router isFallback 상태값 사용하여
  // SSG fallback 컨트롤 가능 (fallback:true일 때 무조건 구현해야 함)
  if (router.isFallback) {
    return (
      <div className='text-center text-3xl p-10'>로딩 중...</div>
    );
  }
  const {
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = detailedBook;

  return (
    <div className='flex flex-col gap-8'>
      <div
        className='relative flex items-center justify-center p-8 bg-center bg-no-repeat bg-cover before:absolute before:inset-0 before:bg-black/80'
        style={{ backgroundImage: `url(${coverImgUrl})` }}
      >
        <img
          src={coverImgUrl}
          alt='커버 이미지'
          className='z-10 max-h-[35rem] h-full select-none'
        />
      </div>
      <div className='text-2xl'>
        <p className='text-3xl font-bold'>{title}</p>
        <p className='text-gray-600'>{subTitle}</p>
        <p className='text-gray-600'>
          {author} | {publisher}
        </p>
      </div>
      <div className='bg-gray-50 rounded-lg p-6 leading-5 whitespace-pre-line'>
        <p className='text-2xl'>{description}</p>
      </div>
    </div>
  );
};
export default BookDetailPage;
