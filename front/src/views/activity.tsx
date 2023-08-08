import { styled } from "styled-components";

function randomColor() {
  const r = randomInt(255);
  const g = randomInt(255);
  const b = randomInt(255);
  const c = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}000`;
  return c.slice(0, 7);
}

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function randleBG() {
  const deg = randomInt(360);
  return `linear-gradient(${deg}deg, ${randomColor()} 0%, ${randomColor()} 100%)`;
}
export default function ActivityPage() {
  const groups = [
    {
      id: 1,
      name: "Group 1",
    },
    {
      id: 2,
      name: "Group 1",
    },
  ];
  return (
    <ActivityStyle>
      <CardBox>
        {groups.map((g, i) => (
          <li key={i} style={{ background: randleBG() }}>
            <div>{g.name}</div>
            <span className="btn-join">Join</span>
          </li>
        ))}
      </CardBox>
    </ActivityStyle>
  );
}

const ActivityStyle = styled.div`
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
`;

const CardBox = styled.ul`
  display: flex;
  li {
    list-style: none;
    width: calc(100% / 4 - 20px);
    margin: 10px;
    border-radius: 6px;
    text-align: center;
    font-size: 26px;
    font-weight: 600;
    padding: 20px;
    box-sizing: border-box;

    .btn-join {
      display: inline-block;
      width: 120px;
      height: 48px;
      line-height: 48px;
      border-radius: 10px;
      border: 1px solid #fff;
      cursor: pointer;
      margin-top: 20px;
      font-size: 18px;
      background-color: rgba(255, 255, 255, 0.2);
      &:hover {
        transform: translate(1px, -2px);
      }
    }
  }
`;
