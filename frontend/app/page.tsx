"use client";

import {useState} from "react";

export default function Home() {
    const [view, setView] = useState<"info" | "form">("info");
    const [formData, setFormData] = useState({
        guest_name: "",
        attending: true,
        plus_one: 0,
        bringing_food: "",
        hp_field: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("https://birthdaypage-production.up.railway.app/api/rsvp", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
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
        const {name, value, type} = e.target;
        const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <main
            className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-200">
            <div
                className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">

                {view === "info" ? (
                    <div className="space-y-8 md:space-y-12">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white text-center">
                                Einladung zum 60. Geburtstag
                            </h1>
                            <p className="text-center text-gray-500 dark:text-gray-400 text-lg md:text-xl mt-3">
                                Feiere einen besonderen Abend mit mir!
                            </p>
                        </div>

                        <div
                            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 space-y-6 md:space-y-8 leading-relaxed">
                            <p>
                                Liebe Freunde, liebe Familie!
                            </p>
                            <p>
                                Mein <strong className="text-gray-900 dark:text-white">60ter Geburtstag</strong> steht
                                vor der Tür und das möchte ich gemeinsam mit euch feiern!
                                Am <strong className="text-blue-600 dark:text-blue-400">16. Oktober</strong> lade ich
                                euch herzlich ins
                                <strong className="text-gray-900 dark:text-white"> „Gasthaus“ in Bad Tölz</strong> ein.
                                Los geht’s ab <strong className="text-gray-900 dark:text-white">19:00 Uhr</strong>.
                                Erlebt mit mir einen Abend voller Tanz, gutem Essen, schöner Gespräche und feiert unsere
                                Freundschaft.
                            </p>
                            <p>
                                Ich würde mich ausserdem riesig freuen, wenn jede*r von euch ein <strong
                                className="text-gray-900 dark:text-white">Foto mitbringt</strong>,
                                das uns gemeinsam zeigt – als schöne Erinnerung an die gemeinsamen Momente.
                            </p>

                            {/* Infobox with Bullet Points */}
                            <div
                                className="bg-gray-100 dark:bg-gray-700/50 p-6 md:p-10 rounded-xl border border-gray-200 dark:border-gray-600 shadow-inner">
                                <ul className="space-y-5 md:space-y-6">
                                    <li className="flex items-start">
                                        <span className="mr-4 text-2xl">📅</span>
                                        <span><strong>Wann:</strong> 16. Oktober, los geht's ab 19:00 Uhr</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-4 text-2xl">📍</span>
                                        <span>
                                                <strong>Wo:</strong> „Gasthaus“
                                                <a
                                                    href="https://maps.app.goo.gl/tTZqZ3cwzskkzN5N6"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                                                >
                                                    Bahnhofstrasse 2, 83646 Bad Tölz
                                                </a>
                                            </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-4 text-2xl">👔</span>
                                        <span><strong>Dresscode:</strong> Sei ganz Du selbst!</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-4 text-2xl">📸</span>
                                        <span><strong>Mitbringen:</strong> Ein Foto, das uns gemeinsam zeigt</span>
                                    </li>
                                    <li className="flex items-start text-blue-600 dark:text-blue-400 font-bold">
                                        <span className="mr-4 text-2xl">⏳</span>
                                        <span><strong>Rückmeldung:</strong> Bitte bis zum 30. September</span>
                                    </li>
                                </ul>
                            </div>

                            <p className="text-center font-bold pt-4 text-xl md:text-2xl text-gray-900 dark:text-white">
                                Ich freue mich auf einen unvergesslichen Abend mit euch!
                            </p>
                            <button
                                onClick={() => setView("form")}
                                className="w-full text-lg md:text-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg"
                            >
                                Zur Anmeldung
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                            Anmeldung
                        </h1>

                        {status === "success" ? (
                            <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg space-y-4">
                                <p className="text-green-700 dark:text-green-400 font-medium">
                                    Vielen Dank, ich freue mich auf dich
                                </p>
                                <button
                                    onClick={() => setView("info")}
                                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                                >
                                    Zurück zur Übersicht
                                </button>
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

                                {/* hp field */}
                                <div className="hidden" aria-hidden="true">
                                    <input
                                        type="text"
                                        name="hp_field"
                                        value={formData.hp_field}
                                        onChange={handleChange}
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="pt-4 space-y-3">
                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {status === "loading" ? "Submitting..." : "Send RSVP"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setView("info")}
                                        className="w-full bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Zurück zur Übersicht
                                    </button>
                                </div>

                                {status === "error" && (
                                    <p className="text-red-600 dark:text-red-400 text-sm text-center mt-2">
                                        Something went wrong. Please check your backend connection.
                                    </p>
                                )}
                            </form>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}