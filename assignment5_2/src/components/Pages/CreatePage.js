import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://6915287e84e8bd126af8d7a1.mockapi.io/students";

function CreatePage() {
  // useState: input 값 관리
  const [form, setForm] = useState({
    name: "",
    age: "",
    major: "",
    grade: "",
  });

  // useRef: 각 input에 대한 유효성 체크
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const majorRef = useRef(null);
  const gradeRef = useRef(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim()) {
      alert("이름을 입력하세요.");
      nameRef.current.focus();
      return false;
    }
    if (!form.age.trim() || isNaN(Number(form.age))) {
      alert("나이는 숫자로 입력하세요.");
      ageRef.current.focus();
      return false;
    }
    if (!form.major.trim()) {
      alert("전공을 입력하세요.");
      majorRef.current.focus();
      return false;
    }
    if (!form.grade.trim()) {
      alert("학년을 입력하세요.");
      gradeRef.current.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("학생이 추가되었습니다.");
    navigate("/list");
  };

  return (
    <div>
      <h2>학생 추가</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">이름</label>
          <input
            ref={nameRef}
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="form-label">나이</label>
          <input
            ref={ageRef}
            className="form-control"
            name="age"
            value={form.age}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="form-label">전공</label>
          <input
            ref={majorRef}
            className="form-control"
            name="major"
            value={form.major}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">학년</label>
          <input
            ref={gradeRef}
            className="form-control"
            name="grade"
            value={form.grade}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          저장
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/list")}
        >
          취소
        </button>
      </form>
    </div>
  );
}

export default CreatePage;
