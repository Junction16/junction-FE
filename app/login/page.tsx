import Image from "next/image";
import KakaoButton from "../../components/KakaoButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
        {/* Logo/Brand Area */}
        <div className="text-center mb-16">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={100}
            className="mb-2 rounded-lg shadow-lg"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">링고클립</h1>
          <p className="text-gray-500 text-sm">당신의 학습 파트너</p>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            환영합니다
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            간편하게 로그인하고
            <br />
            새로운 학습 여정을 시작해보세요
          </p>
        </div>

        {/* Login Button */}
        <div className="w-full max-w-sm">
          <KakaoButton />
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8 text-xs text-gray-400">
          로그인 시 이용약관 및 개인정보처리방침에 동의한 것으로 간주됩니다
        </div>
      </div>
    </div>
  );
}
