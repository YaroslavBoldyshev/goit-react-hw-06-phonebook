import styled from 'styled-components';
import { useState } from 'react';
import { Button } from '../common/Button/Button';
import { Label } from '../common/Label/Label';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addContact } from 'redux/contactsSlice';

const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const onSubmit = e => {
    e.preventDefault();
    if (contacts.find(el => el.name === name)) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }
    dispatch(addContact(name, number));
    setName('');
    setNumber('');
  };

  return (
    <ContactsForm onSubmit={onSubmit}>
      <Label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        />
      </Label>

      <Label>
        Phone Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={e => setNumber(e.currentTarget.value)}
        />
      </Label>

      <Button type="submit">Add contact</Button>
    </ContactsForm>
  );
};

export default Form;

const ContactsForm = styled.form`
  border: 1px solid grey;
  width: 40vw;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 5px;
  background-color: #ffd4d4;
  button {
    width: 100px;
  }
`;
