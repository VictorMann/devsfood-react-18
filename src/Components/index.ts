import styled from 'styled-components';

export const Template = styled.div`
display: flex;
height: 100vh;

.nav-main {
  
}
.page-body {
  flex: 1;
  background: url('/images/bg.png') repeat 0 0;
  background-size: 9em;
}
`;

export const PageBody = styled.div.attrs({ className: 'page-body' })`
padding: 1rem;
`;