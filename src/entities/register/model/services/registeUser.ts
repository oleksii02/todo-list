import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from '@/shared/lib/firebase/firebase';

const auth = getAuth(app);
const db = getDatabase(app);

export async function registerUser(
  email: string,
  password: string
): Promise<string> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    set(ref(db, 'Users/' + user.uid), {
      email: email,
    });
    alert('User Created!');
    return user.uid;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email is already registered.');
    } else {
      throw new Error(error.message);
    }
  }
}
