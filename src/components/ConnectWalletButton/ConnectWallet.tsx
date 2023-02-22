import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import styled from "@emotion/styled";
import { useMediaQuery } from "react-responsive";

const StyledDiv = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  margin-left: auto;
`;

const ConnectWallet = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { address } = useAccount(); // address when connected
  return (
    <StyledDiv>
      <p className="w-full font-Roboto">1 PE = 1.62ARS</p>
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
