export async function postJob(data) {
    try {
      const res = await fetch(`http://localhost:8000/api/jobs/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer mPUA8X6hoyYFY4PtTs1tIljwS6HWM7`, 
          // Don't set Content-Type manually when sending FormData
        },
        body: data, // FormData object
      });
  
      if (!res.ok) {
        const message = `An error has occurred: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
  
      return await res.json();
    } catch (err) {
      console.error("Error posting job:", err.message);
      throw err;
    }
  }
  
  export async function getMyJobs() {
    try {
      console.log("Fetching my jobs...");
      const res = await fetch('http://localhost:8000/api/jobs/mine/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer mPUA8X6hoyYFY4PtTs1tIljwS6HWM7`
        },
      });
  
      if (!res.ok) {
        const message = `An error has occurred: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
  
      const jobs = await res.json();
      return jobs;
    } catch (err) {
      console.error("Error fetching my jobs:", err.message);
      throw err;
    }
  }
  
  export async function getJobs() {
    try {
      console.log("Fetching public jobs...");
      const res = await fetch('http://localhost:8000/api/jobs/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        const message = `An error has occurred: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
  
      const jobs = await res.json();
      return jobs;
    } catch (err) {
      console.error("Error fetching jobs:", err.message);
      throw err;
    }
  }
  