import { useContractRead } from "wagmi";

const WaterDAO = import.meta.env.VITE_VERCEL_WATER_DAO ?? "";
const EarthDAO = import.meta.env.VITE_VERCEL_WATER_DAO ?? "";
const FireDAO = import.meta.env.VITE_VERCEL_WATER_DAO ?? "";
const AirDAO = import.meta.env.VITE_VERCEL_WATER_DAO ?? "";

export const useFVM = () => {
  const { data: waterBalance } = useContractRead({
    // abi: "erc20",
    address: WaterDAO,
    // method: "balanceOf",
  });
  const { data: earthBalance } = useContractRead({
    // abi: "erc20",
    address: EarthDAO,
    // method: "balanceOf",
  });
  const { data: fireBalance } = useContractRead({
    // abi: "erc20",
    address: FireDAO,
    // method: "balanceOf",
  });
  const { data: airBalance } = useContractRead({
    // abi: "erc20",
    address: AirDAO,
    // method: "balanceOf",
  });

  return {
    waterBalance,
    earthBalance,
    fireBalance,
    airBalance,
  };
};
