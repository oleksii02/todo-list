import { getDatabase, onValue, ref } from 'firebase/database';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { app } from '@/shared/lib/firebase/firebase';
const db = getDatabase(app);

async function fetch(userId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const tasksRef = ref(db, 'Users/' + userId + '/tasks/');

    onValue(
      tasksRef,
      (snapshot) => {
        const data = snapshot.val();
        const tasks: any[] = [];

        if (data) {
          for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'object' && value !== null) {
              tasks.push({ taskId: key, ...value });
            }
          }
        }

        resolve(tasks);
      },
      (error) => {
        reject(new Error('Something went wrong: ' + error));
      }
    );
  });
}

export const fetchTasks = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>('cont/contFetch', async (userId) => {
  return await fetch(userId);
});
