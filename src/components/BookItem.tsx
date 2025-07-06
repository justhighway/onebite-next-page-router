import type { Book } from '@/types/books';
import Link from 'next/link';

const BookItem = ({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: Book) => {
  return (
    <Link
      href={`/books/${id}`}
      className='flex gap-6 py-8 px-4 border-b border-b-gray-200'
    >
      <img src={coverImgUrl} alt='책 커버 이미지' className='w-32' />
      <div className='flex flex-col justify-between text-2xl'>
        <div>
          <div className='font-bold'>{title}</div>
          <div className='break-keep'>{subTitle}</div>
        </div>
        <div className='text-gray-500'>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
};

export default BookItem;
