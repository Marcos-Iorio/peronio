import { ConnectKitButton } from "connectkit";
import styled from "@emotion/styled";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

import logoP from "/public/logoP.svg";

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
  @media (min-width: 1280px) {
    flex-direction: row;
  }

  @media (max-width: 1200px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;

const ConnectWallet = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <StyledDiv>
      <div className="flex flex-row justify-center items-center gap-3">
        <Image src={logoP} alt="Logo P" width={30} height={30} />
        <p className="w-full font-Roboto">1 PE = 1.62ARS</p>
      </div>

      {isMobile ? (
        <ConnectKitButton
          label="Conectar monedero"
          showBalance={false}
          showAvatar={false}
        />
      ) : (
        <ConnectKitButton
          label="Conectar monedero"
          showBalance={false}
          showAvatar={false}
        />
      )}
    </StyledDiv>
  );
};

export default ConnectWallet;
