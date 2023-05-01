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

  .items-list {
    li {
      display: flex;
      align-items: center;
      margin-bottom: 1px;
    }
  }
}

&.active .cart-body {
  height: 60vh;
}

.c-area-img {
  width: 75%;

  figure {
    width: 38px;
    padding: 0;
    margin: 0;
    display: inline-block;
    vertical-align: 14px;

    & + div {
      display: inline-block;
      width: calc(100% - 38px);
      padding-left: .5em;

      span {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        direction: ltr;
      }
    }

    img {
      width: 100%;
      border-radius: 5px;
    }
  }
}

.c-area-config {
  width: 25%;
  display: flex;
  align-items: center;
  font-size: .9em;

  span {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    text-align: center;
  }

  .minus, .plus {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 40%;
    background-image: url('/images/minus.png');
    cursor: pointer;
  }
  .plus {
    background-image: url('/images/plus.png');
  }
}
`;