import React, { useEffect, useState } from "react";

function ShowList() {

  // MockAPI 엔드포인트
  const API = "https://6915287e84e8bd126af8d7a1.mockapi.io/students";

  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({name: "", age: "", major: ""});
  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    fetch(API)
      .then(res => res.json())
      .then(json => setStudents(json));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //POST
  const handleAdd = () => {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      setForm({ name: "", age: "", major: "" });
      fetchData();
    });
  };

  //PUT
  const handleUpdate = () => {
    fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      setForm({ name: "", age: "", major: "" });
      setEditId(null);
      fetchData();
    });
  };

  //DELETE
  const handleDelete = (id) => {
    fetch(`${API}/${id}`, { method: "DELETE" }).then(() => fetchData());
  };

  //수정 모달 여는 함수
  const openEditModal = (student) => {
    setForm({
      name: student.name,
      age: student.age,
      major: student.major,
    });
    setEditId(student.id);
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-3">학생 CRUD 관리</h2>

      {/* 추가 버튼 */}
      <button
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
      >
        + 학생 추가
      </button>

      {/* 리스트 */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>이름</th>
            <th>나이</th>
            <th>전공</th>
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
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => openEditModal(s)}
                >
                  수정
                </button>
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

      {/* 추가 모달 */}
      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <h4>학생 추가</h4>
            <input
              className="form-control mb-2"
              name="name"
              placeholder="이름"
              value={form.name}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              name="age"
              placeholder="나이"
              value={form.age}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              name="major"
              placeholder="전공"
              value={form.major}
              onChange={handleChange}
            />

            <button
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleAdd}
            >
              추가하기
            </button>
          </div>
        </div>
      </div>

      {/* 수정 모달 */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <h4>학생 수정</h4>

            <input
              className="form-control mb-2"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              name="age"
              value={form.age}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              name="major"
              value={form.major}
              onChange={handleChange}
            />

            <button
              className="btn btn-success"
              data-bs-dismiss="modal"
              onClick={handleUpdate}
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowList;
