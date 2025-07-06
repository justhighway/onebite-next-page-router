import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-white text-gray-800'>
      <h1 className='text-5xl font-bold mb-4'>404</h1>
      <p className='text-xl mb-6'>페이지를 찾을 수 없습니다.</p>
      <Link href='/' className='text-blue-500 underline'>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
