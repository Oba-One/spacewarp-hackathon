import { useContractReads } from "wagmi";

export const useLeague = () => {
  const squads: string | false =
    useContractReads({}).data?.reduce<string | false>((acc, cur) => {
      if (cur) {
        return "address";
      }

      return "acc";
    }, false) ?? false;

  const isMember: string | false =
    useContractReads({}).data?.reduce<string | false>((acc, cur) => {
      if (cur) {
        return "address";
      }

      return "acc";
    }, false) ?? false;

  // Potential for joining a legue and being put in a draft or having to meet some criteria
  async function join(squad: string) {
    const res = await fetch(`/squads/join`, {
      method: "POST",
    });
    return await res.json();
  }

  return { squads, isMember, join };
};
