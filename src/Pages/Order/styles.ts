import styled from 'styled-components';

export const Container = styled.div`
.area-end {
  width: 400px;
  position: relative;

  .area-itens {
    font-size: .85em;

    & > * {
      
      &:nth-child(2) {
        padding-left: 1em;
        flex: 1;
      }
    }
  }
  img {
    width: 50px;
  }
}
`;