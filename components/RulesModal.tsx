import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

type RulesModalProps = {
  closeModal: () => void;
};

const RulesModal = ({ closeModal }: RulesModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-md z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">🕹️ How to Play</h2>
          <button className="cursor-pointer" onClick={closeModal}>
            <AiOutlineClose size={24} color="red" />
          </button>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Move the tiles using <strong>Arrow Keys</strong> (⬆️ ⬇️ ⬅️ ➡️). When
          two tiles with the same number **merge**, they combine into one! Try
          to reach **2048** to win the game! 🎉
        </p>
        <div className="text-gray-600 text-[14px] mb-2">
          <span className="font-semibold">*Pro Tip*</span>
          <p>Plan your moves to prevent getting stuck!</p>
        </div>
      </motion.div>
    </div>
  );
};

export default RulesModal;
