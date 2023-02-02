import React from "react";

import styles from "./Loader.module.css";

interface LoaderProps {
  error?: string;
  reload?: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ error }) => {
  return (
    <div className="flex h-screen w-screen justify-center items-center bg-amber-700 z-10">
      {error ? (
        <div className="">
          💔
          <p className="">{error}</p>
        </div>
      ) : (
        <div className={styles.ldsRing}>
          <div />
          <div />
          <div />
          <div />
        </div>
      )}
    </div>
  );
};
