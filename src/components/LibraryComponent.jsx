import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 2rem auto;
  background: #f9fbfc;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  color: #333;
`;

const BookList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BookItem = styled.li`
  margin: 0.75rem 0;
  background: #e3f2fd;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
`;

const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s;

  &:hover {
    background: #125ea4;
  }

  &:disabled {
    background: #b0bec5;
    cursor: not-allowed;
  }
`;

const Deadline = styled.small`
  color: #d32f2f;
  margin-top: 0.3rem;
`;

const booksDB = [
  { id: 1, title: "Introduction to Algorithms", author: "Cormen" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 4, title: "1984", author: "George Orwell" },
];

export default function LibraryManagement({ user }) {
  const [issuedBooks, setIssuedBooks] = useState([]);

  const handleIssue = (book) => {
    if (!issuedBooks.some((b) => b.id === book.id)) {
      setIssuedBooks([
        ...issuedBooks,
        { ...book, issuedDate: new Date(), returnDate: getReturnDate() },
      ]);
    }
  };

  const handleReturn = (bookId) => {
    setIssuedBooks(issuedBooks.filter((book) => book.id !== bookId));
  };

  const getReturnDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date;
  };

  const sortedIssuedBooks = [...issuedBooks].sort(
    (a, b) => new Date(a.returnDate) - new Date(b.returnDate)
  );

  return (
    <Container>
      <Title>📚 Library Management</Title>

      <Section>
        <h4>Available Books</h4>
        <BookList>
          {booksDB.map((book) => (
            <BookItem key={book.id}>
              <span>{book.title} - {book.author}</span>
              <Button
                onClick={() => handleIssue(book)}
                disabled={issuedBooks.some((b) => b.id === book.id)}
              >
                {issuedBooks.some((b) => b.id === book.id) ? "Issued" : "Issue"}
              </Button>
            </BookItem>
          ))}
        </BookList>
      </Section>

      <Section>
        <h4>My Issued Books</h4>
        {issuedBooks.length === 0 ? (
          <p>No books issued yet.</p>
        ) : (
          <BookList>
            {sortedIssuedBooks.map((book) => (
              <BookItem key={book.id}>
                <BookDetails>
                  <strong>{book.title}</strong> - {book.author}
                  <Deadline>
                    Return by: {new Date(book.returnDate).toLocaleDateString()}
                  </Deadline>
                </BookDetails>
                <Button onClick={() => handleReturn(book.id)}>Return</Button>
              </BookItem>
            ))}
          </BookList>
        )}
      </Section>
    </Container>
  );
}
