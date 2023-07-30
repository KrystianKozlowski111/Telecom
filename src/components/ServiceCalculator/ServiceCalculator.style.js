import styled from 'styled-components';
import { Media, Colors } from '../../assets/Variables.js';
export const Page = styled.div`
  display: block;
  width: 100%;
  background-color: ${Colors.dark};
  background-image: url('../images/background-icons.svg');
  background-position: center center;
  background-size: 300px;
  min-height: 100vh;
  color: ${Colors.white};
`;
export const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  max-width: 1280px;
  width: 100%;
  padding: 60px 20px;
  margin: 0 auto;
  text-align: center;
  ${Media.sm`
  padding: 30px 20px;
  `}
`;
export const HeadText = styled.h2`
  font-size: 42px;
  padding-bottom: 10px;
  font-weight: 600;
  letter-spacing: 4px;
  color: ${Colors.white};
  transition: all 0.2s linear;
`;
export const ErrorText = styled.p`
  font-size: 20px;
  padding-bottom: 10px;
  font-weight: 400;
  color: ${Colors.red};
  letter-spacing: 1px;
`;
export const HeadSmallText = styled.p`
  font-size: 30px;
  font-weight: 400;
  letter-spacing: 1px;
  padding-bottom: 20px;
`;
