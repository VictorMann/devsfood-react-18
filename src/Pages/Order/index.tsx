import * as C from './styles';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../Redux/hooks/useAppSelector';
import { isLogged } from '../../Helpers/auth';
import { formatMoeda } from '../../Helpers';

import { api } from '../../Api';



function Page() {
  const [order, setOrder] = useState<any[]>([]);
  const endereco = useAppSelector(state => state.Endereco.data);
  
  useEffect(() => {
    (async () => {
      const resp = await api.orderAll();
      if (resp.error) {
        alert(resp.error);
        return;
      }

      let xResp: any[] = [];
      resp.forEach((item: any) => {
        let contem = xResp.findIndex(i => i.id === item.id);
        let {image, name, quantity} = item;
        let xItem = {image, name, quantity};

        if (contem  !== -1) xResp[contem].items.push(xItem);
        else {
          xResp.push({
            id: item.id,
            valor: item.valor,
            items: [ xItem ]
          });
        }
      });

      setOrder(xResp);

    })();
  }, []);


  return (
    <C.Container>
      {isLogged() &&
        <div>
          <h2>
            <span className='d-inline-block me-4'>Meus Pedidos</span> 
          </h2>

          {order.length > 0 &&
            order.map(item => (
              <div key={item.id} className="card area-end mb-3">
                <div className="card-body">
                  <div>Pedido: # {item.id}</div>
                  <div>Total: R$ {formatMoeda(item.valor)}</div>
                  {item.items.map((i:any,idx:any) =>
                    <div key={idx} className='area-itens d-flex justify-content-between'>
                      <span><img src={i.image} alt="" /></span>
                      <span>{i.name}</span>
                      <span>qtd: {i.quantity}</span>
                    </div>
                  )}
                  
                </div>
              </div>
            ))
          }
          
        </div>
      }
    </C.Container>
  )
}

export default Page;