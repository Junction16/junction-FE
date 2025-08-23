import AttendanceCard from "@/components/AttendanceCard";
import ClipCard from "@/components/ClipCard";
import Profile from "@/components/Profile";
import StatsSelector from "@/components/StatsSelector";
import VocaCard from "@/components/VocaCard";

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<{ stat: string }>;
}) {
  const selectedStat = (await searchParams).stat || "vocabulary";

  return (
    <main className="w-full flex flex-col gap-8">
      {/* Profile Section */}
      <Profile />

      <StatsSelector selectedStat={selectedStat} />

      <div className="flex flex-col gap-4">
        {selectedStat === "vocabulary" && (
          <div className="grid grid-cols-2 gap-4">
            <VocaCard />
          </div>
        )}

        {selectedStat === "collection" && <ClipCard />}

        {selectedStat === "attendance" && (
          <div className="grid grid-cols-3 gap-4">
            <AttendanceCard image="Character_01.png" />
            <AttendanceCard image="Character_02.png" />
            <AttendanceCard image="Character_03.png" />
            <AttendanceCard image="Character_04.png" />
            <AttendanceCard image="Character_05.png" />
            <AttendanceCard />
            <AttendanceCard />
            <AttendanceCard />
            <AttendanceCard />
            <AttendanceCard />
            <AttendanceCard />
            <AttendanceCard />
            <AttendanceCard />
            <AttendanceCard />
            <AttendanceCard />
          </div>
        )}
      </div>

      {/* 로그아웃 */}
      {/* <CustomButton
        active="logout"
        name="로그아웃"
        className="text-secondary w-full h-12 rounded-lg !bg-primary/70 text-white shadow-lg "
      /> */}
    </main>
  );
}
