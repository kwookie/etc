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
    <div className="container my-6">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box">
            <h1 className="title has-text-blue">Trainingsvolumen Rechner</h1>

            <div className="field">
              <label className="label">Aktuelle Stunden</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  value={currentHours}
                  onChange={(e) => setCurrentHours(Number(e.target.value))}
                  placeholder="Stunden"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Aktuelle Minuten</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  value={currentMinutes}
                  onChange={(e) => setCurrentMinutes(Number(e.target.value))}
                  placeholder="Minuten"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Langer Lauf (Minuten)</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  value={currentLongRun}
                  onChange={(e) => setCurrentLongRun(Number(e.target.value))}
                  placeholder="Langer Lauf (Minuten)"
                />
              </div>
            </div>

            <h2 className="subtitle">Prozentuale Änderungen pro Woche</h2>
            <div className="columns is-multiline">
              {volumeChanges.map((_, i) => (
                <div key={i} className="column is-half">
                  <div className="field">
                    <label className="label">Woche {i + 1}</label>
                    <div className="control">
                      <input
                        className="input"
                        type="number"
                        value={volumeChanges[i]}
                        onChange={(e) => {
                          const newChanges = [...volumeChanges];
                          newChanges[i] = Number(e.target.value);
                          setVolumeChanges(newChanges);
                        }}
                        placeholder="Volumen %"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        type="number"
                        value={longRunChanges[i]}
                        onChange={(e) => {
                          const newChanges = [...longRunChanges];
                          newChanges[i] = Number(e.target.value);
                          setLongRunChanges(newChanges);
                        }}
                        placeholder="Langer Lauf %"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="buttons is-centered">
              <button
                className="button is-primary"
                onClick={calculateVolumes}
              >
                Berechnen
              </button>
              <button
                className="button is-light"
                onClick={resetForm}
              >
                Zurücksetzen
              </button>
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="box">
            <h2 className="title is-4 has-text-blue">Ergebnisse</h2>
            {results.length > 0 ? (
              <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>Woche</th>
                    <th>Volumen (h:min)</th>
                    <th>Langer Lauf (min)</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.week}>
                      <td>{r.week}</td>
                      <td>
                        {Math.floor(r.totalMinutes / 60)}h {r.totalMinutes % 60}min
                      </td>
                      <td>{r.longRunMinutes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="has-text-grey">Noch keine Berechnung durchgeführt.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
