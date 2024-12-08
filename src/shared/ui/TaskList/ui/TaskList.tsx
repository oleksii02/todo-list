'use client';
import { FC, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import {
  deleteTaskThunk,
  fetchTasks,
  markAsDone,
  markAsNotDone,
} from '@/entities/contents';
import { EditTaskModal } from '@/shared/ui/Modal/edit-task';
import {
  Checkbox,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { DeleteIcon, EditIcon } from '@/shared/ui/Icon';
import { getUserId } from '@/entities/auth/model/selectors/getUserId';

export const TaskList: FC = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getUserId);


  const [taskToEdit, setTaskToEdit] = useState<any>(null);
  const taskList = useAppSelector(state => state.contents.taskList);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
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
        onClose={onClose}
        onOpenChange={onOpenChange}
        task={taskToEdit}
      />
      <div className="flex flex-col items-center">
        <Table
          className="rounded-2xl border-2 border-primary"
          color="primary"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                showControls
                color="primary"
                page={currentPage}
                total={totalPages}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn>Task name</TableColumn>
            <TableColumn>Description</TableColumn>
            <TableColumn>Time of creation</TableColumn>
            <TableColumn>Confirm</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Edit</TableColumn>
            <TableColumn>Delete</TableColumn>
          </TableHeader>
          <TableBody>
            {currentTasks.map((task) => (
              <TableRow key={task.taskId}>
                <TableCell>{task.taskName}</TableCell>
                <TableCell width={200}>{task.description}</TableCell>
                <TableCell>
                  {new Date(task.timeCreation).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Checkbox
                    size={'lg'}
                    color="primary"
                    type="checkbox"
                    className="toggle toggle-primary"
                    isSelected={task.status}
                    onChange={() => handleToggleTask(task.taskId, task.status)}
                  />
                </TableCell>
                <TableCell> {task.status ? 'Ready' : 'In progress'}</TableCell>
                <TableCell>
                  <Button
                    className="h-6 w-6 min-w-6 rounded-lg"
                    isIconOnly
                    color="primary"
                    onPress={() => {
                      onOpen();
                      setTaskToEdit(task);
                    }}
                  >
                    <EditIcon color={'#fff'} width={18} height={18} />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    className="h-6 w-6 min-w-6 rounded-lg"
                    isIconOnly
                    color="danger"
                    onPress={() => handleDeleteTask(task.taskId)}
                  >
                    <DeleteIcon color={'#fff'} width={20} height={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
