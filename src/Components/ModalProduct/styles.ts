import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-wrap: wrap;

.ctn-image {
  width: 170px;
  img {
    border-radius: 5px;
    width: 100%;

  }
}
.ctn-desc {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 1em;

  & > span {
    display: block;
  }

  .m-prod-ing {
    flex: 1;
  }

  .m-prod-title {
    color: var(--app-primary-color);
    font-weight: bold;
    font-size: 1.2em;
  }

  .m-prod-price {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .m-prod-price--config {
      display: flex;
      align-items: center;
      color: white;
      background: var(--app-primary-color);
      border-radius: 5px;
      font-size: 1.5em;
      overflow: hidden;

      & span {
        display: inline-block;
      }

      & span:first-child,
      & span:last-child {
        width: 1.2em;
        height: 1.2em;

        background-repeat: no-repeat;
        background-position: center;
        background-size: 15px;
        background-image: url('/images/minus.png');
        padding: .75em;
        cursor: pointer;

        &:hover {
          background-color: var(--app-third-color);
        }
      }

      & span:nth-child(2) {
        padding: 0 .5em;
        border: 1px dotted var(--app-third-color);
        border-top: none;
        border-bottom: none;
      }

      & span:last-child {
        background-image: url('/images/plus.png');
      }
    }

    & > span:last-child {
      font-weight: bold;
      font-size: 1.5em;
      color: var(--app-primary-color);
    }
  }
}

.ctn-button {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .btn-success {
    background: var(--app-primary-color);

    &:hover {
      background-color: #0c440b;
    }
  }
}
`;