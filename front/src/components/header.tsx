import styled from "styled-components";
import LogoIcon from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { injected as connector } from "../wallet/connector";

export default function Header() {
  const { account } = useWeb3React();

  const onClickConnect = async () => {
    try {
      await connector.activate();
    } catch (error) {
      console.error("connect failed", error);
    }
  };
  return (
    <HeaderStyle>
      <Link to="/">
        <img src={LogoIcon} alt="" />
      </Link>
      {account ? (
        <ConnectedBox>
          {account.slice(0, 4) + "..." + account.slice(-4)}
        </ConnectedBox>
      ) : (
        <ConnectButton onClick={onClickConnect}>Connect Wallet</ConnectButton>
      )}
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

const ConnectedBox = styled.span`
  padding-inline: 20px;
  border: 1px solid #f0c244;
  background-color: rgba(240, 194, 68, .2);
  font-size: 16px;
  height: 48px;
  line-height: 48px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
`;

const ConnectButton = styled.span`
  padding-inline: 20px;
  background-color: #f0c244;
  font-size: 16px;
  height: 48px;
  line-height: 48px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
`;
