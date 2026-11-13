
import Button from "./Button"
import Badge from "./Badge"

function OpportunityCard({ opportunity, isSaved, onToggleSave }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge color="blue">{opportunity.category}</Badge>

        {opportunity.featured && (
          <Badge color="yellow">Featured</Badge>
        )}

        {opportunity.price === 0 && (
          <Badge color="green">Free</Badge>
        )}

        {opportunity.availableSeats === 0 && (
          <Badge color="red">Fully booked</Badge>
        )}
      </div>

      <h3 className="text-lg font-bold text-slate-900">
        {opportunity.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {opportunity.description}
      </p>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>📍 {opportunity.city}</p>
        <p>📅 {opportunity.date}</p>
        <p>👥 {opportunity.availableSeats} places available</p>
        <p>
          💰 {opportunity.price === 0
            ? "Free"
            : `${opportunity.price.toLocaleString()} RWF`}
        </p>
      </div>

      <div className="mt-5">
        <Button
          variant={isSaved ? "secondary" : "primary"}
          onClick={() => onToggleSave(opportunity.id)}
        >
          {isSaved ? "Unsave" : "Save Opportunity"}
        </Button>
      </div>
    </article>
  )
}

export default OpportunityCard
