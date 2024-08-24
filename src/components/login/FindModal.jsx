import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react';
import { useFindModal } from '../../hooks/authorization/useFindModal';

function Find_Modal({ isOpen, onClose }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const {
    findIdData,
    findPwData,
    handleIdChange,
    handlePwChange,
    handleFindId,
    handleFindPw
  } = useFindModal();

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent maxWidth='700px'>
        <ModalHeader color="#775A45" backgroundColor="#dddddd">Find ID / PW</ModalHeader>
        <ModalCloseButton marginTop="10px" />
        <ModalBody pb={6}>
          <div className="find-id-pw-container">
            <div className="find-id-section">
              <h2>Find ID</h2>
              <form onSubmit={handleFindId}>
                <div className="input-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={findIdData.name}
                    onChange={handleIdChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="tel"
                    name="hp"
                    placeholder="Your H.P"
                    value={findIdData.hp}
                    onChange={handleIdChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your EMAIL"
                    value={findIdData.email}
                    onChange={handleIdChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    name="foreignerNumber"
                    placeholder="Your Foreigner registration number"
                    value={findIdData.foreignerNumber}
                    onChange={handleIdChange}
                  />
                </div>
                <button type="submit" className="find-button">Find ID</button>
              </form>
            </div>

            <div className="divider"></div>

            <div className="find-pw-section">
              <h2>Find PW</h2>
              <form onSubmit={handleFindPw}>
                <div className="input-group">
                  <input
                    type="text"
                    name="id"
                    placeholder="Your ID"
                    value={findPwData.id}
                    onChange={handlePwChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="tel"
                    name="hp"
                    placeholder="Your H.P"
                    value={findPwData.hp}
                    onChange={handlePwChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your EMAIL"
                    value={findPwData.email}
                    onChange={handlePwChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={findPwData.name}
                    onChange={handlePwChange}
                  />
                </div>
                <button type="submit" className="find-button">Find PW</button>
              </form>
            </div>
          </div>
        </ModalBody>

        <ModalFooter height="70px" >
          <Button onClick={onClose} backgroundColor='#775A45' color="#FFFCF7" borderRadius="50px" _hover={{ backgroundColor: '#BA9F8B' }}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Find_Modal;