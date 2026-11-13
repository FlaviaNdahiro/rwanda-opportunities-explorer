
import OpportunityCard from "./OpportunityCard" 

function OpportunityList({ opportunities, savedIds, onToggleSave }) {
  if (opportunities.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="text-xl font-bold text-slate-800">
          No opportunities found
        </h3>

        <p className="mt-2 text-slate-500">
          Try changing your search or filters to find opportunities.
        </p>
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
