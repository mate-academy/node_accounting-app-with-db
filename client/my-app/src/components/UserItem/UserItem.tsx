import React, { useContext, useState } from "react";
import classNames from 'classnames';
import { patchUser, removeUser } from "../../api/users";
import { SelectedUserContext } from "../../SelectedUserContext";
import { User } from "../../types/User";
import './UserItem.css';

type Props = {
  user: User,
  changeCount: number,
  update: React.Dispatch<React.SetStateAction<number>>,
};

const doubleClick = 2;

export const UserItem: React.FC<Props> = ({ user, changeCount, update }) => {
  const { id, name } = user;

  const { selectedUserId, setSelectedUserId } = useContext(SelectedUserContext);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);

  const handleClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    if (e.detail === doubleClick) {
      setIsUpdating(true);

      return;
    }

    setSelectedUserId(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      patchUser(id, updatedName)
        .then(() => setIsUpdating(false))
        .then(() => setSelectedUserId(null))
        .then(() => update(changeCount + 1));
    }
  };

  return(
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
            onClick={() => {
              removeUser(id)
                .then(() => update(changeCount + 1));
            }}
          ></button>
        </div>
      )}
    </li>
  );
};
