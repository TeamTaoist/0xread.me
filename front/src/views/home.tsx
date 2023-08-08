import { styled } from "styled-components";
import TickertSVG from "../assets/ticket.svg";
import { Link } from "react-router-dom";
import NFCIcon from "../assets/nfc.svg";
import DoorIcon from "../assets/door.svg";
import PassIcon from "../assets/pass.svg"

export default function HomePage() {
  return (
    <HomeStyle>
      <TicketContainer>
        <img src={TickertSVG} alt="" />
        <Background>
          <img src={NFCIcon} alt="" className="nfc" />
          <img src={DoorIcon} alt="" className="door" />
          <img src={PassIcon} alt="" className="pass" />
        </Background>
        <Mask>
          <div className="banner-text">
            Access Control Tool <br />Based on Zero-knowledge Proof
          </div>
          <ExploreButton to="/activities">Explore Activities</ExploreButton>
        </Mask>
      </TicketContainer>
    </HomeStyle>
  );
}
const HomeStyle = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  box-sizing: border-box;
  padding: 20px;
`;

const TicketContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  img {
    width: 100%;
  }
`;

const Mask = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
  .banner-text {
    color: #fff;
    font-size: 75px;
    font-weight: 700;
    
  }
`;

const ExploreButton = styled(Link)`
  display: inline-block;
  height: 56px;
  font-size: 26px;
  line-height: 56px;
  text-align: center;
  background: #f0c244;
  font-weight: 800;
  padding-inline: 26px;
  color: unset;
  border-radius: 8px;
  text-decoration: unset;
  cursor: pointer;
  position: relative;

  &:hover {
    top: -2px;
    left: 1px;
  }
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  img {
    position: absolute;
  }
  .nfc {
    width: 20%;
    left: -3%;
    top: -3%;
    transform: rotate(40deg);
    opacity: 0.2;
  }
  .door {
    top: -20%;
    right: 1%;
    width: 50%;
    transform: rotate(-130deg);
    opacity: 0.2;
  }
  .pass {
    left: -10px;
    width: 460px;
    top: 100px;
  }
`;