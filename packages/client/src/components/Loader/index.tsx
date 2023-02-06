import React from "react";

import styles from "./Loader.module.css";

interface LoaderProps {
  error?: string;
  reload?: () => void;
  precents?: number;
}

export const Loader: React.FC<LoaderProps> = ({ error }) => {
  return (
    <div className="z-10 flex h-screen w-screen items-center justify-center bg-amber-700">
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
