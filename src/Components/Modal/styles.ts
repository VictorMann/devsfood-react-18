import styled from "styled-components";

export const Container = styled.div`
position: absolute;
top: 0;
left: 0;
bottom: 0;
right: 0;
background: rgba(0, 0, 0, .4);
display: flex;
justify-content: center;
align-items: center;
z-index: 999;

.modal-body {
  background: white;
  max-height: 90vh;
  max-width: 42vw;
  padding: 1em;
  border-radius: 5px;

  margin-top: -100px;
  opacity: 0;
  transition: all ease .3s;

  &.active {
    margin-top: 0;
    opacity: 1;
  }
}
`;