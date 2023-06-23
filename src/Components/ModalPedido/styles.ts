import styled from "styled-components";

export const Container = styled.div`
.ctn-order {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  & div {
    border: 5px solid rgb(215,215,215);
    padding: 50% 0;
    background-color: #b4b4b4;
    cursor: pointer;
    transition: all ease .2s;

    background-image: url("/images/icon-pix.png");
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;


    &.order-icon-pix {
      background-image: url("/images/icon-pix.png");
    }

    &.order-icon-bol {
      background-image: url("/images/icon-boleto.png");
    }
    
    &.order-icon-credit {
      background-image: url("/images/icon-credit.png");
    }

    &:hover {
      border-color: #a1a1a1;
    }

    &.active {
      border-color: #84ff64;
    }

    
  }
}
.ctn-button {
  width: 100%;
  display: flex;
  justify-content: center;

  .btn-success {
    background: var(--app-primary-color);

    &:hover {
      background-color: #0c440b;
    }
  }
}
`;