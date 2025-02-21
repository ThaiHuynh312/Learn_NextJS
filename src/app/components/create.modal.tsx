"use client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { useSWRConfig } from "swr";

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (v: boolean) => void;
  user?: IUser | null;
  mutate: () => void;
}

function CreateModal({
  showModalCreate,
  setShowModalCreate,
  user,
  mutate,
}: IProps) {
  const [name, setName] = useState<string>("");
  const [nameClass, setNameClass] = useState<string>("");

  useEffect(() => {
    setName(user?.name || "");
    setNameClass(user?.class || "");
  }, [user]);

  const handleClose = () => {
    setName("");
    setNameClass("");
    setShowModalCreate(false);
  };

  const handleAdd = async () => {
    if (!name || !nameClass) return alert("Vui lòng điền đầy đủ thông tin.");

    try {
      await api.post("/users", { name: name, class: nameClass });
      mutate();
      toast.success("Thêm thành công!");
      handleClose();
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/users/${user?.id}`, {
        name: name,
        class: nameClass,
      });

      mutate();
      toast.success("Cập nhật thành công!");
      handleClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  return (
    <>
      <Modal
        show={showModalCreate}
        onHide={() => handleClose()}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin sinh viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lớp</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên lớp"
                value={nameClass}
                onChange={(e) => setNameClass(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          {user ? (
            <Button variant="primary" onClick={() => handleUpdate()}>
              Update
            </Button>
          ) : (
            <Button variant="primary" onClick={() => handleAdd()}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;
