import { AreaComponent } from "@/components/chart/area/records";
import { AttendanceComponent } from "@/components/chart/bar/attendance";
import { RiskComponent } from "@/components/chart/bar/risk";
import { RecordComponent } from "@/components/chart/line/records";
import { AttendancePieComponent } from "@/components/chart/pie/attendance";
import { RiskPieComponent } from "@/components/chart/pie/risk";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" space-y-10">
      
      <AreaComponent/>

      <AttendanceComponent/>
      <RiskComponent/>

      <RecordComponent/>

      <AttendancePieComponent/>
      <RiskPieComponent/>

    </div>
  );
}
