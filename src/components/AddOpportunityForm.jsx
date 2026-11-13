
import { useState } from "react"
import Button from "./Button"

function AddOpportunityForm({ onAddOpportunity }) {
  const initialFormData = {
    title: "",
    category: "Technology",
    city: "",
    date: "",
    capacity: "",
    price: "",
    description: "",
  }

  const [formData, setFormData] = useState(initialFormData)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Get today's date in YYYY-MM-DD format
  function getTodayDate() {
    const today = new Date()

    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  }

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))

    setError("")
    setSuccess("")
  }

  // Clear the form
  function handleClear() {
    setFormData(initialFormData)
    setError("")
    setSuccess("")
  }

  // Submit the form
  function handleSubmit(e) {
    e.preventDefault()

    setError("")
    setSuccess("")

    // Validate required text fields
    if (
      !formData.title.trim() ||
      !formData.city.trim() ||
      !formData.date ||
      !formData.description.trim()
    ) {
      setError("Please fill in all required fields.")
      return
    }

    // Validate date
    if (formData.date < getTodayDate()) {
      setError("Please select today or a future date.")
      return
    }

    // Validate capacity
    const capacity = Number(formData.capacity)

    if (
      formData.capacity === "" ||
      !Number.isInteger(capacity) ||
      capacity < 0
    ) {
      setError("Capacity must be a whole number of 0 or more.")
      return
    }

    // Validate price
    const price = Number(formData.price)

    if (
      formData.price === "" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      setError("Price must be 0 or more.")
      return
    }

    // Create the new opportunity
    const newOpportunity = {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      category: formData.category,
      city: formData.city.trim(),
      date: formData.date,
      description: formData.description.trim(),
      capacity: capacity,
      availableSeats: capacity,
      price: price,
      featured: false,
      features: false,
    }

    // Add the opportunity to the application
    onAddOpportunity(newOpportunity)

    // Clear the form and show success message
    setFormData(initialFormData)
    setSuccess("Opportunity added successfully!")

  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Form heading */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Add a New Opportunity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Share a workshop, course or community activity.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div
          className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Success message */}
      {success && (
        <div
          className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-700"
          role="status"
        >
          ✓ {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >

        {/* Title */}
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-semibold">
            Opportunity title *
          </label>

          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g. React Workshop"
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-semibold">
            Category *
          </label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Community">Community</option>
            <option value="Education">Education</option>
            <option value="Career">Career</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="mb-2 block text-sm font-semibold">
            City *
          </label>

          <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="e.g. Kigali"
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="mb-2 block text-sm font-semibold">
            Date *
          </label>

          <input
            id="date"
            name="date"
            type="date"
            min={getTodayDate()}
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Capacity */}
        <div>
          <label htmlFor="capacity" className="mb-2 block text-sm font-semibold">
            Capacity *
          </label>

          <input
            id="capacity"
            name="capacity"
            type="number"
            min="0"
            step="1"
            value={formData.capacity}
            onChange={handleChange}
            required
            placeholder="e.g. 30"
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="mb-2 block text-sm font-semibold">
            Price (RWF) *
          </label>

          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="any"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="e.g. 5000"
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="mb-2 block text-sm font-semibold">
            Description *
          </label>

          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe this opportunity..."
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Form buttons */}
        <div className="flex flex-wrap gap-3 md:col-span-2">
          <Button type="submit">
            Add Opportunity
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleClear}
          >
            Clear Form
          </Button>
        </div>

      </form>
    </section>
  )
}

export default AddOpportunityForm
