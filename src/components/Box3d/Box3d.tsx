import {
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState
} from "react";
import styled from "@emotion/styled";

interface I3dBoxProps {
  className?: string;
  perspective?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  rotateForce?: number;
  children?: ReactElement<any, any> | ReactElement<any, any>[];
}

const Container = styled.div`
  justify-content: center;
  width: 100%;
  flex-basis: 50%;
  @media (min-width: 360px) {
    display: none;
  }

  @media (min-width: 1024px) {
    display: none;
  }

  @media (min-width: 1280px) {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-basis: 50%;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Box3d = ({
  rotateForce = 10,
  className = "",
  perspective = "800px",
  minWidth = "300px",
  minHeight = "300px",
  children
}: I3dBoxProps) => {
  const [rotateXDeg, setRotateXDeg] = useState(0);
  const [rotateYDeg, setRotateYDeg] = useState(0);

  let docWidth: number, docHeight: number;

  useEffect(() => {
    docWidth = document.body.offsetWidth;
    docHeight = document.body.offsetHeight;
    document.body.addEventListener("mousemove", _moveBox.bind(this));
    return () => {
      document.body.removeEventListener("mousemove", _moveBox.bind(this));
    };
  }, []);

  const _moveBox = (e: any) => {
    // rotate range: -rotateForce ~ rotateForce
    setRotateXDeg(-(((e.pageY / docHeight) * 2 - 1) * rotateForce));
    setRotateYDeg(((e.pageX / docWidth) * 2 - 1) * rotateForce);
  };

  return (
    <Container
      className={`${className || ""}`}
      style={{
        perspective: perspective,
        minWidth: minWidth,
        minHeight: minHeight
      }}
    >
      <Box
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg)`
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default Box3d;
