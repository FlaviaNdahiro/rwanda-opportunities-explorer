
import { useState } from "react"
import OpportunityList from "./components/OpportunityList"
import OpportunityFilters from "./components/OpportunityFilters"
import AddOpportunityForm from "./components/AddOpportunityForm"
import seedOpportunities from "./data/seedOpportunities"

function App() {
  const [opportunities, setOpportunities] = useState(seedOpportunities)
  const [savedIds, setSavedIds] = useState([])

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sortBy, setSortBy] = useState("date")
  const [availableOnly, setAvailableOnly] = useState(false)
  const [savedOnly, setSavedOnly] = useState(false)

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

  // Reset all filters
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

  // Sort opportunities without changing the original array
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

        {/* Results count */}
        <p className="mb-5 mt-8 font-medium text-slate-600">
          Showing {sortedOpportunities.length} opportunities
        </p>

        {/* Opportunity cards */}
        <OpportunityList
          opportunities={sortedOpportunities}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
        />

      </div>
    </main>
  )
}

export default App
