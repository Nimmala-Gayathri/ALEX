import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch default books on initial render
  useEffect(() => {
    const fetchDefaultBooks = async () => {
      try {
        const res = await axios.get(
          `https://openlibrary.org/search.json?title=bestseller`
        );
        console.log("Book data:", res.data.docs);
        setBooks(res.data.docs.slice(0, 50)); // Limit results to 10
      } catch (error) {
        console.error("Error fetching default books", error);
      }
    };
    fetchDefaultBooks();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?title=${search}`
      );
      setBooks(res.data.docs.slice(0, 10)); // Limit results to 10
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
//   const cleanKey = book.key.startsWith("/") ? book.key.slice(1) : book.key;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Book Finder <span style={{color:"#1e3457"}}>ALEX</span></h1>
      <input
        type="text"
        placeholder="Search for books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchBar}
      />
      <button onClick={handleSearch} style={styles.searchButton}>
        Search
      </button>
      <div style={styles.results}>
       {books.map((book) => {
  const cleanKey = book.key.replace("/works/", ""); // Sanitize the key
  return (
    <div
      key={book.key}
      style={styles.bookCard}
      onClick={() => navigate(`/book/${cleanKey}`)}
    >
      <img
        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
        alt={book.title}
        style={styles.bookImage}
      />
      <h3 style={styles.bookTitle}>{book.title}</h3>
      <p style={styles.bookAuthor}>
        {book.author_name ? `by ${book.author_name.join(", ")}` : ""}
      </p>
    </div>
  );
})}

      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    fontFamily: "'Arial', sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  searchBar: {
    width: "50%",
    padding: "10px",
    fontSize: "1rem",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  },
  searchButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    marginLeft: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  results: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  bookCard: {
    width: "200px",
    textAlign: "center",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "transform 0.3s",
     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
  },
  bookCardHover: {
    transform: "scale(1.05)",
  },
  bookImage: {
    width: "100%",
    height: "auto",
    marginBottom: "10px",
  },
  bookTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: "0.9rem",
    color: "#555",
  },
};

export default Home;
