import React, { useState } from "react"
import { Send, CheckCircle, AlertCircle } from "@lucide/astro"

interface FormData {
  email: string
  message: string
}

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function ContactForm(props: Props) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide"
    }

    if (!formData.message.trim()) {
      newErrors.message = "La description du projet est requise"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSubmitStatus("success")
      setFormData({
        email: "",
        message: "",
      })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section className="pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Démarrons votre projet</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Remplissez ce formulaire et nous vous recontacterons dans les 24 heures pour discuter de votre projet
          </p>
        </div>

        <div className="p-8 bg-white shadow-xl rounded-lg">
          {submitStatus === "success" && (
            <div className="mb-8 p-4 bg-teal-50 border border-teal-200 rounded-lg flex items-center">
              <div>
                <h3 className="font-medium text-teal-800">Message envoyé avec succès !</h3>
                <p className="text-teal-700 text-sm">Nous vous recontacterons dans les 24 heures.</p>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <div>
                <h3 className="font-medium text-red-800">Erreur lors de l'envoi</h3>
                <p className="text-red-700 text-sm">Veuillez réessayer ou nous contacter directement.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-teal-800 rounded-full mr-2">
                  1
                </span>
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-200`}
                    placeholder="votre@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-teal-800 rounded-full mr-2">
                  2
                </span>
                Détails du projet
              </h3>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Description du projet *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-200`}
                  placeholder="Décrivez votre projet, vos objectifs et vos besoins spécifiques…"
                  rows={5}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white font-medium rounded-md focus:outline-none focus:ring focus:ring-teal-200 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    Envoyer ma demande
                  </>
                )}
              </button>
              <p className="text-center text-sm text-gray-500 mt-3">
                Nous nous engageons à vous répondre dans les 24 heures
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}