import { FormHTMLAttributes, useActionState } from "react";
import { Button } from "../button/button";
import styles from "./edit-title-form.module.css";
import { editTitle } from "./actions";

type EditTitleFormProps = FormHTMLAttributes<HTMLFormElement> & {
  onClose: () => void;
  refetchTasks: () => void;
  defaultTitle: string;
  taskId: string;
}

export function EditTitleForm({ onClose, defaultTitle, taskId, refetchTasks, ...props }: EditTitleFormProps) {
  const [state, formAction, isPending] = useActionState(editTitle(refetchTasks), undefined);

  return (
    <>
      <form className={styles.form} {...props}>
      <input type="text" className={styles.input} name="task" defaultValue={defaultTitle} />
      <input type="hidden" name="taskId" value={taskId} />
      <div className={styles.actions}>
        <Button disabled={isPending} formAction={(e) => {
          formAction(e);
          onClose();
        }} color="green">{isPending ? "Изменяю..." : "Изменить"}</Button>
        <Button disabled={isPending} type="button" color="grey" onClick={onClose}>Отмена</Button>
      </div>
    </form>
    {state?.status === "error" && <div className={styles.error}>{state.message}</div>}
    </>
  )
}