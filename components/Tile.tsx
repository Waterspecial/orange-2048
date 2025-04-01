import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type TileProps = {
  value: number;
};

const Tile = ({ value }: TileProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getTileColor = (num: number) => {
    const colors: { [key: number]: string } = {
      2: "bg-[#B5AC5D]",
      4: "bg-[#FFE020]",
      8: "bg-[#EAB900]",
      16: "bg-[#FF8905]",
      32: "bg-[#B64B01]",
      64: "bg-[#FA2C37]",
      128: "bg-[#06DF73]",
      256: "bg-[#0A8346]",
      512: "bg-[#50A2FF]",
      1024: "bg-[#0B60C1]",
      2048: "bg-[#AD47FF]",
    };
    return colors[num] || "bg-[#364153]";
  };

  return isMounted ? (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`h-16 w-16 md:w-[100px] md:h-[100px] flex items-center justify-center text-white font-bold text-2xl rounded-md ${getTileColor(
        value
      )}`}
    >
      {value !== 0 ? value : ""}
    </motion.div>
  ) : null; // Prevent hydration issues
};

export default Tile;
