"use client";

import Image from "next/image";

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  characterImage: string;
  characterName: string;
}

const CollectionModal = ({
  isOpen,
  onClose,
  characterImage,
  characterName,
}: CollectionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg text-center flex flex-col items-center shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          ✨ 새로운 캐릭터 발견! ✨
        </h2>
        <Image
          src={`/${characterImage}`}
          alt={characterName}
          width={150}
          height={150}
          className="mb-4 rounded-full border-4 border-yellow-400"
        />
        <p className="text-lg mb-6 text-gray-600">
          '{characterName}' 도감을 획득했어요!
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg transition-colors duration-300"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default CollectionModal;
