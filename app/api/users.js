export async function getUsers() {
    // Make a fetch request to the provided URL
    const res = await fetch('http://localhost:8000/users/all/');
    
    // Parse the JSON response and return it
    const users = await res.json();
    
    return users;
  }
  
  export async function getRatings() {
    // Make a fetch request to the provided URL
    const res = await fetch('http://localhost:8000/users/user/view_ratings/');
    
    // Parse the JSON response and return it
    const ratings = await res.json();
    
    return ratings;
  }
  