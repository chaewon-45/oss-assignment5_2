import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "https://6915287e84e8bd126af8d7a1.mockapi.io/students";

function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);   // useState: 값 관리
  const [editCount, setEditCount] = useState(0);  // useState: 수정 횟수

  // useRef: 유효성 검사에서 포커스 이동 & 로드 시간 저장
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const majorRef = useRef(null);
  const gradeRef = useRef(null);
  const loadedTimeRef = useRef("");

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        loadedTimeRef.current = new Date().toLocaleString();
      });
  }, [id]);

  const validate = (name, value) => {
    if (name === "age" && value && isNaN(Number(value))) {
      alert("나이는 숫자로 입력하세요.");
      ageRef.current.focus();
      return false;
    }
    if (!value.trim()) {
      // 빈 값이면 경고만, 어디까지 할지는 자유
      alert(`${name} 값이 비어 있습니다.`);
      const map = { name: nameRef, major: majorRef, grade: gradeRef };
      (map[name] || nameRef).current.focus();
      return false;
    }
    return true;
  };

  // ✨ input 값이 바뀔 때마다 바로 PUT 호출
  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (!student) return;

    if (!validate(name, value)) return;

    const updated = { ...student, [name]: value };
    setStudent(updated);
    setEditCount((c) => c + 1); // 수정 횟수 증가

    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  };

  if (!student) return <p>로딩중...</p>;

  return (
    <div>
      <h2>학생 정보 수정</h2>
      <p className="text-muted">
        페이지 로딩 시각: {loadedTimeRef.current} / 수정 횟수: {editCount} 회
      </p>

      <div className="mb-2">
        <label className="form-label">이름</label>
        <input
          ref={nameRef}
          className="form-control"
          name="name"
          value={student.name || ""}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">나이</label>
        <input
          ref={ageRef}
          className="form-control"
          name="age"
          value={student.age || ""}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">전공</label>
        <input
          ref={majorRef}
          className="form-control"
          name="major"
          value={student.major || ""}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">학년</label>
        <input
          ref={gradeRef}
          className="form-control"
          name="grade"
          value={student.grade || ""}
          onChange={handleChange}
        />
      </div>

      <button
        className="btn btn-secondary"
        onClick={() => navigate("/list")}
      >
        목록으로
      </button>
    </div>
  );
}

export default UpdatePage;
