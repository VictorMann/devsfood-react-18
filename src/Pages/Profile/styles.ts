import styled from 'styled-components';

export const Container = styled.div`
.area-end {
  width: 350px;
  position: relative;

  .icon-edit {
    display: flex;
    position: absolute;
    top: 5px;
    right: 5px;
    width: 2rem;
    height: 2rem;
    // border: 1px solid red;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      color: blue;
    }
  }
}
`;