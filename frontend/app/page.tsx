"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    guest_name: "",
    attending: true,
    plus_one: 0,
    bringing_food: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("http://birthdaypage-production.up.railway.app/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          plus_one: Number(formData.plus_one),
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Janni's Geburtstagsfeier
        </h1>

        {status === "success" ? (
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <p className="text-green-700 dark:text-green-400 font-medium">
              Vielen Dank, ich freue mich auf dich
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Guest Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                name="guest_name"
                required
                value={formData.guest_name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Janni"
              />
            </div>

            {/* Attending Checkbox */}
            <div className="flex items-center space-x-3 py-2">
              <input
                type="checkbox"
                name="attending"
                checked={formData.attending}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Ich bin dabei
              </label>
            </div>

            {/* Plus Ones */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Begleitung
              </label>
              <input
                type="number"
                name="plus_one"
                min="0"
                value={formData.plus_one}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Bringing Food */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ich bringe Essen mit
              </label>
              <input
                type="text"
                name="bringing_food"
                value={formData.bringing_food}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Wurstsalat"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Submitting..." : "Send RSVP"}
            </button>

            {status === "error" && (
              <p className="text-red-600 dark:text-red-400 text-sm text-center mt-2">
                Something went wrong. Please check your backend connection.
              </p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}