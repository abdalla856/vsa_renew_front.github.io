import styled from "styled-components";

export const Box = styled.div`
  padding: 80px 20px;
  padding-bottom: 0px;
  background: #2d2f36;
  font-size: 1px;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 1000px) {
    padding: 70px 30px;
    padding-bottom: 0px;
    
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  // margin:  auto;
  margin-top: 3px;
  /* background: red; */
  
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
  
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: maroon;
    transition: 200ms ease-in;
  }
`;

export const Heading = styled.p`
  
  color: #fff;
  margin-bottom: 40px;
  margin-top: 30px;
  font-weight: bold;
  font-size: 18px;
  margin-bottom:25px
`;
