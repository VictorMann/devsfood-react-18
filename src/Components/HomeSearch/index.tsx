import * as C from './styles';

type Props = {
  search?: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function Comp({ search, setSearch }: Props) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <C.Container className='rounded'>
      <img src="/images/logo.png" alt="" />
      <form onSubmit={e => e.preventDefault()}>
        <input
          className={search?.trim() ? 'active' : ''}
          type="search"
          value={search}
          onChange={handleChange}
          placeholder='Digite um produto' />
      </form>
    </C.Container>
  )
}

export default Comp;