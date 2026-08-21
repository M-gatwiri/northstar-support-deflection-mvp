import { useEffect, useState } from "react";

const attendees = [
  {
    id: "A001",
    name: "Mercy",
  },
  {
    id: "A002",
    name: "Jane",
  },
  {
    id: "A003",
    name: "Brian",
  },
];

function CheckIn() {
  const [attendeeId, setAttendeeId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!attendeeId || status !== "PENDING") {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/attendees/${attendeeId}`
        );

        const attendee = await response.json();

        if (attendee.status === "CHECKED_IN") {
          setStatus("CHECKED_IN");
          setMessage(`${attendee.name} is checked in!`);
        }
      } catch (error) {
        console.error("Could not check attendee status:", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [attendeeId, status]);

  const handleCheckIn = async () => {
    const attendee = attendees.find(
      (person) => person.id === attendeeId
    );

    if (!attendee) {
      setStatus("ERROR");
      setMessage("Attendee not found.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/print", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attendeeId: attendee.id,
          attendeeName: attendee.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("ERROR");
        setMessage(data.message);
        return;
      }

      setStatus("PENDING");
      setMessage(
        `${attendee.name}'s badge is being printed. Waiting for confirmation...`
      );
    } catch (error) {
      console.error(error);
      setStatus("ERROR");
      setMessage("Could not connect to the check-in server.");
    }
  };

  return (
    <section className="check-in">
      <h2>Event Check-In</h2>

      <p>Scan an attendee QR code or enter their attendee ID.</p>

      <input
        type="text"
        placeholder="e.g. A001"
        value={attendeeId}
        onChange={(event) => setAttendeeId(event.target.value)}
      />

      <button onClick={handleCheckIn}>
        Check In
      </button>

      {status === "PENDING" && (
        <div>
          <p>⏳ {message}</p>
          <p>Please wait for badge printing confirmation.</p>
        </div>
      )}

      {status === "CHECKED_IN" && (
        <div>
          <p>✅ {message}</p>
        </div>
      )}

      {status === "ERROR" && (
        <div>
          <p>❌ {message}</p>
        </div>
      )}
    </section>
  );
}

export default CheckIn;