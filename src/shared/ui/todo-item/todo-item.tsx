import EditIcon from 'src/assets/edit.svg?react';
import DeleteIcon from 'src/assets/delete.svg?react';
import CheckIcon from 'src/assets/check.svg?react';
import PlusIcon from 'src/assets/plus.svg?react';

import { AddTodoForm } from '../add-todo-form/add-todo-form';
import { EditTitleForm } from '../edit-title-form/edit-title-form';

import styles from './todo-item.module.css';
import React from 'react';
import { changeTodoStatus, deleteTodo, ListItem } from 'src/shared/lib/api';
import { cn } from 'src/shared/lib/css';
import { EditTodoForm } from '../edit-todo-form/edit-todo-form';

type TodoItemProps = {
  task: ListItem;
  refetchTasks: () => void;
};

export function TodoItem({ task, refetchTasks }: TodoItemProps) {
  const [isTodoFormOpened, setIsTodoFormOpened] = React.useState(false);
  const [isTitleFormOpened, setIsTitleFormOpened] = React.useState(false);
  const [isEditFormOpened, setIsEditFormOpened] = React.useState(false);

  const [selectedTodo, setSelectedTodo] = React.useState('');
  const inputTodoRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsTodoFormOpened(true);
    inputTodoRef.current?.focus();
  };

  const handleDelete = (id: string) => {
    React.startTransition(async () => {
      await deleteTodo(id);
      React.startTransition(() => {
        refetchTasks();
      });
    });
  };

  const handleChangeStatus = (id: string, completed: boolean) => {
    React.startTransition(async () => {
      await changeTodoStatus(id, completed)
      React.startTransition(() => {
        refetchTasks();
      })
    })
  }

  return (
    <>
      <div className={styles.header}>
        {isTitleFormOpened ? (
          <EditTitleForm
            defaultTitle={task?.name}
            taskId={task.id}
            refetchTasks={refetchTasks}
            onClose={() => setIsTitleFormOpened(false)}
          />
        ) : (
          <>
            <h2 className={styles.title} style={{ color: task?.color.hex }}>
              {task?.name}
            </h2>
            <EditIcon
              className={styles.icon}
              onClick={() => setIsTitleFormOpened(true)}
            />
          </>
        )}
      </div>
      <hr className={styles.divider} />
      {task.todos.length !== 0 && (
        <div className={styles['todo-list']}>
          {task.todos.map((todo) => (
            <div key={todo.id}>
              {selectedTodo === todo.id && isEditFormOpened ? (
                <EditTodoForm
                  onClose={() => setIsEditFormOpened(false)}
                  refetchTasks={refetchTasks}
                  defaultText={todo.text}
                  todoId={todo.id}
                />
              ) : (
                <div className={styles['todo-block']}>
                  <label className={styles.todo} htmlFor={todo.id}>
                    <input
                      className={styles['real-check']}
                      type="checkbox"
                      name="todo"
                      value={todo.id}
                      id={todo.id}
                      checked={todo.completed}
                      onChange={(e) => handleChangeStatus(e.target.value, !todo.completed)}
                    />
                    <span className={styles['custom-check']}>
                      <CheckIcon className={styles.check} />
                    </span>
                    <span className={styles.text}>{todo.text}</span>
                  </label>
                  <div className={styles.actions}>
                    <button
                      onClick={() => {
                        setSelectedTodo(todo.id);
                        setIsEditFormOpened(true);
                      }}
                      className={styles.action}
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className={styles.action}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className={styles['add-todo-block']}>
        <button
          onClick={handleClick}
          className={cn(styles['add-todo'], {
            [styles.opened]: !isTodoFormOpened,
            [styles.closed]: isTodoFormOpened,
          })}
        >
          <PlusIcon />
          <span>Новая задача</span>
        </button>

        <AddTodoForm
          refetchTasks={refetchTasks}
          listId={task.id}
          ref={inputTodoRef}
          onClose={() => setIsTodoFormOpened(false)}
          className={cn({
            [styles.opened]: isTodoFormOpened,
            [styles.closed]: !isTodoFormOpened,
          })}
        />
      </div>
    </>
  );
}
