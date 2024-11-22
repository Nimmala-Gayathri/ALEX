import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookDetails() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(`https://openlibrary.org/works/${bookId}.json`);
        console.log("Book data:", res.data); // Log the response to inspect the data
        setBook(res.data);

        if (res.data.authors) {
            const authorPromises = res.data.authors.map((author) =>
              axios.get(`https://openlibrary.org${author.author.key}.json`)
            );
            const authorResponses = await Promise.all(authorPromises);
            const authorNames = authorResponses.map((response) => response.data.name);
            setAuthors(authorNames); // Set authors in state
        }
      } catch (err) {
        console.error("Error fetching book details", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) return <p style={styles.loading}>Loading book details...</p>;

  if (error) return <p style={styles.error}>Failed to load book details.</p>;

  // Check if the book data has covers
  console.log("Book covers:", book.covers); // Log the covers array

  // Construct the cover image URL if available
  const coverImageUrl =
  book?.covers?.[0] // Safely access the first cover ID
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "https://via.placeholder.com/300x400?text=No+Cover+Available"; // Fallback image


  return (
    <div style={styles.detailsContainer}>
      <h1 style={styles.title}>{book.title || "Untitled"}</h1>

      {/* Display cover image if available */}
      {coverImageUrl ? (
        <img src={coverImageUrl} alt="Book Cover" style={styles.coverImage} />
      ) : (
        <p style={styles.noImage}>No cover image available</p>
      )}
        <p>
        <strong>Authors:</strong> {authors.length > 0 ? authors.join(", ") : "Unknown"}
      </p>
      <p style={styles.description}>
        {book.description?.value || book.description || "No description available."}
      </p>
      <p style={styles.info}>
        <strong>Published:</strong> {book.created?.value || "Date not available"}
      </p>
    </div>
  );
}

const styles = {
  detailsContainer: {
    padding: "20px",
    textAlign: "center",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  coverImage: {
    width: "300px",
    height: "auto",
    margin: "20px 0",
    borderRadius: "8px",
  },
  noImage: {
    fontSize: "1rem",
    color: "#999",
    margin: "20px 0",
  },
  description: {
    fontSize: "1rem",
    margin: "20px 0",
    width:"70%",
    margin:"auto",
    marginBottom:"2rem",
    marginTop:"2rem"
  },
  info: {
    fontSize: "1rem",
    color: "#555",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginTop: "20px",
  },
  error: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginTop: "20px",
    color: "red",
  },
};

export default BookDetails;
 