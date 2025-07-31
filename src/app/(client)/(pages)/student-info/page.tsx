import StudentCountPage from "./_components/student-count";

const StudentInfoPage = async () => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/students/counts`
  );
  const data = await response.json();

  console.log(data);

  return (
    <div>
      <StudentCountPage counts={data} />
    </div>
  );
};

export default StudentInfoPage;
