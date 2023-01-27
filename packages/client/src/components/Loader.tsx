import {} from "react";

interface LoaderProps {
  error?: string;
  reload: () => void;
}

export const Loader: React.FC<LoaderProps> = () => {
  return <div>Loading...</div>;
};
