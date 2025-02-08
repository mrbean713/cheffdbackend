import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { useRouter } from 'next/router';

const Recipes = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login'); // Redirect to login if not authenticated
      } else {
        setUser(user);
      }
    };

    fetchUser();
  }, [router]);

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data, error } = await supabase
        .from('recipes')
        .insert([{ name, description, ingredients, instructions }]);

      if (error) {
        setError(error.message);
      } else {
        setMessage('Recipe added successfully!');
        setName('');
        setDescription('');
        setIngredients('');
        setInstructions('');
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.email}!</h2>
      <form onSubmit={handleAddRecipe}>
        <div>
          <label>Recipe Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ingredients</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Instructions</label>
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Recipes;
