export async function getProfile(id) {
    try {
      console.log("Fetching profile...");
      const res = await fetch(`http://localhost:8000/kosovo/profiles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        const message = `An error has occurred: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
  
      const profile = await res.json();
      return profile;
    } catch (err) {
      console.error("Error fetching profile:", err.message);
      throw err;
    }
  }
  