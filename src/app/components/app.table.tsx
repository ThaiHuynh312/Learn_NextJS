"use client";

import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import CreateModal from "./create.modal";
import { useState } from "react";
import api from "@/lib/axios";
import {
  AddCircleOutlineOutlined,
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";

interface IProps {
  users: IUser[];
  mutate: () => void;
}

const AppTable = ({ users, mutate }: IProps) => {
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  console.log("users: ", users);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/users/${id}`);
      mutate();
      toast.success("Xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setShowModalCreate(true);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Danh sách sinh viên</h3>
        <Button variant="success" onClick={() => setShowModalCreate(true)}>
          <AddCircleOutlineOutlined/>
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Stt</th>
            <th>Tên</th>
            <th>Lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.class}</td>
              <td>
                <Button
                  variant="warning"
                  className="mx-3"
                  onClick={() => handleEdit(user)}
                >
                  <ModeEditOutlineOutlined />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  <DeleteOutlineOutlined />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
        user={selectedUser}
        mutate={mutate}
      />
    </div>
  );
};

export default AppTable;
