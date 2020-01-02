import React, { useState } from 'react';
import InputField from '@kiwicom/orbit-components/lib/InputField';
import Button from '@kiwicom/orbit-components/lib/Button';
import Modal, { ModalSection, ModalHeader, ModalFooter } from '@kiwicom/orbit-components/lib/Modal';
import ChevronLeft from '@kiwicom/orbit-components/lib/icons/ChevronLeft';

function AddMember({ currentUser, addMember, onCloseHandler }) {
  const [memberId, setMemberId] = useState('');

  const onChangeMemberId = e => {
    setMemberId(e.currentTarget.value);
  };

  return (
    <Modal onClose={onCloseHandler}>
      <ModalHeader title="Add Member to List" description="Enter User-ID of the user you want to add." />
      <ModalSection>
        <InputField
          onClick={e => {
            return e.preventDefault();
          }}
          label="User-ID"
          placeholder="Enter User-ID to add"
          onChange={onChangeMemberId}
          error={memberId === currentUser ? 'You can not add yourself' : null}
        />
      </ModalSection>
      <ModalFooter flex={['0 0 auto', '1 1 100%']}>
        <Button onClick={onCloseHandler} icon={<ChevronLeft />} type="secondary">
          Back
        </Button>
        <Button
          fullWidth
          primary
          disabled={memberId === currentUser}
          onClick={e => {
            e.preventDefault();
            if (memberId !== currentUser) {
              addMember({ variables: { userId: memberId } });
              onCloseHandler();
            }
          }}
        >
          Add
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddMember;
