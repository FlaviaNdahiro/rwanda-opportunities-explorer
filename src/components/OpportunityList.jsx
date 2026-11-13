
import OpportunityCard from "./OpportunityCard"
import Button from "./Button"

function OpportunityList({
  opportunities,
  savedIds,
  onToggleSave,
  onReset,
}) {
  if (opportunities.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
        <div className="mb-4 text-5xl">🔍</div>

        <h3 className="text-xl font-bold text-slate-800">
          No opportunities found
        </h3>

        <p className="mx-auto mt-2 max-w-md text-slate-500">
          We couldn't find any opportunities matching your search or filters.
          Try different keywords or reset your filters.
        </p>

        <div className="mt-6">
          <Button onClick={onReset}>
            Reset Filters
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          isSaved={savedIds.includes(opportunity.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  )
}

export default OpportunityList
