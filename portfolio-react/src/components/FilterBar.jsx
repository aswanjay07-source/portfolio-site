function FilterBar({ setFilter }) {
  const filters = ['all', 'react', 'api', 'css', 'backend'];

  return (
    <div id="filter-buttons">
      {filters.map(f => (
        <button key={f} data-filter={f} onClick={() => setFilter(f)}>
          {f.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;