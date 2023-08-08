import { styled } from "styled-components";
import { joinGroup, getGroups } from "../http/api";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected as connector } from "../wallet/connector";
import QrcodeModal from "../components/qrcodeModal";

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

type GroupType = { id: number; name: string };

export default function ActivityPage() {
  const { account, provider } = useWeb3React();

  const [groups, setGroups] = useState<GroupType[]>([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");

  const join = async (g: GroupType) => {
    if (!account || !provider) {
      try {
        await connector.activate();
      } catch (error) {
        return;
      }
    }
    if (provider) {
      const signData = await provider.send("personal_sign", [
        `Join ${g.name}`,
        account,
      ]);
      setLoading(true);
      try {
        const res: any = await joinGroup(g.id, signData);
        console.log(res);
        const { proof } = res.data;
        setUrl(`https://0xread.me/api/proof/verify?proof=${proof}`);
        setShow(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const getGroupList = async () => {
      const res: any = await getGroups();
      setGroups(res.data);
    };
    getGroupList();
  }, []);
  return (
    <ActivityStyle>
      <CardBox style={loading ? { filter: "blur(2px)" } : {}}>
        {groups.map((g, i) => (
          <li key={i} style={{ background: randleBG() }}>
            <div>{g.name}</div>
            <span className="btn-join" onClick={() => join(g)}>
              Join
            </span>
          </li>
        ))}
      </CardBox>
      {loading && <Loading>waiting</Loading>}
      {show && <QrcodeModal handleClose={() => setShow(false)} url={url} />}
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

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

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
