
import Button from "./Button"
import Badge from "./Badge"

function OpportunityCard({ opportunity, isSaved, onToggleSave }) {
  const formattedDate = new Date(
    `${opportunity.date}T00:00:00`
  ).toLocaleDateString("en-RW", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Opportunity badges */}
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

      {/* Opportunity information */}
      <h3 className="text-lg font-bold text-slate-900">
        {opportunity.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {opportunity.description}
      </p>

      {/* Opportunity details */}
      <div className="mt-5 flex-1 space-y-3 border-t border-slate-100 pt-4 text-sm text-slate-600">
        <p>
          <span className="mr-2">📍</span>
          {opportunity.city}
        </p>

        <p>
          <span className="mr-2">📅</span>
          {formattedDate}
        </p>

        <p>
          <span className="mr-2">👥</span>
          {opportunity.availableSeats} of {opportunity.capacity} places available
        </p>

        <p className="font-semibold text-slate-800">
          <span className="mr-2">💰</span>
          {opportunity.price === 0
            ? "Free"
            : `${opportunity.price.toLocaleString()} RWF`}
        </p>
      </div>

      {/* Save button */}
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
