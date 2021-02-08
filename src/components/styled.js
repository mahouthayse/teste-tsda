import styled from "styled-components";
import {Button} from "@material-ui/core";

const SectionTitle = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 1.75rem;
  font-weight: 700;
  color: #3E59B6;
  margin-bottom: 32px;
  @media all and (max-width: 480px)  {font-size: 1.25rem; text-align: center}
  @media(min-width: 1024px) and (max-width: 1280px) {font-size: 1.5rem }
`;


const SectionSubtitle = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 1rem;
  font-weight: 700;
  color: #404040;
  @media(max-width: 480px) { text-align: center}
`;

const ButtonPrimary = styled(Button)`
    height:45px;
    background: #61D2D6;
    border-radius: 10px;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    cursor:pointer;
    text-transform:none;
    
    &:hover{
    background: #4CC6CA;
    }
 
`;


export {SectionTitle, SectionSubtitle, ButtonPrimary};