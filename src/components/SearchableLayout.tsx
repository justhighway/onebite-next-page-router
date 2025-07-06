import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

const SearchableLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const query = router.query.q as string;

  useEffect(() => {
    setValue(query || '');
  }, [query]);

  const handleChangeSearchValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!value) return;
    else if (query !== value) {
      router.push(`/search?q=${value}`);
    }
  };

  const handleEnterKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div>
      <div className='flex gap-2.5 text-2xl'>
        <input
          placeholder='검색어를 입력하세요...'
          value={value}
          onChange={handleChangeSearchValue}
          onKeyDown={handleEnterKeyDown}
          className='flex-1 p-4 rounded-lg border-gray-300 border'
        />
        <button
          type='submit'
          onClick={handleSubmit}
          className='w-32 rounded-lg border-none bg-blue-500 text-white cursor-pointer'
        >
          검색
        </button>
      </div>
      {children}
    </div>
  );
};

export default SearchableLayout;
