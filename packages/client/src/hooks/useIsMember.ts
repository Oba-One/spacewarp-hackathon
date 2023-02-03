import { useContractReads } from "wagmi";

export const useIsMember = () => {
  const isMember: string | false =
    useContractReads({}).data?.reduce<string | false>((acc, cur) => {
      if (cur) {
        return "address";
      }

      return "acc";
    }, false) ?? false;

  return isMember;
};
