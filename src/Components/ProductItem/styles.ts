import styled from 'styled-components';

export const Container = styled.li`
position: relative;
transition: all ease .2s;

&:hover {
  transform: translate(-3px, -3px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, .8);
}
&::after {
  content: '';
  position: absolute;
  right: 3%;
  display: inline-block;
  width: .9rem;
  height: .9rem;
  background: url('/images/next.png') no-repeat center center;
  background-size: contain;
  opacity: .7;
}

color: var(--app-primary-color);
background: white;
overflow: hidden;
font-size: .95em;
align-items: center;
cursor: pointer;

figure {
  padding: 0;
  margin: 0;
  margin-right: .5em;
  width: 90px;
}
.figure-desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  direction: ltr;
}
.fig-name,
.fig-price,
.fig-ing {
  display: block;
}

.fig-name {
  font-weight: bold;
}

img {
  max-width: 100%;
  border-radius: 5px;
}
.fig-ing {
  font-size: .9em;
}
`;