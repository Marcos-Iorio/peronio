import type { NextPage } from "next";
import styled from "@emotion/styled";

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 5rem;
  min-height: 100vh !important;
  width: 100%;
  background-image: url("/isologo 1.svg");
  background-size: contain !important;
  background-repeat: no-repeat;
  background-position: center center;
  padding-bottom: 100px;
  @media (min-width: 1280px) {
    min-height: 100vh;
  }
  @media (min-width: 320px) {
    background-size: cover;
    overflow-y: auto;
    min-height: 100%;
  }
`;

const Migrar: NextPage = () => {
  return (
    <StyledMain>
      <div className=" flex laptop:flex-row 2xl:flex-row md:flex-row gap-10 mobile:flex-col 2xl:h-full laptop:h-full xl:h-full w-full justify-center items-center">
        <div>asd</div>
        <div>asda</div>
      </div>
    </StyledMain>
  );
};

export default Migrar;
