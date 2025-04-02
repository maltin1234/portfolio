export async function postProject(data) {
  try {
    const res = await fetch(`http://localhost:8000/api/projects/create/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer mPUA8X6hoyYFY4PtTs1tIljwS6HWM7`, // Don't set "Content-Type" manually for FormData
      },
      body: data, // FormData object
    });

    if (!res.ok) {
      const message = `An error has occurred: ${res.status} - ${res.statusText}`;
      throw new Error(message);
    }

    return await res.json();
  } catch (err) {
    console.error("Error posting project:", err.message);
    throw err;
  }
}


  export async function getMyProjects() {
    try {
      console.log("Fetching projects...");
      const res = await fetch('http://localhost:8000/api/pakistan/', {
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
  
      const projects = await res.json();
      return projects;
    } catch (err) {
      console.error("Error fetching projects:", err.message);
      throw err;
    }
  }
  export async function getProjects() {
    try {
      console.log("Fetching projects...");
      const res = await fetch('http://localhost:8000/api/projects/public', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        const message = `An error has occurred: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
  
      const projects = await res.json();
      return projects;
    } catch (err) {
      console.error("Error fetching projects:", err.message);
      throw err;
    }
  }
  