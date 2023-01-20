import styled from 'styled-components';
import { ContactListItem } from '../ContactListItem/ContactListItem';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { getFilter } from 'redux/selectors';

export const ContactsList = () => {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
  const filtredContacts = contacts.filter(el =>
    el.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  return (
    <ListOfContacts>
      {filtredContacts.map(contact => {
        return <ContactListItem contact={contact} key={contact.id} />;
      })}
    </ListOfContacts>
  );
};

const ListOfContacts = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
