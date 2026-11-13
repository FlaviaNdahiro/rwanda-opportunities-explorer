
function OpportunityFilters({
  search,
  setSearch,
  category,
  setCategory,
  sortBy,
  setSortBy,
  availableOnly,
  setAvailableOnly,
  savedOnly,
  setSavedOnly,
  onReset,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div>
          <label htmlFor="search" className="mb-2 block text-sm font-semibold">
            Search opportunities
          </label>
          <input
            id="search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or city..."
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-semibold">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All categories</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Community">Community</option>
            <option value="Education">Education</option>
            <option value="Career">Career</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort" className="mb-2 block text-sm font-semibold">
            Sort by
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="date">Earliest date</option>
            <option value="title">Title A to Z</option>
            <option value="seats">Most available places</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
            className="accent-emerald-700"
          />
          Available only
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={savedOnly}
            onChange={(e) => setSavedOnly(e.target.checked)}
            className="accent-emerald-700"
          />
          Saved only
        </label>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 text-sm font-semibold text-emerald-700 hover:underline"
      >
        Reset filters
      </button>
    </section>
  )
}

export default OpportunityFilters
