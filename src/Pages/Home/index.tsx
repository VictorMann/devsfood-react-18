import * as C from './styles';

import Search from '../../Components/HomeSearch';
import { useState } from 'react';

function Page() {
  const [search, setSearch] = useState<string>('');

  return (
    <C.Container>
      <Search search={search} setSearch={setSearch} />
    </C.Container>
  )
}

export default Page;