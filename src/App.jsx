
import { useState, useEffect } from "react"
import OpportunityList from "./components/OpportunityList"
import OpportunityFilters from "./components/OpportunityFilters"
import AddOpportunityForm from "./components/AddOpportunityForm"
import Button from "./components/Button"
import seedOpportunities from "./data/seedOpportunities"

function App() {
  // Load opportunities from localStorage when the app starts
  const [opportunities, setOpportunities] = useState(() => {
    try {
      const storedOpportunities = localStorage.getItem("opportunities")

      return storedOpportunities
        ? JSON.parse(storedOpportunities)
        : seedOpportunities
    } catch {
      return seedOpportunities
    }
  })

  // Save opportunities whenever the list changes
  useEffect(() => {
    localStorage.setItem("opportunities", JSON.stringify(opportunities))
  }, [opportunities])

  // Load saved opportunity IDs from localStorage
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const storedSavedIds = localStorage.getItem("savedOpportunities")

      return storedSavedIds ? JSON.parse(storedSavedIds) : []
    } catch {
      return []
    }
  })

  // Save changes to saved opportunities
  useEffect(() => {
    localStorage.setItem("savedOpportunities", JSON.stringify(savedIds))
  }, [savedIds])

  // Search and filter states
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sortBy, setSortBy] = useState("date")
  const [availableOnly, setAvailableOnly] = useState(false)
  const [savedOnly, setSavedOnly] = useState(false)

  // Control the page display
  const [viewState, setViewState] = useState("normal")

  // Save or unsave an opportunity
  function handleToggleSave(id) {
    setSavedIds((previousIds) =>
      previousIds.includes(id)
        ? previousIds.filter((savedId) => savedId !== id)
        : [...previousIds, id]
    )
  }

  // Add a new opportunity
  function handleAddOpportunity(newOpportunity) {
    setOpportunities((previousOpportunities) => [
      newOpportunity,
      ...previousOpportunities,
    ])
  }

  // Reset all search and filter settings
  function handleReset() {
    setSearch("")
    setCategory("All")
    setSortBy("date")
    setAvailableOnly(false)
    setSavedOnly(false)
  }

  // Filter opportunities
  const filteredOpportunities = opportunities.filter((opportunity) => {
    const searchTerm = search.trim().toLowerCase()

    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchTerm) ||
      opportunity.city.toLowerCase().includes(searchTerm)

    const matchesCategory =
      category === "All" || opportunity.category === category

    const matchesAvailability =
      !availableOnly || opportunity.availableSeats > 0

    const matchesSaved =
      !savedOnly || savedIds.includes(opportunity.id)

    return (
      matchesSearch &&
      matchesCategory &&
      matchesAvailability &&
      matchesSaved
    )
  })

  // Sort opportunities
  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    }

    if (sortBy === "seats") {
      return b.availableSeats - a.availableSeats
    }

    return a.date.localeCompare(b.date)
  })

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-green-800">
            Rwanda Opportunities Explorer
          </h1>

          <p className="mt-3 text-slate-600">
            Discover workshops, courses and community activities across Rwanda.
          </p>

          <p className="mt-4 font-semibold text-slate-700">
            Saved opportunities: {savedIds.length}
          </p>
        </header>

        {/* Add opportunity form */}
        <div className="mb-8">
          <AddOpportunityForm
            onAddOpportunity={handleAddOpportunity}
          />
        </div>

        {/* Search and filters */}
        <OpportunityFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          availableOnly={availableOnly}
          setAvailableOnly={setAvailableOnly}
          savedOnly={savedOnly}
          setSavedOnly={setSavedOnly}
          onReset={handleReset}
        />

        {/* Conditional rendering demo */}
        <section className="mb-6 mt-8 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-slate-800">
            Conditional Rendering Demo
          </h2>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setViewState("normal")}>
              Show Opportunities
            </Button>

            <Button
              variant="secondary"
              onClick={() => setViewState("loading")}
            >
              Show Loading
            </Button>

            <Button
              variant="danger"
              onClick={() => setViewState("error")}
            >
              Show Error
            </Button>
          </div>
        </section>

        {/* Results count */}
        <p className="mb-5 mt-8 font-medium text-slate-600">
          Showing {sortedOpportunities.length} opportunities
        </p>

        {/* Loading, error or opportunity list */}
        {viewState === "loading" ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-700"></div>

            <h3 className="text-xl font-bold text-slate-800">
              Loading opportunities...
            </h3>

            <p className="mt-2 text-slate-500">
              Please wait while we prepare the opportunities.
            </p>
          </div>
        ) : viewState === "error" ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
            <h3 className="text-xl font-bold text-red-700">
              Something went wrong!
            </h3>

            <p className="mt-2 text-red-600">
              We could not display the opportunities. Please try again.
            </p>

            <div className="mt-5">
              <Button onClick={() => setViewState("normal")}>
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <OpportunityList
            opportunities={sortedOpportunities}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onReset={handleReset}
          />
        )}

      </div>
    </main>
  )
}

export default App
