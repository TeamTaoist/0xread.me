import { styled } from "styled-components";
import { QRCodeSVG } from "qrcode.react";

interface IProps {
    handleClose: () => void;
    url: string;
}

export default function QrcodeModal({ handleClose, url }: IProps) {
  return (
    <QrcodeModalStyle>
      <div className="qrcode">
        <QRCodeSVG width={400} height={400} value={url} />
      </div>
      <button onClick={handleClose}>Close</button>
    </QrcodeModalStyle>
  );
}

const QrcodeModalStyle = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  .qrcode {
    width: 400px;
    height: 400px;
  }
  button {
    color: #fff;
  }
`;

