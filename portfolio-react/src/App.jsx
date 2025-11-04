import { useState } from 'react'
import ThemeToggle from './components/ThemeToggle';
import FilterBar from './components/FilterBar';
import RepoList from './components/RepoList';
import ContactForm from './components/ContactForm';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const [filter, setFilter] = useState('all');

  return (
    <>
      <ThemeToggle />
      <FilterBar setFilter={setFilter} />
      <RepoList filter={filter} />
      <ContactForm />
      <ScrollToTop />
    </>
  );
}
export default App;

