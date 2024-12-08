import { getDatabase, push, ref, set } from 'firebase/database';
import { app } from '@/shared/lib/firebase/firebase';
const db = getDatabase(app);

export async function fetchAddTask(
  userId: string,
  name: string,
  description: string
): Promise<boolean> {
  try {
    const taskRef = push(ref(db, 'Users/' + userId + '/tasks/'));
    set(taskRef, {
      taskName: name,
      description: description,
      timeCreation: Date.now(),
      status: false,
    } );
    return true;
  } catch (error: any) {
    throw new Error('Something went wrong');
  }
}
