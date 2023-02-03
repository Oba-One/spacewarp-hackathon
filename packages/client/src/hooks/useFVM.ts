import { useContractRead } from "wagmi";

const WaterSquad = import.meta.env.VITE_VERCEL_WATER_SQUAD ?? "";
const EarthSquad = import.meta.env.VITE_VERCEL_EARTH_SQUAD ?? "";
const FireSquad = import.meta.env.VITE_VERCEL_FIRE_SQUAD ?? "";
const AirSquad = import.meta.env.VITE_VERCEL_AIR_SQUAD ?? "";

export const useFVM = () => {
  const { data: waterBalance } = useContractRead({
    // abi: "erc20",
    address: WaterSquad,
    // method: "balanceOf",
  });
  const { data: earthBalance } = useContractRead({
    // abi: "erc20",
    address: EarthSquad,
    // method: "balanceOf",
  });
  const { data: fireBalance } = useContractRead({
    // abi: "erc20",
    address: FireSquad,
    // method: "balanceOf",
  });
  const { data: airBalance } = useContractRead({
    // abi: "erc20",
    address: AirSquad,
    // method: "balanceOf",
  });

  return {
    waterBalance,
    earthBalance,
    fireBalance,
    airBalance,
  };
};
