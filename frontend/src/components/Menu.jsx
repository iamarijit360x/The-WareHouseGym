import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ChangePassword from './ChangePassword';
import { useSelector } from 'react-redux';

export default function MenuWithSettingsIcon() {
  const [showMenu, setShowMenu] = useState(false);

  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);
  const name=useSelector(state=>state.auth.userData.firstname)
  return (
    <div>
      <FontAwesomeIcon icon={faCog} onClick={handleShowMenu} className="me-2" style={{ cursor: 'pointer' }} />
      <Offcanvas style={{background:"rgb(82, 64, 0)",width:"13rem",color:"white"}} show={showMenu} onHide={handleCloseMenu} placement="start" name="start">
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Hello {name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
         
          
            <ChangePassword/>
            
          
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
