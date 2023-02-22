import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import styled from "@emotion/styled";
import { useMediaQuery } from "react-responsive";

const StyledDiv = styled.div`
  cursor: pointer;
  position: relative;
  display: inline-block;
  margin-left: auto;
`;

const ConnectWallet = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { address } = useAccount(); // address when connected
  return (
    <StyledDiv>
      {isMobile ? (
        <ConnectKitButton
          label="Conectar monedero"
          showBalance={false}
          showAvatar={false}
        />
      ) : (
        <ConnectKitButton
          label="Conectar monedero"
          showBalance={true}
          showAvatar={false}
        />
      )}
    </StyledDiv>
  );
};

export default ConnectWallet;
