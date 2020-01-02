import React, { useState } from 'react';
import InputField from '@kiwicom/orbit-components/lib/InputField';
import Button from '@kiwicom/orbit-components/lib/Button';
import Modal, { ModalSection, ModalHeader, ModalFooter } from '@kiwicom/orbit-components/lib/Modal';
import ChevronLeft from '@kiwicom/orbit-components/lib/icons/ChevronLeft';

function AddList({ addHandler, onCloseHandler }) {
  const [listname, setListname] = useState('');

  const changeHandler = e => {
    const { value } = e.currentTarget;
    if (value !== listname) setListname(value);
  };

  const onClickHandler = e => {
    addHandler({ variables: { listName: listname } });
  };

  return (
    <Modal onClose={onCloseHandler}>
      <ModalHeader title="Add Member to List" description="Enter User-ID of the user you want to add." />
      <ModalSection>
        <InputField label="Name" value={listname} placeholder="Name" onChange={changeHandler} />
      </ModalSection>
      <ModalFooter flex={['0 0 auto', '1 1 100%']}>
        <Button onClick={onCloseHandler} icon={<ChevronLeft />} type="secondary">
          Back
        </Button>
        <Button fullWidth disabled={listname === ''} type="button" onClick={onClickHandler}>
          Add
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddList;
