import { FC, ReactNode, useEffect } from "react";
import "./Skeleton.scss";

interface SkeletonComponentProps {
  wrapperHeight: string;
  skeletonHeight: string;
  isLoading: boolean;
  children: ReactNode;
  isShowCardStyle?: boolean;
  width?: string;
  count?: number;
  animation?: boolean;
}

const SkeletonComponent: FC<SkeletonComponentProps> = ({
  wrapperHeight,
  skeletonHeight,
  isLoading,
  children,
  isShowCardStyle = false,
  width,
  count = 1,
  animation = true,
}: any) => {
  const classNames = `mb-2 skeleton rectangular ${animation ? "glow" : ""}`;

  const wrapperClass = `d-flex justify-content-center flex-column align-items-center w-100 ${
    isShowCardStyle ? "bg-card shadow-sm " : ""
  }`;

  const style = {
    width: width ? `${width}` : "100%",
    height: skeletonHeight ? `${skeletonHeight}` : "100%",
  };

  const numbersArray = Array.from({ length: count }, (_, index) => index + 1);

  return (
    <>
      {isLoading ? (
        <div style={{ height: wrapperHeight }} className={wrapperClass}>
          {numbersArray.map((value: any) => (
            <div className={classNames} style={style}></div>
          ))}
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default SkeletonComponent;
