import { useEffect, useState } from "react";
import { getAllData } from "../helpers/get";
import { updateData } from "../helpers/update";

function WelcomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllData();
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  const reserveHandler = async (id, status) => {
    try {
      const updateStatus = { reserved: !status };
      await updateData(id, updateStatus);
      setBooks((prev) =>
        prev.map((book) =>
          book.id === id ? { ...book, reserved: !status } : book
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <section>
        <h1>Knygų sąrašas</h1>
        <section>
          {books.map((book) => (
            <div key={book.id}>
              <img src={book.cover} alt={book.title} />
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              <p>{book.category}</p>
              <p>{book.price}€</p>
              <button onClick={() => reserveHandler(book.id, book.reserved)}>
                {book.reserved ? "Grąžinti" : "Išduoti skaitytojui"}
              </button>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}

export default WelcomePage;
