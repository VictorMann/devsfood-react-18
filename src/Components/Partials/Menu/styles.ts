import styled from 'styled-components';

export const Container = styled.nav`
background-color: var(--app-primary-color);

a {
  display: inline-block;
  border-radius: 5px;
  margin: .5em;
  width: 50px;
  padding: .5em .6em .6em;
  transition: background-color ease-in .25s;

  &.active {
    background: var(--app-secondary-color);
  }
}

img {
  width: 100%;
}
`;