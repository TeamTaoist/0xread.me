import { styled } from "styled-components";
import { createGroup } from "../http/api";
import { useState } from "react";

export default function ManagerPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const onClickCreate = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
        await createGroup(name);
        setName("");
    } catch(err) { 
        console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ManagerPageStyle>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <span onClick={onClickCreate}>{loading ? "Creating" : "Create"} </span>
    </ManagerPageStyle>
  );
}

const ManagerPageStyle = styled.div`
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  span {
    display: inline-block;
    padding-inline: 20px;
    line-height: 48px;
    background-color: #f0c244;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 20px;
  }
  input {
    height: 44px;
    line-height: 44px;
    padding-inline: 16px;
    border-radius: 6px;
    outline: none;
    &:focus-visible {
      outline: none;
    }
  }
`;
