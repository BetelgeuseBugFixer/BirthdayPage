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
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-purple-100 to-teal-100 dark:from-rose-950 dark:via-purple-900 dark:to-teal-950 p-4 transition-colors duration-200">
            <div
                className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-100 dark:border-slate-700">

                {view === "info" ? (
                    <div className="space-y-10 md:space-y-14">

                        {/* HEADER WITH PHOTOS */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            {/* Left Photo - Replace src with your image path (e.g., "/photo1.jpg") */}
                            <div
                                className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-amber-100 dark:border-amber-900 shadow-md flex-shrink-0 bg-slate-200">
                                <img src="/left.jpeg" alt="Janni" className="w-full h-full object-cover object-center"/>
                            </div>

                            <div className="text-center flex-1">
                                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                                    Einladung zum 60.
                                </h1>
                                <p className="text-amber-600 dark:text-amber-400 text-lg md:text-xl mt-3 font-medium">
                                    Feiere einen besonderen Abend mit mir!
                                </p>
                            </div>

                            <div
                                className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-amber-100 dark:border-amber-900 shadow-md flex-shrink-0 bg-slate-200">
                                <img src="/right.jpeg" alt="Janni"
                                     className="w-full h-full object-cover object-center"/>
                            </div>
                        </div>

                        <div
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 space-y-6 md:space-y-8 leading-relaxed text-center md:text-left">
                            <p>
                                Liebe Freunde, liebe Familie!
                            </p>
                            <p>
                                Mein <strong className="text-slate-800 dark:text-white">60. Geburtstag</strong> steht
                                vor der Tür und das möchte ich gemeinsam mit euch feiern!
                                Am <strong className="text-amber-600 dark:text-amber-400">16. Oktober</strong> lade ich
                                euch herzlich ins
                                <strong className="text-slate-800 dark:text-white"> „Gasthaus“ in Bad Tölz</strong> ein.
                                Los geht’s ab <strong className="text-slate-800 dark:text-white">19:00 Uhr</strong>.
                                Erlebt mit mir einen Abend voller Tanz, gutem Essen, schöner Gespräche und feiert unsere
                                Freundschaft.
                            </p>
                            <p>
                                Ich würde mich außerdem riesig freuen, wenn jede*r von euch ein <strong
                                className="text-slate-800 dark:text-white">Foto mitbringt</strong>,
                                das uns zusammen zeigt – als schöne Erinnerung an die gemeinsamen Momente.
                            </p>

                            {/* Infobox */}
                            <div
                                className="bg-slate-50 dark:bg-slate-700/40 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-600 shadow-inner text-left">
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
                                                className="text-amber-600 dark:text-amber-400 hover:text-amber-700 underline decoration-amber-300 ml-1 transition-colors"
                                            >
                                                Bahnhofstraße 2, 83646 Bad Tölz
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
                                    <li className="flex items-start">
                                        <span className="mr-4 text-2xl">🎁</span>
                                        <span><strong>Geschenk:</strong> Kein Stress: es gibt eine Box, wo ihr was rein werfen könnt, damit ich mir einen Herzenswunsch erfüllen kann.</span>
                                    </li>
                                    <li className="flex items-start text-amber-600 dark:text-amber-400 font-bold">
                                        <span className="mr-4 text-2xl">⏳</span>
                                        <span><strong>Rückmeldung:</strong> Bitte bis zum 30. September</span>
                                    </li>
                                </ul>
                            </div>

                            <p className="text-center font-bold pt-6 text-xl md:text-2xl text-slate-800 dark:text-white">
                                Ich freue mich auf einen wunderschönen Abend mit euch!
                            </p>
                            <button
                                onClick={() => setView("form")}
                                className="w-full text-lg md:text-xl bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Zu/Absage
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-xl mx-auto">
                        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-8 text-center">
                            Zu/Absage
                        </h1>

                        {status === "success" ? (
                            <div
                                className="text-center p-8 bg-green-50 dark:bg-green-900/30 rounded-2xl border border-green-100 dark:border-green-800 space-y-6">
                                <p className="text-green-700 dark:text-green-400 text-xl font-bold">
                                    {formData.attending ? "Vielen Dank, ich freue mich auf dich! 🎉" : "Schade, dass du nicht dabei bist! 😢"}
                                </p>

                                {/* Flex container to stack the buttons vertically with a gap */}
                                <div className="flex flex-col items-center justify-center gap-5 mt-4">
                                    <button
                                        onClick={() => {
                                            // Reset status and form data to show a clean form
                                            setStatus("idle");
                                            setFormData({
                                                guest_name: "",
                                                attending: true,
                                                plus_one: 0,
                                                bringing_food: "",
                                                hp_field: "",
                                            });
                                        }}
                                        className="text-amber-600 dark:text-amber-400 hover:text-amber-700 font-semibold transition-colors bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-lg"
                                    >
                                        + Für weitere Person zu- oder absagen
                                    </button>

                                    <button
                                        onClick={() => {
                                            setView("info");
                                            setStatus("idle");
                                            setFormData({
                                                guest_name: "",
                                                attending: true,
                                                plus_one: 0,
                                                bringing_food: "",
                                                hp_field: "",
                                            });
                                        }
                                        }
                                        className="text-amber-600 dark:text-amber-400 hover:text-amber-700 font-semibold transition-colors bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-lg"
                                    >
                                        ← Zurück zur Übersicht
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label
                                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        Dein Name
                                    </label>
                                    <input
                                        type="text"
                                        name="guest_name"
                                        required
                                        value={formData.guest_name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                        placeholder="Max Mustermann"
                                    />
                                </div>

                                <div
                                    className="flex items-center space-x-3 py-3 px-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600">
                                    <input
                                        type="checkbox"
                                        name="attending"
                                        checked={formData.attending}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-amber-600 rounded border-slate-300 dark:border-slate-500 focus:ring-amber-500"
                                    />
                                    <label className="text-base font-semibold text-slate-700 dark:text-slate-200">
                                        Ich bin dabei!
                                    </label>
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        Anzahl Begleitpersonen
                                    </label>
                                    <input
                                        type="number"
                                        name="plus_one"
                                        min="0"
                                        value={formData.plus_one}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        Musikwünsche (optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="bringing_food"
                                        value={formData.bringing_food}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                        placeholder="Z.B. Abba: Gimme! Gimme! Gimme!"
                                    />
                                </div>

                                <div className="hidden" aria-hidden="true">
                                    <input type="text" name="hp_field" value={formData.hp_field} onChange={handleChange}
                                           tabIndex={-1}/>
                                </div>

                                <div className="pt-6 space-y-4">
                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md disabled:opacity-50"
                                    >
                                        {status === "loading" ? "Wird gesendet..." : "Antwort abschicken"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setView("info")}
                                        className="w-full bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold py-3 px-4 rounded-xl transition-colors"
                                    >
                                        Abbrechen & Zurück
                                    </button>
                                </div>

                                {status === "error" && (
                                    <p className="text-red-600 dark:text-red-400 text-sm text-center font-medium mt-2">
                                        Es gab einen Fehler. Bitte versuche es später erneut.
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}