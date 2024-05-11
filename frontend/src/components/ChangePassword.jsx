import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

// Password Change Form Component
const PasswordChangeForm = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success,setSuccess]=useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setLoading(true);
      try {
        const response = await axios.put(import.meta.env.VITE_BACKEND_URL+'/passwordChange', { password }, { withCredentials: true });
        setLoading(false);
        
        if (response.data.success) {
          setSuccess("Password Change Successfully")
          setError(null);
          setTimeout(()=>onSubmit(),1000) // Call onSubmit callback upon successful password change
        } else {
          setError("Failed to change password");
        }
      } catch (error) {
        setLoading(false);
        setError("An error occurred. Please try again.");
      }
    } else {
      setError("Passwords don't match");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="password">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button className='mt-4' variant="primary" type="submit">
        Change Password
      </Button>
      <div className='p-3'>
        {error && <p className='text-center  text-danger fw-bold'>{error}</p>}
        {loading && <p className='text-center'><Spinner animation="border" variant="info" /></p>}
        {success && <p className=' text-center fw-bold text-success'>{success}</p>}
      </div>
    </Form>
  );
};

// Main App Component
const ChangePassword = () => {
  const [showFloatingWindow, setShowFloatingWindow] = useState(false);

  const handleChangePassword = () => {
    setShowFloatingWindow(false); // Close modal upon successful password change
  };

  return (
    <div>
      <span style={{ cursor: "pointer" }} onClick={() => setShowFloatingWindow(true)}>
        Change Password
      </span>
      <FloatingWindow
        show={showFloatingWindow}
        onClose={() => setShowFloatingWindow(false)}
        onSubmit={handleChangePassword} // Pass the callback function
      />
    </div>
  );
};

// Floating Window Component
const FloatingWindow = ({ show, onClose, onSubmit }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className="bg-black text-white">
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-black text-white">
        <PasswordChangeForm onSubmit={onSubmit} />
      </Modal.Body>
    </Modal>
  );
};

export default ChangePassword;
