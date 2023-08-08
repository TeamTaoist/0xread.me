import styled from "styled-components";
import LogoIcon from "../assets/logo.svg";

export default function Header() {
  return (
    <HeaderStyle>
      <img src={LogoIcon} alt="" />
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px 1px rgba(71, 107, 249, 0.2);
  padding-inline: 60px;
  display: flex;
  justify-content: space-between;
  img {
    height: 70px;
  }
`;
