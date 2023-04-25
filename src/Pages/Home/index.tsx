import * as C from './styles';
import { Link, useSearchParams } from 'react-router-dom';
import Search from '../../Components/HomeSearch';
import { useEffect, useState } from 'react';
import { api } from '../../Api';
import { CategoryType, ErrorType } from '../../Types';

function Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>('');
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    (async () => {
      const resp = await api.categories();
      if (resp.error) alert(resp.error);
      else setCategories(resp);
    })()
  }, []);

  return (
    <C.Container>
      <Search search={search} setSearch={setSearch} />

      <div className='mt-5 text-white'>
        <p>Selecione uma categoria: </p>
        <ul className='list-cat list-unstyled'>

          {categories.length > 0 &&
            <>
              <li>
                <Link 
                  to="/"
                  className={Number(searchParams.get('cat')) === 0 ? 'cat-all active' : 'cat-all'}>
                    Todos
                </Link>
              </li>
              {categories.map(item => (
              <li key={item.id}>
                <Link 
                  className={Number(searchParams.get('cat')) === item.id ? 'active' : ''}
                  to={`?cat=${item.id}`} 
                  style={{ backgroundImage: `url(${item.image})` }}>
                  
                    {item.name}

                </Link>
              </li>
              ))}
            </>
          }
        </ul>
      </div>

    </C.Container>
  )
}

export default Page;