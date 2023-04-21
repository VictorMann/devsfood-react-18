import styled from 'styled-components';

export const Container = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background-color: var(--app-primary-color);
padding: 1rem;

img {
  width: 200px;
}

input {
  padding: .6rem .4rem;
  padding-left: 2.5rem;
  width: 0;
  background: white url('/images/search.png') no-repeat .7rem center;
  background-size: 1.5rem;
  border-radius: 100px;
  border: none;
  outline: none;
  transition: all ease-out .2s;
  cursor: pointer;

  &.active,
  &:focus {
    padding-left: 3rem;
    width: 300px;
    cursor: text;
  }
}
`;