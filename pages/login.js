import { useState } from 'react';
import supabase from '../lib/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      if (isSignUp) {
        // Handle SignUp
        const { user, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message);
        } else {
          // Insert user email and password into the 'users' table
          const { data, error: insertError } = await supabase
            .from('users')
            .insert([{ email, hashed_password: password }]);

          if (insertError) {
            setError(insertError.message);
          } else {
            setMessage('Thank you for joining Cheffd! Please check your email for verification.');
          }
        }
      } else {
        // Handle Login
        const { user, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) {
          setError(loginError.message);
        } else {
          setMessage('Login successful!');
        }
      }
    } catch (error) {
      setError('An error occurred during the process.');
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Create an Account' : 'Login to Cheffd'}</h2>
      <form onSubmit={handleAuth}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <p>
        {isSignUp ? (
          <span>
            Already have an account?{' '}
            <button onClick={() => setIsSignUp(false)}>Login</button>
          </span>
        ) : (
          <span>
            Don't have an account?{' '}
            <button onClick={() => setIsSignUp(true)}>Sign Up</button>
          </span>
        )}
      </p>
    </div>
  );
};

export default Login;
