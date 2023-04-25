import styled from 'styled-components';

export const Container = styled.div`

.list-cat {
  display: flex;

  a {
    display: inline-block;
    width: 70px;
    height: 70px;
    font-size: 0;

    background-color: var(--app-border-cart);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

    margin-right: .5rem;
    overflow: hidden;
    border-radius: 5px;

    &.cat-all {
      font-size: 1rem;
      color: white;
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &.active {
      border: 2px solid var(--app-secondary-color);
    }

  }
}
`;