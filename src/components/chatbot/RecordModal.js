import React from 'react';
import '../../assets/styles/chatbot/RecordModal.scss';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { useRecorder } from '../../hooks/chatbot/useRecorder';

function RecordModal({ onRecordingComplete, onAudioSend }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isRecording,
    isPaused,
    audioURL,
    timeLeft,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    restartRecording
  } = useRecorder(onRecordingComplete);

  return (
    <>
      <button className='record-modal-btn' onClick={onOpen}>
        <svg viewBox="0 0 24 24" className="icon">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Record</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} backgroundColor="#EFE2D8">
            <div className='total-audio-recorder'>
              <div className="audio-recorder">
                {!isRecording && !audioURL ? (
                  <button className="record-button" onClick={startRecording}>
                    <svg viewBox="0 0 24 24" className="record-icon">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                    녹음 시작
                  </button>
                ) : isRecording ? (
                  <>
                    <button className="record-button recording" onClick={stopRecording}>
                      <svg viewBox="0 0 24 24" className="record-icon">
                        <path d="M6 6h12v12H6z"/>
                      </svg>
                      녹음 중지 ({timeLeft}s)
                    </button>
                    <button className="pause-button" onClick={isPaused ? resumeRecording : pauseRecording}>
                      {isPaused ? (
                        <svg viewBox="0 0 24 24" className="record-icon">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="record-icon">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                      )}
                      {isPaused ? '재개' : '일시정지'}
                    </button>
                  </>
                ) : (
                  <>
                    <button className="restart-button" onClick={restartRecording}>
                      <svg viewBox="0 0 24 24" className="record-icon">
                        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                      </svg>
                      다시 녹음
                    </button>
                    <audio src={audioURL} controls className="audio-player" />
                  </>
                )}
              </div>

              <div className='record-text'>
                <p>당신의 문장 : </p>
                <span>녹음해주세요.</span>
              </div>
            </div>
          </ModalBody>

          <ModalFooter height='100px' margin="0px">
              <button className='send-button'>
                Send
              </button>
              <button className='record-modal-cancel-button' onClick={onClose}>Cancel</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RecordModal;