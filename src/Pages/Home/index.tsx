import * as C from './styles';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setOpen, setProduct } from '../../Redux/Reducers/ProductModal';
import Search from '../../Components/HomeSearch';
import { api } from '../../Api';
import { CategoryType, ProductType } from '../../Types';
import CategoryItem from '../../Components/CategoryItem';
import ProductItem from '../../Components/ProductItem';

import { get } from '../../Helpers';
import { useAppSelector } from '../../Redux/hooks/useAppSelector';

let flagTimer: any = 0;

function Page() {
  const dispatch = useDispatch();
  const modal = useAppSelector(state => ({ before: state.ProductModal.stateBefore, after: state.ProductModal.stateAfter }));
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(get(searchParams.get('q')));
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    (async () => {
      const resp = await api.categories();
      if (resp.error) alert(resp.error);
      else setCategories(resp);
    })()
  }, []);

  useEffect(() => { searchData() }, [searchParams.get('cat'), searchParams.get('q')]);

  useEffect(() => {
    if (search === '' || search.length > 2) {
      clearTimeout(flagTimer);
      flagTimer = setTimeout(() => {
        if (!search) searchParams.delete('q');
        else searchParams.set('q', search);
        setSearchParams(searchParams);
      }, 1000);
    }
  }, [search]);

  async function searchData() {
    let cat = searchParams.get('cat') ? Number(searchParams.get('cat')) : '';
    const resp = await api.products({ cat, q: search });
    if (resp.error) { alert(resp.error); setProducts([]);}
    else setProducts(resp);
  }

  const handleClickProduct = (item: ProductType) => {
    dispatch( setProduct(item) );
    dispatch( setOpen(true) );
  };


  return (
    <C.Container>
      <Search search={search} setSearch={setSearch} />

      <div className='mt-5 text-white'>
        <p>Selecione uma categoria: Before: {modal.before ? 'SIM' : 'NAO'} After: {modal.after ? 'SIM' : 'NAO'}</p>
        <ul className='list-cat list-unstyled mb-2'>

          {categories.length > 0 &&
            <>
              <CategoryItem 
                item={{id: 0, name: 'Todos', image: ''}} 
                active={Number(searchParams.get('cat'))} />
                
              {categories.map(item => (
                <CategoryItem 
                  key={item.id} 
                  item={item} 
                  active={Number(searchParams.get('cat'))} />
              ))}
            </>
          }
        </ul>
      </div>

      <ul className='list-products list-unstyled'>
        {products.length > 0 &&
          products.map(item => (
            <ProductItem 
              key={item.id} 
              item={item}
              onClick={handleClickProduct} />
          ))
        }
      </ul>

    </C.Container>
  )
}

export default Page;