import { getDatabase, ref, remove } from 'firebase/database';
import { app } from '@/shared/lib/firebase/firebase';
const db = getDatabase(app);

export async function deleteTask(
  userId: string,
  taskId: string
): Promise<void> {
  const taskRef = ref(db, `Users/${userId}/tasks/${taskId}`);
  return remove(taskRef);
}
