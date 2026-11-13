
import { useState } from "react"
import Button from "./Button"

function AddOpportunityForm({ onAddOpportunity }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Technology",
    city: "",
    date: "",
    capacity: "",
    price: "",
    description: "",
  })

  const [error, setError] = useState("")

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (
      !formData.title.trim() ||
      !formData.city.trim() ||
      !formData.date ||
      !formData.description.trim()
    ) {
      setError("Please fill in all required fields.")
      return
    }

    if (formData.date < new Date().toLocaleDateString("en-CA")) {
      setError("Please select a valid future date.")
      return
    }

    if (
      formData.capacity === "" ||
      Number(formData.capacity) < 0 ||
      !Number.isInteger(Number(formData.capacity))
    ) {
      setError("Capacity must be a whole number of 0 or more.")
      return
    }

    if (
      formData.price === "" ||
      !Number.isFinite(Number(formData.price)) ||
      Number(formData.price) < 0
    ) {
      setError("Price must be 0 or more.")
      return
    }

    const newOpportunity = {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      category: formData.category,
      city: formData.city.trim(),
      date: formData.date,
      description: formData.description.trim(),
      capacity: Number(formData.capacity),
      availableSeats: Number(formData.capacity),
      price: Number(formData.price),
      featured: false,
    }

    onAddOpportunity(newOpportunity)
    handleClear()
  }

  function handleClear() {
    setFormData({
      title: "",
      category: "Technology",
      city: "",
      date: "",
      capacity: "",
      price: "",
      description: "",
    })

    setError("")
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Add a New Opportunity
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Share a workshop, course or community activity.
        </p>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">

        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-semibold">
            Opportunity title *
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. React Workshop"
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

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

        <div>
          <label htmlFor="city" className="mb-2 block text-sm font-semibold">
            City *
          </label>
          <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g. Kigali"
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="date" className="mb-2 block text-sm font-semibold">
            Date *
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toLocaleDateString("en-CA")}
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

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
            placeholder="e.g. 30"
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

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
            placeholder="e.g. 5000"
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

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
            placeholder="Describe this opportunity..."
            className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-wrap gap-3 md:col-span-2">
          <Button type="submit">
            Add Opportunity
          </Button>

          <Button type="button" variant="secondary" onClick={handleClear}>
            Clear Form
          </Button>
        </div>
      </form>
    </section>
  )
}

export default AddOpportunityForm
