import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import TaskApi from '../api/task';

export async function UModal (){
   const [show, setshow] = useState(false)
   const handleClose = () => setshow(false);
   const handleShow = () => setshow(true);
   const update = () => null;
   const res = TaskApi.getAll();
    

   return (
      <>
      <Button
         variant="primary"
         onClick={handleShow} 
      >
         Update
      </Button>
      <Modal show={show} onHide={handleClose} >
         <Modal.Header closeButton>
            <Modal.Title>
               Edit Task
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>

         </Modal.Body>
         <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
               CLose
            </Button>
            <Button variant="primary" onClick={update} >

            </Button>

         </Modal.Footer>

      </Modal>

      </>
   );
}