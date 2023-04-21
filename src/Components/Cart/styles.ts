import styled from 'styled-components';

export const Container = styled.div`
position: fixed;
right: 25px;
bottom: 0;
width: 250px;
background-color: var(--app-primary-color);
color: var(--app-primary-text-color);
font-size: .9rem;
border: 1px solid var(--app-border-cart);

.cart-header {
  padding: .2rem;
  padding-left: .8em;
  cursor: pointer;
  border-bottom: 1px solid var(--app-border-cart);
  background-repeat: no-repeat;
  background-position: 96% center;
  background-size: 10px;

  span {
    display: inline-block;
    margin-right: .5em;
  }
  img {
    width: 20px;
  }
}

&.active .cart-header {
  background-image: url('/images/down.png');
}

.cart-body {
  height: 0px;
  transition: all ease-out .2s;
  overflow: auto;
}

&.active .cart-body {
  height: 60vh;
}
`;