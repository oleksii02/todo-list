import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/shared/lib/firebase/firebase';

const auth = getAuth(app);

export async function loginUser(
  email: string,
  password: string
): Promise<string> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user.uid;
  } catch (error: any) {
    throw new Error('Something went wrong');
  }
}
