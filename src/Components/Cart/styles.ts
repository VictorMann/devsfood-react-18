import styled from 'styled-components';

type Props = {
  qtdItensCart?: number;
}

export const Container = styled.div<Props>`
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
  height: 0;
  transition: all ease-out .2s;
  overflow: hidden;

  .items-list {
    overflow: auto;
    max-height: 152px;

    li {
      display: flex;
      align-items: center;
      margin-bottom: 1px;
    }
  }
}

&.active .cart-body {
  height: ${props => { 
    if (!props.qtdItensCart) return '50vh';
    else if (props.qtdItensCart === 1) return '56vh';
    else if (props.qtdItensCart === 2) return '64vh';
    else return '72vh';
  }}
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

.area-entrega {
  font-size: .8em;

  h5 {
    font-size: 1.1em;
  }

  .area-entrega--body {
    display: flex;
    align-items: center;
    & > * {
      display: inline-block;
    }
  }

  .info-end {
    width: calc(100% - 1.2em);
    padding-right: 1.5em;
    span {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      direction: ltr;
    }
  }
  .edit-end {
    width: 1.2em;
    height: 1.2em;
    background: url('/images/edit.png') no-repeat center;
    background-size: contain;
  }
}

.discount-coupon {
  h5 {
    font-size: .9em;
    margin-top: 1em;
  }

  input {
    font-size: .85em;
    font-weight: bold;
    text-transform: uppercase;
  }
}

.area-amount {
  font-size: .9em;
}

.btn-order {
  color: white;
  border: none;
  display: block;
  background: var(--app-secondary-color);
  text-transform: uppercase;
  padding: .5em 0;
  border-radius: 50px;
  font-size: .9em;
}
`;