import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = "https://6915287e84e8bd126af8d7a1.mockapi.io/students";

function ListPage() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchData = () => {
    fetch(API)
      .then((res) => res.json())
      .then((json) => setStudents(json));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제할까요?")) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>학생 목록</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/create")}
        >
          학생 추가
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>이름</th>
            <th>나이</th>
            <th>전공</th>
            <th>학년</th>
            <th>상세</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.major}</td>
              <td>{s.grade}</td>
              <td>
                <Link
                  to={`/detail/${s.id}`}
                  className="btn btn-info btn-sm"
                >
                  상세
                </Link>
              </td>
              <td>
                <Link
                  to={`/update/${s.id}`}
                  className="btn btn-warning btn-sm"
                >
                  수정
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(s.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPage;
