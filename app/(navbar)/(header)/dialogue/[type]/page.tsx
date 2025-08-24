"use client";
import {
  postVideo,
  randomQuiz,
} from "@/app/api/endpoints/s-3-controller/s-3-controller";
import { RandomQuizDTO } from "@/app/api/model";
import Header from "@/components/Header";
import Ring from "@/public/ring.svg";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DialogueTypePage() {
  const params = useParams();
  const [question, setQuestion] = useState<RandomQuizDTO | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [type, setType] = useState<"synonym" | "blank" | "fill">("fill");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const type = params.type;
    if (type === "synonym") {
      setType("synonym");
    } else if (type === "blank") {
      setType("blank");
    }
    const fetchQuestion = async () => {
      const response = await randomQuiz(
        {
          videoType: type?.toString().toUpperCase() as "SYNONYM" | "BLANK",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setQuestion(response.data);
    };
    fetchQuestion();
  }, []);

  if (videoReady) {
    return (
      <main className="w-screen max-w-[430px] bg-[#FAFAFA] flex flex-col justify-center gap-10 -mt-4">
        <div className="without-navbar-height bg-black">
          <video
            src={question?.videoUrl ?? ""}
            autoPlay
            loop
            playsInline
            controls={true}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full flex flex-col mb-4">
          <Ring stroke="var(--color-primary)" className="px-10 -mb-4 z-10" />
          <div className="max-w-[430px] bg-[#E3E4FF] p-4 py-16 rounded-lg mx-4">
            <div className="flex flex-col gap-4">
              {question?.chat?.split("\n").map((line, index) => {
                // Parse the line to determine if it's A or B
                const isA = line.startsWith("A:");
                const isB = line.startsWith("B:");

                if (!isA && !isB) return null; // Skip lines that don't start with A: or B:

                const text = line.substring(2).trim(); // Remove "A:" or "B:" prefix

                return (
                  <div
                    key={`line-${line}-${index}`}
                    className={`flex ${isA ? "justify-start" : "justify-end"} mb-2`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl relative ${
                        isA
                          ? "bg-white text-gray-800 text-left rounded-bl-md"
                          : "bg-[#D9D9D9] text-gray-800 text-right rounded-br-md"
                      }`}
                    >
                      <div className="text-sm leading-relaxed ">{text}</div>
                      {/* Speech bubble tail */}
                      <div
                        className={`absolute top-4 w-0 h-0 ${
                          isA
                            ? "-left-2 border-t-[8px] border-t-transparent border-r-[12px] border-r-white border-b-[8px] border-b-transparent"
                            : "-right-2 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#D9D9D9] border-b-[8px] border-b-transparent"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isCreating) {
    return (
      <div className="w-screen max-w-[430px] without-navbar-height -m-4 bg-[#FAFAFA] px-4 flex flex-col gap-4 justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        <div className="text-black text-2xl font-medium">숏폼 생성중...</div>
      </div>
    );
  }

  return (
    <main className="w-screen max-w-[430px] bg-[#FAFAFA] without-navbar-height flex flex-col px-4">
      <Header />

      {type === "synonym" ? (
        <>
          <div className="bg-white rounded-2xl p-4 w-full max-w-2xl text-center flex flex-col gap-4 mt-14">
            <p className="text-base text-gray-500 leading-relaxed">
              아래 문장에서 같은 의미로
              <br />
              쓰일 수 있는 단어를 선택해 주세요.
            </p>
            <p className="text-xl font-normal">
              {(() => {
                const sentence = question?.sentence || "";
                const compareWord = question?.compareWord || "";

                if (!compareWord) {
                  return sentence;
                }

                // Find the index of compareWord in the sentence (case insensitive)
                const lowerSentence = sentence.toLowerCase();
                const lowerCompareWord = compareWord.toLowerCase();
                const startIndex = lowerSentence.indexOf(lowerCompareWord);

                if (startIndex === -1) {
                  return sentence;
                }

                const beforeText = sentence.substring(0, startIndex);
                const highlightText = sentence.substring(
                  startIndex,
                  startIndex + compareWord.length
                );
                const afterText = sentence.substring(
                  startIndex + compareWord.length
                );

                return (
                  <>
                    {beforeText}
                    <span className="text-primary">{highlightText}</span>
                    {afterText}
                  </>
                );
              })()}
            </p>

            <Ring
              stroke="var(--color-primary)"
              className="relative px-10 -mb-7 z-10"
            />
            <div className="relative bg-[#E3E4FF] rounded-2xl p-6 h-[100px] flex flex-col justify-center items-center shadow-inner z-5">
              <div className="flex gap-1">
                {question?.compareWord?.split("").map((letter, index) => (
                  <div
                    key={`letter-${letter}-${index}`}
                    className="w-6 h-8 bg-white rounded-md flex justify-center items-center text-sm font-medium text-gray-800 shadow-md"
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : type === "blank" ? (
        <>
          <div className="bg-white rounded-2xl p-4 w-full max-w-2xl text-center flex flex-col gap-4 mt-14">
            <p className="text-base text-gray-500 leading-relaxed">
              아래 빈칸에 들어갈 단어는?
            </p>
            <p className="text-xl font-normal">
              {(() => {
                const sentence = question?.sentence || "";
                const compareWord = question?.compareWord || "";

                if (!compareWord) {
                  return sentence;
                }

                // Find the index of compareWord in the sentence (case insensitive)
                const lowerSentence = sentence.toLowerCase();
                const lowerCompareWord = compareWord.toLowerCase();
                const startIndex = lowerSentence.indexOf(lowerCompareWord);

                if (startIndex === -1) {
                  return sentence;
                }

                const beforeText = sentence.substring(0, startIndex);
                const highlightText = sentence.substring(
                  startIndex,
                  startIndex + compareWord.length
                );
                const afterText = sentence.substring(
                  startIndex + compareWord.length
                );

                return (
                  <>
                    {beforeText}
                    <span className="bg-[#E3E4FF] text-[#E3E4FF] select-none">
                      {highlightText}
                    </span>
                    {afterText}
                  </>
                );
              })()}
            </p>
            <p className="mt-2 text-xl text-primary">{question?.korea}</p>
            <Image
              src={"/karrot.png"}
              alt="blank"
              width={160}
              height={160}
              className="absolute -bottom-46 left-0 z-10 select-none pointer-events-none"
            />
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="flex flex-col gap-2 mt-34 z-20">
        {question?.choices?.map(({ dummyWord }, index) => (
          <button
            key={`option-${dummyWord}-${index}`}
            className={`w-full bg-white rounded-2xl py-5 px-6 text-xl font-medium transition-all duration-300 ease-in-out active:translate-y-1 shadow-md ${
              answers.includes(dummyWord ?? "") ? "border border-primary" : ""
            }`}
            disabled={isCorrect !== null}
            onClick={() => {
              if (answers.includes(dummyWord ?? "")) {
                return;
              } else {
                setAnswers([dummyWord ?? ""]);
              }
            }}
          >
            {dummyWord ?? ""}
          </button>
        ))}
      </div>
      <button
        className={`w-full text-white rounded-2xl py-4 px-6 text-base font-medium transition-all duration-300 ease-in-out active:translate-y-1 shadow-md my-4 ${
          isCorrect === null
            ? "bg-primary"
            : isCorrect
              ? "bg-green-500"
              : "bg-red-500"
        }`}
        onClick={async () => {
          if (isCorrect) {
            // When the button says "Create short-form"
            setIsCreating(true);
            const response = await postVideo(
              {
                videoId: question?.id ?? 0,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
              }
            );
            setTimeout(() => {
              setVideoReady(true);
              setIsCreating(false);
            }, 3000);
          } else {
            // When the button says "Check answer"
            if (answers[0] === question?.successWord) {
              setIsCorrect(true);
            } else {
              setIsCorrect(false);
            }
          }
        }}
      >
        {isCorrect === null
          ? "정답 확인하기"
          : isCorrect
            ? "정답입니다! 관련 AI 숏폼 만들기"
            : "틀렸습니다."}
      </button>
    </main>
  );
}
