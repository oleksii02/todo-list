'use client';
import { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import {
  deleteTaskThunk,
  fetchTasks,
  markAsDone,
  markAsNotDone,
} from '@/entities/contents';
import { EditTaskModal } from '@/shared/ui/Modal/edit-task';

export type Task = {
  taskId: string;
  Task: string;
  Description: string;
  TimeStamp: number;
  Done: boolean;
};
export default function TaskList() {
  const dispatch = useAppDispatch();
  const taskList = useAppSelector(
    (state) => state.contents?.taskList
  ) as Task[];
  const userId = useAppSelector((state) => state.auth?.userId);

  const [taskToEdit, setTaskToEdit] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 8;
  const totalPages = Math.ceil(taskList.length / tasksPerPage);
  const currentTasks = taskList.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const handleDeleteTask = async (taskId: string) => {
    const userConfirmed = window.confirm('Delete Task?');
    if (userConfirmed) {
      try {
        await dispatch(deleteTaskThunk({ userId, taskId }));
        await dispatch(fetchTasks(userId));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleToggleTask = async (taskId: string, isDone: boolean) => {
    if (isDone) {
      await dispatch(markAsNotDone({ userId, taskId }));
      await dispatch(fetchTasks(userId));
    } else {
      await dispatch(markAsDone({ userId, taskId }));
      await dispatch(fetchTasks(userId));
    }
    await dispatch(fetchTasks(userId));
  };

  return (
    <>
      <EditTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        task={taskToEdit}
      />
      <div className="flex flex-col items-center">
        <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Time stamp</th>
              <th>Done</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task, i) => (
              <tr key={i}>
                <td>{task.Task}</td>
                <td className="max-w-xs break-words">{task.Description}</td>
                <td>{new Date(task.TimeStamp).toLocaleDateString()}</td>
                <td>
                  <div className="form-control w-52">
                    <label className="label cursor-pointer">
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={task.Done}
                        onChange={() =>
                          handleToggleTask(task.taskId, task.Done)
                        }
                      />
                      <span className="label-text">
                        {task.Done ? 'Done' : 'Not Done'}
                      </span>
                    </label>
                  </div>
                </td>
                <td className="flex min-h-full items-center justify-center space-x-4 py-2 pt-5">
                  {/*<AiFillEdit*/}
                  {/*  className="text-3xl"*/}
                  {/*  onClick={() => {*/}
                  {/*    setIsOpen(true);*/}
                  {/*    setTaskToEdit(task);*/}
                  {/*  }}*/}
                  {/*/>*/}
                  {/*<BsFillTrashFill*/}
                  {/*  className="text-3xl"*/}
                  {/*  onClick={() => handleDeleteTask(task.taskId)}*/}
                  {/*/>*/}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="join mt-4">
          {totalPages > 1 &&
            Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isActive = currentPage === pageNumber ? 'btn-primary' : '';
              return (
                <button
                  key={pageNumber}
                  className={`join-item btn ${isActive}`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
        </div>
      </div>
    </>
  );
}
