import { useState } from 'react';
import { Button, Form } from 'react-bulma-components';
import { postUser } from '../api/Users';

type Props = {
  setHasModal: (value: boolean) => void;
};

export const UsersForm: React.FC<Props> = ({ setHasModal }) => {
  const [name, setName] = useState('');

  const handleFormSubmit = () => {
    postUser({name});
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Form.Field>
        <Form.Label>Name</Form.Label>
        <Form.Control>
          <Form.Input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Form.Control>
      </Form.Field>

      <Form.Field kind="group">
        <Form.Control>
          <Button color="success" type="submit">
            Save
          </Button>
        </Form.Control>
        <Form.Control>
          <Button
            color="link"
            colorVariant="light"
            onClick={() => {
              setHasModal(false);
            }}
          >
            Cancel
          </Button>
        </Form.Control>
      </Form.Field>
    </form>
  );
};
