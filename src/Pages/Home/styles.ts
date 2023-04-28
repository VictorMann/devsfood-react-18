import styled from 'styled-components';

export const Container = styled.div`

.list-cat {
  display: flex;
}

.list-products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
`;