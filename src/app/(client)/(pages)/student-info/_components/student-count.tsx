"use client";

import { StudentCountData, SessionData } from "@/types/studentCounts";
import StudentCountTable from "@/components/student-count-table";

const StudentCountPage = ({ counts }: { counts: StudentCountData }) => {
  return (
    <div className="max-w-4xl mx-auto my-10">
      {counts ? (
        Object.entries(counts).map(([session, sessionData]) => (
          <StudentCountTable
            key={session}
            session={session}
            data={sessionData as SessionData}
          />
        ))
      ) : (
        <p>Loading student data...</p>
      )}
    </div>
  );
};

export default StudentCountPage;
