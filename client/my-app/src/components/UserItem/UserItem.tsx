import React, {
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  FC,
  KeyboardEvent,
  useCallback
} from "react";

import classNames from 'classnames';
import { patchUser, removeUser } from "../../api/users";
import { SelectedUserContext } from "../../Contexts/SelectedUserContext";
import './UserItem.css';
import { ErrorContext } from "../../Contexts/ErrorContext";

type Props = {
  user: User,
  changeCount: number,
  update: Dispatch<SetStateAction<number>>,
};

const doubleClick = 2;

export const UserItem: FC<Props> = ({ user, changeCount, update }) => {
  const { id, name } = user;

  const { selectedUserId, setSelectedUserId } = useContext(SelectedUserContext);
  const { setErrorMessage } = useContext(ErrorContext);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);

  const handleClick = useCallback((
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    if (e.detail === doubleClick) {
      setIsUpdating(true);

      return;
    }

    setSelectedUserId(id);
  }, [id, setSelectedUserId]);

  const handleKeyDown = useCallback(async(
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      try {
        await patchUser(id, updatedName);
      } catch (err: any) {
        setErrorMessage('Error on user updating');
      }

      setIsUpdating(false);
      setSelectedUserId('');
      update(changeCount + 1);
    }
  }, [changeCount, id, setSelectedUserId, update, updatedName]);

  const handleDelete = useCallback(async() => {
    try {
      await removeUser(id);
    } catch (err: any) {
      setErrorMessage('Error on user deleting');
    }

    update(changeCount + 1);
  }, [changeCount, id, update]);

  return (
    <li className="level">
      {isUpdating ? (
        <input
          type="text"
          className="input"
          value={updatedName}
          onChange={e => setUpdatedName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className={classNames('view container level', {
          selected: id === selectedUserId,
        })}>
          <p className="name" onClick={handleClick}>{name}</p>

          <button
            className="delete level-right"
            onClick={handleDelete}
          ></button>
        </div>
      )}
    </li>
  );
};
