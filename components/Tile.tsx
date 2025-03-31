import { motion } from "framer-motion";

type TileProps = {
  value: number;
};

const Tile = ({ value }: TileProps) => {
  const getTileColor = (num: number) => {
    const colors: { [key: number]: string } = {
      2: "bg-yellow-200",
      4: "bg-yellow-300",
      8: "bg-yellow-400",
      16: "bg-orange-400",
      32: "bg-orange-500",
      64: "bg-red-500",
      128: "bg-green-400",
      256: "bg-green-500",
      512: "bg-blue-400",
      1024: "bg-blue-500",
      2048: "bg-purple-500",
    };
    return colors[num] || "bg-gray-700";
  };

  return (
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
  );
};

export default Tile;
