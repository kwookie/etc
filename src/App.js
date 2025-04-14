import React, { useState } from "react";

export default function TrainingsvolumenRechner() {
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentLongRun, setCurrentLongRun] = useState(0);
  const [volumeChanges, setVolumeChanges] = useState(Array(12).fill(0));
  const [longRunChanges, setLongRunChanges] = useState(Array(12).fill(0));
  const [results, setResults] = useState([]);

  const calculateVolumes = () => {
    const newResults = [];
    let totalMinutes = currentHours * 60 + currentMinutes;
    let longRunMinutes = currentLongRun;

    for (let i = 0; i < 12; i++) {
      totalMinutes = totalMinutes * (1 + volumeChanges[i] / 100);
      longRunMinutes = longRunMinutes * (1 + longRunChanges[i] / 100);
      newResults.push({
        week: i + 1,
        totalMinutes: Math.round(totalMinutes),
        longRunMinutes: Math.round(longRunMinutes),
      });
    }
    setResults(newResults);
  };

  const resetForm = () => {
    setCurrentHours(0);
    setCurrentMinutes(0);
    setCurrentLongRun(0);
    setVolumeChanges(Array(12).fill(0));
    setLongRunChanges(Array(12).fill(0));
    setResults([]);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 max-w-6xl mx-auto font-sans">
      <div className="flex-1 space-y-6 bg-white shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-blue-800">Trainingsvolumen Rechner</h1>

        <div className="grid grid-cols-2 gap-4">
          <label className="font-medium">Aktuelle Stunden:</label>
          <input
            type="number"
            value={currentHours}
            onChange={(e) => setCurrentHours(Number(e.target.value))}
            className="border rounded-md p-3 text-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />

          <label className="font-medium">Aktuelle Minuten:</label>
          <input
            type="number"
            value={currentMinutes}
            onChange={(e) => setCurrentMinutes(Number(e.target.value))}
            className="border rounded-md p-3 text-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />

          <label className="font-medium">Langer Lauf (Minuten):</label>
          <input
            type="number"
            value={currentLongRun}
            onChange={(e) => setCurrentLongRun(Number(e.target.value))}
            className="border rounded-md p-3 text-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Prozentuale Änderungen pro Woche</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {volumeChanges.map((_, i) => (
              <div key={i} className="text-sm space-y-2">
                <label className="block font-semibold text-blue-700">Woche {i + 1}</label>
                <input
                  type="number"
                  value={volumeChanges[i]}
                  onChange={(e) => {
                    const newChanges = [...volumeChanges];
                    newChanges[i] = Number(e.target.value);
                    setVolumeChanges(newChanges);
                  }}
                  placeholder="Volumen %"
                  className="border rounded-md p-2 text-base w-full shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
                <input
                  type="number"
                  value={longRunChanges[i]}
                  onChange={(e) => {
                    const newChanges = [...longRunChanges];
                    newChanges[i] = Number(e.target.value);
                    setLongRunChanges(newChanges);
                  }}
                  placeholder="Langer Lauf %"
                  className="border rounded-md p-2 text-base w-full shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={calculateVolumes}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 text-lg font-medium"
          >
            Berechnen
          </button>
          <button
            onClick={resetForm}
            className="bg-gray-300 text-black px-6 py-3 rounded-md hover:bg-gray-400 text-lg font-medium"
          >
            Zurücksetzen
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white shadow-md rounded-xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Ergebnisse</h2>
        {results.length > 0 ? (
          <table className="table-auto w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">Woche</th>
                <th className="border px-3 py-2">Volumen (h:min)</th>
                <th className="border px-3 py-2">Langer Lauf (min)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.week} className="text-center">
                  <td className="border px-3 py-1">{r.week}</td>
                  <td className="border px-3 py-1">
                    {Math.floor(r.totalMinutes / 60)}h {r.totalMinutes % 60}min
                  </td>
                  <td className="border px-3 py-1">{r.longRunMinutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 italic">Noch keine Berechnung durchgeführt.</p>
        )}
      </div>
    </div>
  );
}
