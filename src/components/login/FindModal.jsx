import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'

function Find_Modal({ isOpen, onClose }) {
  /* modal */
  // const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  /* modal/ */

  /* find id/pw */
  const [findIdData, setFindIdData] = useState({
    name: '',
    hp: '',
    email: '',
    foreignerNumber: ''
  });

  const [findPwData, setFindPwData] = useState({
    id: '',
    hp: '',
    email: '',
    name: ''
  });

  const handleIdChange = (e) => {
    const { name, value } = e.target;
    setFindIdData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setFindPwData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFindId = (e) => {
    e.preventDefault();
    console.log('Find ID with:', findIdData);
    alert('ID: luuu');
    // ID 찾기 로직 구현
  };

  const handleFindPw = (e) => {
    e.preventDefault();
    console.log('Find PW with:', findPwData);
    alert('PW: 3213');
    // 비밀번호 찾기 로직 구현
  };
  /* find id/pw // */
  return (
    <>

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
    </>
  )
}

export default Find_Modal