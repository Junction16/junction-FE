"use client";

import { vocaSelect } from "@/app/api/endpoints/voca-controller/voca-controller";
import { VocaResDTO } from "@/app/api/model";
import Header from "@/components/Header";
import { useEffect, useRef, useState } from "react";

export default function MyVocaHistoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const [voca, setVoca] = useState<VocaResDTO[]>([]);
  const [load, setLoad] = useState(false);
  const [category, setCategory] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setCategory(resolvedParams.category);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!category) return;

    const fetchVoca = async () => {
      setLoad(false);
      try {
        const response = await vocaSelect(
          { vocaType: category },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (response.data.vocaResList) {
          setVoca(response.data.vocaResList as VocaResDTO[]);
        }
      } catch (error) {
        console.error("Failed to fetch vocabulary history:", error);
      }
      setLoad(true);
    };

    fetchVoca();
  }, [category]);

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < voca.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
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
      handlePrev();
    } else if (deltaX < -50) {
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
        className="w-screen max-w-[430px] without-navbar-height -m-4 bg-gray-100 px-4 flex flex-col gap-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Header title={`${category}: ${currentIndex + 1} / ${voca.length}`} />

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
            className="px-4 py-2 bg-white rounded-lg shadow disabled:opacity-50"
          >
            이전
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === voca.length - 1}
            className="px-4 py-2 bg-white rounded-lg shadow disabled:opacity-50"
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}
