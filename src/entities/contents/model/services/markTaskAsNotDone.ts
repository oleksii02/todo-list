import { getDatabase, ref, update } from 'firebase/database';
import { app } from '@/shared/lib/firebase/firebase';
const db = getDatabase(app);

export async function markTaskAsNotDone(
  userId: string,
  taskId: string
): Promise<void> {
  const taskRef = ref(db, `Users/${userId}/tasks/${taskId}`);
  return update(taskRef, { status: false });
}
