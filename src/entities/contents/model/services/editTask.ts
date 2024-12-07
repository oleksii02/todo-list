import { Task } from '@/entities/contents';
import { getDatabase, ref, update } from 'firebase/database';
import { app } from '@/shared/lib/firebase/firebase';
const db = getDatabase(app);

export async function editTask(
  userId: string,
  taskId: string,
  data: Partial<Task>
): Promise<void> {
  const taskRef = ref(db, `Users/${userId}/tasks/${taskId}`);
  console.log(data);
  return update(taskRef, data);
}
