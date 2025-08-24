"use client";

import { vocaAI } from "@/app/api/endpoints/voca-controller/voca-controller";
import { VocaAIResDTO } from "@/app/api/model";
import CollectionModal from "@/components/CollectionModal";
import Header from "@/components/Header";
import { useEffect, useRef, useState } from "react";

export default function VocaCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const [voca, setVoca] = useState<VocaAIResDTO[]>([]);
  const [load, setLoad] = useState(false);
  const [category, setCategory] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCharacter, setNewCharacter] = useState<{
    image: string;
    name: string;
  } | null>(null);
  const [isFirst, setIsFirst] = useState(true);

  const touchStartX = useRef<number | null>(null);

  const characters = [
    { image: "Character_01.png", name: "와옹이" },
    { image: "Character_02.png", name: "캐릭터 2" },
    { image: "Character_03.png", name: "캐릭터 3" },
    { image: "Character_04.png", name: "캐릭터 4" },
    { image: "Character_05.png", name: "캐릭터 5" },
  ];

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setCategory(resolvedParams.category);
    };
    getParams();
  }, [params]);

  const fetchVoca = async () => {
    const response = await vocaAI(
      { vocaType: category },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setVoca((prev) => [...prev, ...response.data]);
    setLoad(true);
  };

  useEffect(() => {
    if (!category) return;
    fetchVoca();
  }, [category]);

  const handleNext = async () => {
    setIsFlipped(false);
    if (currentIndex < voca.length - 1) {
      setCurrentIndex(currentIndex + 1);
      console.log(
        currentIndex + 1,
        currentIndex + 1 == 1,
        currentIndex + 1 === 1
      );
      if (currentIndex + 1 === 1 && isFirst) {
        setNewCharacter(characters[0]);
        setIsModalOpen(true);
        setIsFirst(false);
      }
    } else {
      if ((currentIndex + 1) % 5 === 0 && isFirst) {
        const characterIndex = ((currentIndex + 1) / 5 - 1) % characters.length;
        setNewCharacter(characters[characterIndex]);
        setIsModalOpen(true);
      } else {
        setLoad(false);
        await fetchVoca();
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handleCloseModalAndFetch = async () => {
    setIsModalOpen(false);
    // setLoad(false);
    // await fetchVoca();
    // setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (deltaX > 50) {
      // Swipe Right
      handlePrev();
    } else if (deltaX < -50) {
      // Swipe Left
      handleNext();
    }
    touchStartX.current = null;
  };

  if (!load || voca.length === 0) {
    return (
      <div className="w-screen max-w-[430px] without-navbar-height -m-4 bg-[#FAFAFA] px-4 flex flex-col gap-4 justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        <div className="text-black text-2xl font-medium">Loading...</div>
      </div>
    );
  }

  const currentVoca = voca[currentIndex];

  return (
    <>
      {isModalOpen && newCharacter && (
        <CollectionModal
          isOpen={isModalOpen}
          onClose={handleCloseModalAndFetch}
          characterImage={newCharacter.image}
          characterName={newCharacter.name}
        />
      )}
      <style jsx>{`
        .flip-card {
          background-color: transparent;
          width: 100%;
          height: 60vh;
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .is-flipped {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 1.5rem;
          border: 1px solid #d7dcff;
          background-color: white;
          padding: 2.5rem;
          gap: 2.5rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
      <div
        className="w-screen max-w-[430px] without-navbar-height -m-4 bg-[#FAFAFA] px-4 flex flex-col gap-2"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Header title={`${currentIndex + 1} / ${voca.length}`} />

        <p className="text-center text-lg font-semibold"></p>
        <div className="flip-card" onClick={() => setIsFlipped(!isFlipped)}>
          <div className={`flip-card-inner ${isFlipped ? "is-flipped" : ""}`}>
            <div className="flip-card-front">
              <div className="rounded-xl p-2 flex flex-col items-center justify-center gap-2">
                <h2 className="text-4xl font-bold text-[#455CFB]">
                  {currentVoca.word}
                </h2>
                <p className="text-lg text-gray-500">
                  {currentVoca.pronunciation}
                </p>
              </div>
              <div className="w-full border-t border-dashed border-[#808080] items-center justify-center flex flex-col pt-4 text-center">
                {currentVoca.synonym?.split("\n").map((synonym, index) => (
                  <div key={index} className="whitespace-pre-line text-xl">
                    {synonym}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1 text-center">
                {currentVoca.exampleSentence &&
                  currentVoca.exampleSentence
                    .split("\n")
                    .map((sentence, index) => (
                      <div
                        key={index}
                        className="text-left text-secondary text-md"
                      >
                        {sentence}
                      </div>
                    ))}
              </div>
            </div>
            <div className="flip-card-back">
              <h3 className="text-3xl font-bold">{currentVoca.meaning}</h3>
            </div>
          </div>
        </div>
        <div className="flex justify-between -mt-1">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-lg disabled:opacity-50"
          >
            이전
          </button>
          <button onClick={handleNext} className="px-4 py-2 rounded-lg">
            다음
          </button>
        </div>
      </div>
    </>
  );
}
