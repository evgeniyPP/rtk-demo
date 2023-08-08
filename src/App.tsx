import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './store';
import { decrement, increment } from './store/count';
import { getUsers, selectUser } from './store/users';

export default function App() {
  const dispatch = useAppDispatch();
  const { count } = useAppSelector(state => state.count);
  const { users, selectedUser, isLoading } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>RTK Demo</h1>

      <section>
        <h2>Count</h2>
        <div>
          <button onClick={() => dispatch(decrement())}>-</button>
          <span>&nbsp;{count}&nbsp;</span>
          <button onClick={() => dispatch(increment())}>+</button>
        </div>
      </section>

      <section>
        <h2>Users List</h2>
        <ul>
          {users.map(user => (
            <li key={user.id} onClick={() => dispatch(selectUser(user.id))}>
              {user.name}
            </li>
          ))}
        </ul>
      </section>

      <section>
        {selectedUser && (
          <>
            <h2>Selected User</h2>
            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Phone: {selectedUser.phone}</p>
            <p>Website: {selectedUser.website}</p>
            <p>Company Name: {selectedUser.company.name}</p>
          </>
        )}
      </section>
    </>
  );
}
