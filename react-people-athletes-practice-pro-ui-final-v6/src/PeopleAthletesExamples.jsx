// src/PeopleAthletesExamples.jsx
//
// People & Athletes – FULL Lecture 9 Test Practice (Professional UI)
// ------------------------------------------------------------------
// This file is your main "test sandbox".
//
// PATTERNS INCLUDED (all exam-style):
//   1. GET list of people            -> fetch("/people.json") + map()
//   2. GET list of athletes          -> fetch("/athletes.json") + map()
//   3. POST person (simulated)       -> add to state (no DB)
//   4. PUT/PATCH athlete (simulated) -> update sport using map()
//   5. DELETE person (simulated)     -> remove by id using filter()
//   6. GET one athlete by id         -> find() after list is loaded
//   7. Filter/Search people          -> filter() on name
//   8. Broken fetch                  -> error handling pattern
//
// HOW TO TRIM THIS FOR THE REAL TEST:
//   - Keep just ONE or TWO sections that match the question.
//   - Remove extra nav buttons and the matching JSX blocks.
//   - Scroll down and delete unused component functions.
//   - Update filenames (people.json -> students.json, etc.) and field names
//     where you see "CHANGE HERE FOR EXAM".
//

import { useEffect, useState } from "react";

const PEOPLE_STORAGE_KEY = "people-data";

// Load people list:
// 1. Try localStorage first (so added people survive refresh).
// 2. If nothing stored yet, fall back to /people.json and then save it.
function loadPeopleData() {
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(PEOPLE_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return Promise.resolve(parsed);
        }
      } catch (e) {
        // If stored JSON is broken, ignore and move on to fetch.
      }
    }
  }

  // Fallback: fetch from the original JSON file.
  return fetch("/people.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to load people.json (status " + res.status + ")");
      }
      return res.json();
    })
    .then((data) => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(PEOPLE_STORAGE_KEY, JSON.stringify(data));
      }
      return data;
    });
}

// Save updated people list back into localStorage.
function savePeopleData(nextPeople) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(PEOPLE_STORAGE_KEY, JSON.stringify(nextPeople));
  }
}

const ATHLETES_STORAGE_KEY = "athletes-data";

// Load athletes list in the same way as people:
// 1. Try localStorage first.
// 2. Fall back to /athletes.json and then save it.
function loadAthleteData() {
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(ATHLETES_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return Promise.resolve(parsed);
        }
      } catch (e) {
        // Ignore and fall through to the fetch below.
      }
    }
  }

  return fetch("/athletes.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to load athletes.json (status " + res.status + ")");
      }
      return res.json();
    })
    .then((data) => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(ATHLETES_STORAGE_KEY, JSON.stringify(data));
      }
      return data;
    });
}

// Save updated athlete list back into localStorage.
function saveAthleteData(nextAthletes) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ATHLETES_STORAGE_KEY, JSON.stringify(nextAthletes));
  }
}

// Simple reusable Card wrapper to keep layout consistent

function Card({ title, description, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </section>
  );
}

export default function PeopleAthletesExamples() {
  // Which example/tab is active.
  const [active, setActive] = useState("people-get");
  // Dark mode flag. Not needed in an exam answer, but useful for practice.
  const [dark, setDark] = useState(false);

  return (
    <div className={"app-shell" + (dark ? " dark" : "")}>
      {/* HEADER */}
      <header className="app-header">
        <h1 className="app-header-title">Test</h1>

        {/* Dark mode toggle. You do not need this for the exam. */}
        <button
          type="button"
          onClick={() => setDark((prev) => !prev)}
        >
          {dark ? "Light mode" : "Dark mode"}
        </button>

        <p className="app-header-subtitle">
          Web Component Development – JSON / REST practice
        </p>
      </header>

      {/* MAIN CONTENT */}
      <main className="app-main">
        <h2 className="app-main-title">
          Choose an example from the nav and adapt it for the test question.
        </h2>

        {/* NAVIGATION BAR */}
        {/* In the exam you can DELETE buttons and blocks you don't need. */}
        <nav className="nav-bar">
          <button
            type="button"
            className={"nav-button" + (active === "people-get" ? " active" : "")}
            onClick={() => setActive("people-get")}
          >
            <span className="icon">👤</span>
            GET People (list)
          </button>

          <button
            type="button"
            className={"nav-button" + (active === "athletes-get" ? " active" : "")}
            onClick={() => setActive("athletes-get")}
          >
            <span className="icon">🏃</span>
            GET Athletes (list)
          </button>

          <button
            type="button"
            className={"nav-button" + (active === "people-post" ? " active" : "")}
            onClick={() => setActive("people-post")}
          >
            <span className="icon">➕</span>
            POST Person (add)
          </button>

          <button
            type="button"
            className={"nav-button" + (active === "athlete-post" ? " active" : "")}
            onClick={() => setActive("athlete-post")}
          >
            POST Athlete (add)
          </button>

          <button
            type="button"
            className={"nav-button" + (active === "athlete-put" ? " active" : "")}
            onClick={() => setActive("athlete-put")}
          >
            <span className="icon">✏️</span>
            PUT/PATCH Athlete (edit)
          </button>

          <button
            type="button"
            className={"nav-button" + (active === "people-delete" ? " active" : "")}
            onClick={() => setActive("people-delete")}
          >
            <span className="icon">🗑️</span>
            DELETE Person
          </button>

          <button
            type="button"
            className={"nav-button" + (active === "athlete-delete" ? " active" : "")}
            onClick={() => setActive("athlete-delete")}
          >
            DELETE Athlete
          </button>

          <button
            type="button"
            className={"nav-button" + (active === "athlete-one" ? " active" : "")}
            onClick={() => setActive("athlete-one")}
          >
            <span className="icon">👀</span>
            GET one Athlete
          </button>

          <button
            type="button"
            className={"nav-button" + (active === "people-search" ? " active" : "")}
            onClick={() => setActive("people-search")}
          >
            <span className="icon">🔍</span>
            Filter/Search People
          </button>

          <button
            type="button"
            className={"nav-button" + (active === "broken-fetch" ? " active" : "")}
            onClick={() => setActive("broken-fetch")}
          >
            <span className="icon">⚠️</span>
            Error Handling Example
          </button>

          <button
            type="button"
            className={"nav-button" + (active === "basics" ? " active" : "")}
            onClick={() => setActive("basics")}
          >
            React basics
          </button>

          <button
            type="button"
            className={"nav-button" + (active === "react-extras" ? " active" : "")}
            onClick={() => setActive("react-extras")}
          >
            React extras (Lect 1–8)
          </button>

          <button
            type="button"
            className={"nav-button" + (active === "dataset" ? " active" : "")}
            onClick={() => setActive("dataset")}
          >
            Generic JSON dataset
          </button>
        </nav>

        {/* CONTENT – only one card shown depending on "active" */}
        {active === "people-get" && (
          <Card
            title="GET list of people from people.json"
            description={
              <>
                Simple example of <code>fetch("/people.json")</code> inside{" "}
                <code>useEffect</code>, with loading and error handling, then
                rendering the list with <code>map()</code>.
              </>
            }
          >
            <PeopleList />
          </Card>
        )}

        {active === "athletes-get" && (
          <Card
            title="GET list of athletes from athletes.json"
            description={
              <>
                Almost identical to the people example, but reading{" "}
                <code>athletes.json</code>. In a test, this could be{" "}
                <code>players.json</code>, <code>students.json</code>, etc.
              </>
            }
          >
            <AthleteList />
          </Card>
        )}

        {active === "people-post" && (
          <Card
            title='Simulated POST – add a Person (client-side only)'
            description={
              <>
                Form that creates a new person object and appends it to state with{" "}
                <code>setPeople([...prev, newPerson])</code>. This is exactly the{" "}
                "POST pattern" without actually writing to a database.
              </>
            }
          >
            <AddPerson />
          </Card>
        )}

        {active === "athlete-post" && (
          <Card
            title="Simulated POST – add an Athlete (client-side only)"
            description={
              <>
                Same pattern as adding a person, but using the athletes data:
                a small form that builds a new object and stores it in state,
                and also in localStorage so it will survive a refresh.
              </>
            }
          >
            <AddAthlete />
          </Card>
        )}

        {active === "athlete-put" && (
          <Card
            title="Simulated PUT/PATCH – update an Athlete's sport"
            description={
              <>
                Uses <code>map()</code> to create a new array where only the athlete
                with a matching <code>id</code> gets a new <code>sport</code>{" "}
                value. This is the state version of an HTTP PUT/PATCH.
              </>
            }
          >
            <EditAthlete />
          </Card>
        )}

        {active === "people-delete" && (
          <Card
            title="Simulated DELETE – remove a Person by id"
            description={
              <>
                Uses <code>filter()</code> to create a list that excludes a specific{" "}
                <code>id</code>. This is the usual pattern for DELETE in React
                state.
              </>
            }
          >
            <DeletePerson />
          </Card>
        )}

        {active === "athlete-delete" && (
          <Card
            title="Simulated DELETE – remove an Athlete by id"
            description={
              <>
                Same pattern as deleting a person, but using the athletes list:
                the selected athlete is removed using <code>filter()</code> and
                the new array is saved to localStorage.
              </>
            }
          >
            <DeleteAthlete />
          </Card>
        )}

        {active === "athlete-one" && (
          <Card
            title="GET one athlete from a list (by id)"
            description={
              <>
                Shows how to pick a single athlete out of the loaded array using{" "}
                <code>find()</code>. In a test, this might be "display the details
                for player with id 2".
              </>
            }
          >
            <SingleAthleteById />
          </Card>
        )}

        {active === "people-search" && (
          <Card
            title="Filter/Search people by name"
            description={
              <>
                Demonstrates client-side filtering with <code>filter()</code> and a
                search box – useful extra array practice beyond just GET.
              </>
            }
          >
            <SearchPeople />
          </Card>
        )}

        {active === "broken-fetch" && (
          <Card
            title="Broken fetch – error handling demo"
            description={
              <>
                Intentionally calls a wrong URL to trigger an error. This shows the{" "}
                pattern of checking <code>res.ok</code> and catching failures (404,
                500, etc.).
              </>
            }
          >
            <BrokenFetchExample />
          </Card>
        )}

        {active === "basics" && (
          <Card
            title="React basics – state, events, props"
            description={
              <>
                These examples are here to remind you of earlier lectures:
                <code>useState</code>, controlled inputs, event handlers and
                passing props. They do not talk to JSON, but the patterns often
                show up in questions.
              </>
            }
          >
            <div className="card-grid">
              <div className="stack">
                {/* Simple counter using useState */}
                <BasicCounter />

                {/* Small controlled form */}
                <SimpleFormDemo />
              </div>

              <div className="stack">
                {/* Parent mapping data into child components */}
                <PropsDemo />

                {/* Search and filter example */}
                <SearchFilterDemo />

                {/* Child component choosing a value for the parent */}
                <ColourPickerDemo />
              </div>
            </div>
          </Card>
        )}

{active === "react-extras" && (
  <Card
    title="React extras – conditional rendering, effects, derived values"
    description={
      <>
        Extra examples based on lectures 1–8. These focus on patterns
        that do not use JSON: conditional rendering, derived values from
        state, lifting state up and a simple effect.
      </>
    }
  >
    <div className="card-grid">
      <div className="stack">
        {/* Example: conditional rendering with a toggle.
            In an exam, this pattern appears as
            "show or hide details when a button is pressed". */}
        <ToggleDetailsDemo />

        {/* Example: derived value based on two inputs.
            In an exam, this can appear as
            "calculate total price" or "calculate BMI" from inputs. */}
        <DerivedValueDemo />

        {/* Example: child component adding items into a list owned by the parent.
            This shows lifting state up using a callback prop. */}
        <ChildAddsItemDemo />
      </div>

      <div className="stack">
        {/* Example: simple effect with a timer.
            In an exam, useEffect may be used to update something over time. */}
        <SimpleTimerDemo />

        {/* Example: simple tabs using state and conditional rendering.
            In an exam, this could be "switch between two views when buttons are clicked". */}
        <TabsDemo />

        {/* Example: basic form validation.
            In an exam, you may be asked to disable submit until the input is valid. */}
        <ValidationDemo />
      </div>
    </div>
  </Card>
        )}


                {active === "dataset" && (
          <Card
            title="Generic JSON dataset example"
            description={
              <>
                This is a generic pattern for any array of objects in JSON. During
                a test he might give you a completely different dataset. Change the
                URL and the fields marked in comments and keep the structure.
              </>
            }
          >
            <GenericDatasetExample />
          </Card>
        )}
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        Contact: 086-1234567 • irelandhelpdesk@hotmail.co.uk
      </footer>
    </div>
  );
}

// ===================================================================
// 1. GET People – fetch("/people.json") with loading + error
// ===================================================================
function PeopleList() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPeopleData()
      .then((data) => {
        setPeople(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="status-text">Loading people...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <ul>
      {people.map((p) => (
        <li key={p.id}>
          {/* CHANGE FIELDS HERE FOR EXAM */}
          {p.name} – Age {p.age} – {p.city}
        </li>
      ))}
    </ul>
  );
}


// ===================================================================
// 2. GET Athletes – fetch("/athletes.json")
// ===================================================================
function AthleteList() {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load from localStorage if available, otherwise from athletes.json.
    loadAthleteData()
      .then((data) => {
        setAthletes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="status-text">Loading athletes...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <ul>
      {athletes.map((a) => (
        <li key={a.id}>
          {/* CHANGE FIELDS HERE FOR EXAM */}
          {a.name} – {a.sport} ({a.country})
        </li>
      ))}
    </ul>
  );
}


// ===================================================================
// 3. POST (simulated) – Add Person
// ===================================================================
function AddPerson() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  // Load initial data from localStorage or JSON file.
  useEffect(() => {
    loadPeopleData()
      .then((data) => setPeople(data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();

    // CHANGE KEYS HERE FOR EXAM if the JSON has different fields.
    const newPerson = {
      id: Date.now(),
      name,
      age: Number(age),
      city,
    };

    // Simulated POST: update React state AND localStorage.
    setPeople((prev) => {
      const updated = [...prev, newPerson];
      savePeopleData(updated); // persist so refresh keeps it
      return updated;
    });

    setName("");
    setAge("");
    setCity("");
  };

  return (
    <div className="card-grid">
      <div className="stack">
        <form onSubmit={handleAdd}>
          <label>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Age
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
          <label>
            City
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add Person</button>
        </form>
      </div>

      <div className="stack">
        <strong>Current people:</strong>
        <ul>
          {people.map((p) => (
            <li key={p.id}>
              {p.name} ({p.city})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


// ===================================================================
// 4. PUT/PATCH (simulated) – Edit Athlete sport
// ===================================================================
function EditAthlete() {
  const [athletes, setAthletes] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [editName, setEditName] = useState("");
  const [editSport, setEditSport] = useState("");
  const [editCountry, setEditCountry] = useState("");

  useEffect(() => {
    loadAthleteData()
      .then((data) => {
        setAthletes(data);
        // Preselect the first athlete if available and copy its values into the form.
        if (data.length > 0) {
          const first = data[0];
          setSelectedId(String(first.id));
          setEditName(first.name);
          setEditSport(first.sport);
          setEditCountry(first.country);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSelectChange = (e) => {
    const idValue = e.target.value;
    setSelectedId(idValue);

    // When user picks another athlete, load that athlete's current values into the inputs.
    const idNum = Number(idValue);
    const found = athletes.find((a) => a.id === idNum);
    if (found) {
      setEditName(found.name);
      setEditSport(found.sport);
      setEditCountry(found.country);
    }
  };

  const updateAthlete = (e) => {
    e.preventDefault();
    if (!selectedId) {
      return;
    }
    const idNum = Number(selectedId);

    setAthletes((prev) => {
      const updated = prev.map((a) =>
        a.id === idNum
          ? {
              // If the exam only asks you to change one field (for example sport),
              // you can set the other fields back to a.name / a.country here
              // or remove them from this object.
              ...a,
              name: editName,
              sport: editSport,
              country: editCountry,
            }
          : a
      );
      // Persist the change so it survives refresh and appears in other views.
      saveAthleteData(updated);
      return updated;
    });
  };

  return (
    <div className="stack">
      <form onSubmit={updateAthlete}>
        <label>
          Athlete to update
          <select
            value={selectedId}
            onChange={handleSelectChange}
          >
            <option value="">Choose an athlete…</option>
            {athletes.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} – {a.name}
              </option>
            ))}
          </select>
        </label>

        {/* If the exam only wants you to edit one field, you can comment out
            the other input blocks below as needed. */}
        <label>
          Name
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </label>

        <label>
          Sport
          <input
            value={editSport}
            onChange={(e) => setEditSport(e.target.value)}
            required
          />
        </label>

        <label>
          Country
          <input
            value={editCountry}
            onChange={(e) => setEditCountry(e.target.value)}
          />
        </label>

        <button type="submit">Update athlete</button>
      </form>

      <div>
        <strong>Athletes:</strong>
        <ul>
          {athletes.map((a) => (
            <li key={a.id}>
              {a.id} – {a.name} – {a.sport} ({a.country})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



function AddAthlete() {
  const [athletes, setAthletes] = useState([]);
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    loadAthleteData()
      .then((data) => setAthletes(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();

    // Build a list of ids that already exist.
    const existingIds = athletes.map((a) => Number(a.id));

    // Start at 101 and move upwards until we find a free id.
    let nextId = 101;
    while (existingIds.includes(nextId)) {
      nextId += 1;
    }

    // CHANGE KEYS HERE FOR EXAM if the JSON has different fields.
    const newAthlete = {
      id: nextId,
      name,
      sport,
      country,
    };

    setAthletes((prev) => {
      const updated = [...prev, newAthlete];
      saveAthleteData(updated);
      return updated;
    });

    setName("");
    setSport("");
    setCountry("");
  };

  return (
    <div className="card-grid">
      <div className="stack">
        <form onSubmit={handleAdd}>
          <label>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Sport
            <input
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              required
            />
          </label>
          <label>
            Country
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add Athlete</button>
        </form>
      </div>

      <div className="stack">
        <strong>Current athletes:</strong>
        <ul>
          {athletes.map((a) => (
            <li key={a.id}>
              {a.id} – {a.name} – {a.sport} ({a.country})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



// ===================================================================
// 5. DELETE (simulated) – Remove Person by id
// ===================================================================
function DeletePerson() {
  const [people, setPeople] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    loadPeopleData()
      .then((data) => {
        setPeople(data);
        if (data.length > 0) {
          setSelectedId(String(data[0].id));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = () => {
    if (!selectedId) {
      return;
    }
    const idNum = Number(selectedId);
    setPeople((prev) => {
      const updated = prev.filter((p) => p.id !== idNum);
      savePeopleData(updated);
      return updated;
    });
  };

  return (
    <div className="stack">
      <label>
        Person to delete
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">Choose a person…</option>
          {people.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      <button type="button" onClick={handleDelete}>
        Delete selected person
      </button>

      <ul>
        {people.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}



function DeleteAthlete() {
  const [athletes, setAthletes] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    loadAthleteData()
      .then((data) => {
        setAthletes(data);
        if (data.length > 0) {
          setSelectedId(String(data[0].id));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = () => {
    if (!selectedId) {
      return;
    }
    const idNum = Number(selectedId);

    setAthletes((prev) => {
      const updated = prev.filter((a) => a.id !== idNum);
      // Keep athletes data in sync with what user sees in all views.
      saveAthleteData(updated);
      return updated;
    });
  };

  return (
    <div className="stack">
      <label>
        Athlete to delete
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">Choose an athlete…</option>
          {athletes.map((a) => (
            <option key={a.id} value={a.id}>
              {a.id} – {a.name}
            </option>
          ))}
        </select>
      </label>

      <button type="button" onClick={handleDelete}>
        Delete selected athlete
      </button>

      <ul>
        {athletes.map((a) => (
          <li key={a.id}>
            {a.id} – {a.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ===================================================================
// 6. GET one Athlete – find athlete by id after loading list
// ===================================================================
function SingleAthleteById() {
  const [athletes, setAthletes] = useState([]);
  const [athleteId, setAthleteId] = useState("101");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadAthleteData()
      .then((data) => setAthletes(data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleFind = (e) => {
    e.preventDefault();
    const idNum = Number(athleteId);
    const found = athletes.find((a) => a.id === idNum) || null;
    setSelected(found);
  };

  return (
    <div className="stack">
      <form onSubmit={handleFind}>
        <label>
          Athlete id
          <input
            value={athleteId}
            onChange={(e) => setAthleteId(e.target.value)}
          />
        </label>
        <button type="submit">Find athlete</button>
      </form>

      {selected ? (
        <div>
          <strong>{selected.name}</strong>
          <p>
            Sport: {selected.sport} – Country: {selected.country}
          </p>
        </div>
      ) : (
        <p className="status-text">No athlete selected yet or id not found.</p>
      )}
    </div>
  );
}

// ===================================================================
// 7. Filter/Search People – client-side filter()
// ===================================================================
function SearchPeople() {
  const [people, setPeople] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadPeopleData()
      .then((data) => setPeople(data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Lowercase search on name (simple but common)
  const filtered = people.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="stack">
      <label>
        Search by name
        <input
          placeholder="Type part of a name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <ul>
        {filtered.map((p) => (
          <li key={p.id}>
            {p.name} – {p.city}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ===================================================================
// 8. Broken fetch – show error handling pattern
// ===================================================================
function BrokenFetchExample() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    // CHANGE URL FOR EXAM if they want you to show error behaviour.
    fetch("/this-file-does-not-exist.json")
      .then((r) => {
        if (!r.ok) {
          // Force this path for 404 / 500 etc.
          throw new Error("Request failed with status " + r.status);
        }
        return r.json();
      })
      .then(() => {
        setStatus("Somehow loaded (this should not happen in our demo)");
      })
      .catch((err) => {
        setStatus("Error caught: " + err.message);
      });
  }, []);

  return <p className="status-text">{status}</p>;
}

// ===================================================================
// 9. React basics – simple counter (useState + events)
// ===================================================================
function BasicCounter() {
  // Simple counter to revise useState and event handlers.
  // For an exam, this kind of pattern might appear in a short question.
  const [count, setCount] = useState(0);

  return (
    <div className="stack">
      <p>Current count: {count}</p>
      <div>
        <button type="button" onClick={() => setCount(count + 1)}>
          Increment
        </button>
      </div>
    </div>
  );
}

// ===================================================================
// 10. React basics – props and mapping
// ===================================================================
const DEMO_PEOPLE = [
  { id: 1, name: "Alice", city: "Dublin" },
  { id: 2, name: "Bob", city: "Cork" },
];

function PropsDemo() {
  return (
    <div className="stack">
      <strong>Props demo (parent passing data to child components):</strong>
      <ul>
        {DEMO_PEOPLE.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
}

function PersonCard({ person }) {
  return (
    <li>
      {person.name} – {person.city}
    </li>
  );
}

// Extra React basics examples – more realistic patterns.

// Simple controlled form using useState for each field.
function SimpleFormDemo() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [submissions, setSubmissions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real exam answer you could push this into an array in state
    // instead of using alert. This example does exactly that.
    const nextEntry = { id: Date.now(), name, city };
    setSubmissions((prev) => [...prev, nextEntry]);

    setName("");
    setCity("");
  };

  return (
    <div className="stack">
      <form className="stack" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          City
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <button type="submit">Add entry</button>
      </form>

      <div>
        <strong>Entries:</strong>
        <ul>
          {submissions.map((entry) => (
            <li key={entry.id}>
              {entry.name} from {entry.city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


// Search/filter example using local state and props.
function SearchFilterDemo() {
  const people = DEMO_PEOPLE;

  const [query, setQuery] = useState("");

  const filtered = people.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="stack">
      <label>
        Search by name
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <ul>
        {filtered.map((p) => (
          <PersonCard key={p.id} person={p} />
        ))}
      </ul>
    </div>
  );
}

// Child choosing a value for the parent (lifting state up).
function ColourPickerDemo() {
  const [chosen, setChosen] = useState(null);

  // Map the colour name to a simple CSS background colour.
  const colourStyle = chosen
    ? { backgroundColor: chosen.toLowerCase(), width: "80px", height: "16px", borderRadius: "999px" }
    : { backgroundColor: "#e5e7eb", width: "80px", height: "16px", borderRadius: "999px" };

  return (
    <div className="stack">
      <div className="stack">
        <p>Selected colour: {chosen || "None"}</p>
        <div style={colourStyle} />
      </div>
      <div className="card-grid">
        <ColourButton colour="Red" onSelect={setChosen} />
        <ColourButton colour="Green" onSelect={setChosen} />
        <ColourButton colour="Blue" onSelect={setChosen} />
      </div>
    </div>
  );
}


function ColourButton({ colour, onSelect }) {
  return (
    <button type="button" onClick={() => onSelect(colour)}>
      {colour}
    </button>
  );
}


// Extra React examples based on lectures 1–8.

// Conditional rendering demo: show and hide extra details.
function ToggleDetailsDemo() {
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible((prev) => !prev);

  return (
    <div className="stack">
      <button type="button" onClick={toggle}>
        {visible ? "Hide details" : "Show details"}
      </button>
      {/* In an exam you can conditionally render elements like this. */}
      {visible && (
        <p>
          These are some extra details only shown when the toggle is on.
        </p>
      )}
    </div>
  );
}

// Derived value demo: calculates a simple total from two inputs.
function DerivedValueDemo() {
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const total = Number(price || 0) * Number(quantity || 0);

  return (
    <div className="stack">
      <label>
        Price
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        Quantity
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>
      <p>Total: {total}</p>
    </div>
  );
}

// Simple effect demo: timer counting seconds while the component is mounted.
function SimpleTimerDemo() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // In an exam you may not need the cleanup, but it is good practice.
    const id = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <p>Seconds since this card was opened: {seconds}</p>;
}

// Child component adding items into a list owned by the parent.
// This shows lifting state up using a callback prop.
function ChildAddsItemDemo() {
  const [items, setItems] = useState(["First"]);

  const handleAdd = (value) => {
    if (!value) return;
    setItems((prev) => [...prev, value]);
  };

  return (
    <div className="stack">
      <AddItemForm onAdd={handleAdd} />
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Small child form that notifies the parent when a new item should be added.
function AddItemForm({ onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="stack">
      <label>
        New item
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <button type="submit">Add item</button>
    </form>
  );
}

// Simple tabs demo: switch between two views based on state.
function TabsDemo() {
  const [tab, setTab] = useState("one");

  return (
    <div className="stack">
      <div className="card-grid">
        <button type="button" onClick={() => setTab("one")}>
          Tab one
        </button>
        <button type="button" onClick={() => setTab("two")}>
          Tab two
        </button>
      </div>

      {/* In an exam, tab content is often implemented with conditional rendering like this. */}
      {tab === "one" && <p>This is the first tab.</p>}
      {tab === "two" && <p>This is the second tab.</p>}
    </div>
  );
}

// Basic form validation demo: disable submit when the field is empty.
function ValidationDemo() {
  const [email, setEmail] = useState("");
  const isValid = email.includes("@");

  const handleSubmit = (e) => {
    e.preventDefault();
    // In an exam you might send this email somewhere or show a message.
    alert("Submitted: " + email);
  };

  return (
    <form onSubmit={handleSubmit} className="stack">
      <label>
        Email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      {/* Button is disabled until the email "looks" valid. */}
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
      {!isValid && <p>Please enter a value containing "@".</p>}
    </form>
  );
}

// ===================================================================
// 11. Generic JSON dataset example


// ===================================================================
function GenericDatasetExample() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // CHANGE HERE FOR EXAM:
    //   Use the JSON file or endpoint given in the question.
    //   For example: "/players.json", "/books.json", "/orders.json".
    //   Below we use "/people.json" so the example works out of the box.
    fetch("/people.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load dataset (status " + res.status + ")");
        }
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="status-text">Loading generic dataset...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {/* CHANGE FIELDS HERE FOR EXAM:
              Replace name/age/city with whatever properties the dataset has. */}
          {item.name} – Age {item.age} – {item.city}
        </li>
      ))}
    </ul>
  );
}


// ===================================================================
// 9. People advanced – stats and a details panel
// ===================================================================
function PeopleAdvanced() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

useEffect(() => {
  // Same source as PeopleList. Only the way we use the data is different.
  loadPeopleData()
    .then((data) => {
      setPeople(data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, []);

  if (loading) return <p className="status-text">Loading people...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  const total = people.length;
  const sumAges = people.reduce((sum, p) => sum + Number(p.age || 0), 0);
  const averageAge = total > 0 ? (sumAges / total).toFixed(1) : "0";

  const cities = Array.from(new Set(people.map((p) => p.city)));

  const selectedPerson =
    people.find((p) => p.id === selectedId) || null;

  return (
    <div className="card-grid">
      <div className="stack">
        <p>Total people: {total}</p>
        <p>Average age: {averageAge}</p>
        <p>Distinct cities: {cities.join(", ")}</p>

        <strong>Click a person to view details:</strong>
        <ul>
          {people.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setSelectedId(p.id)}
              >
                {p.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="stack">
        <strong>Selected person:</strong>
        {selectedPerson ? (
          <div>
            <p>Name: {selectedPerson.name}</p>
            <p>Age: {selectedPerson.age}</p>
            <p>City: {selectedPerson.city}</p>
          </div>
        ) : (
          <p className="status-text">No person selected yet.</p>
        )}
      </div>
    </div>
  );
}

// ===================================================================
// 10. Athletes advanced – filter and sort
// ===================================================================
function AthletesAdvanced() {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countryFilter, setCountryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    loadAthleteData()
      .then((data) => {
        setAthletes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="status-text">Loading athletes...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  const countries = Array.from(new Set(athletes.map((a) => a.country)));

  let filtered = athletes;
  if (countryFilter !== "All") {
    filtered = filtered.filter((a) => a.country === countryFilter);
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "sport") {
      return a.sport.localeCompare(b.sport);
    }
    return 0;
  });

  return (
    <div className="stack">
      <div className="stack">
        <label>
          Filter by country
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
          >
            <option value="All">All</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort by
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="sport">Sport</option>
          </select>
        </label>
      </div>

      <ul>
        {sorted.map((a) => (
          <li key={a.id}>
            {a.name} – {a.sport} ({a.country})
          </li>
        ))}
      </ul>
    </div>
  );
}
