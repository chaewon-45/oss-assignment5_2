import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "https://6915287e84e8bd126af8d7a1.mockapi.io/students";

function DetailPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, [id]);

  if (!student) return <p>로딩중...</p>;

  return (
    <div>
      <h2>학생 상세</h2>
      <ul className="list-group">
        <li className="list-group-item">이름: {student.name}</li>
        <li className="list-group-item">나이: {student.age}</li>
        <li className="list-group-item">전공: {student.major}</li>
        <li className="list-group-item">학년: {student.grade}</li>
      </ul>

      <div className="mt-3">
        <button
          className="btn btn-secondary me-2"
          onClick={() => navigate("/list")}
        >
          목록
        </button>
        <button
          className="btn btn-warning"
          onClick={() => navigate(`/update/${id}`)}
        >
          수정하기
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
