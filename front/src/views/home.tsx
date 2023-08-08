import { styled } from "styled-components";
import TickertSVG from "../assets/ticket.svg";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <HomeStyle>
      <TicketContainer>
        <Mask>
          <ExploreButton to="/activities">Explore Activities</ExploreButton>
        </Mask>
        <img src={TickertSVG} alt="" />
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
  img {
    width: 100%;
  }
`;

const Mask = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
