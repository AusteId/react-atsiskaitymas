import { useEffect, useState } from "react";
import { getAllData } from "../helpers/get";
import { Link } from "react-router-dom";
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
        <h1 className="font-bold text-stone-300 text-2xl text-center py-5">
          Knygų sąrašas
        </h1>
        <section className="flex flex-wrap g-3 justify-center">
          {books.map((book) => (
            <div
              key={book.id}
              className="m-5 p-3 border-2 flex flex-col items-center rounded-3xl w-80 h-128"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-32 object-cover"
              />
              <h2 className="text-stone-300 font-bold pt-3 text-lg truncate">
                {book.title}
              </h2>
              <p className="text-stone-300 font-semibold truncate">
                {book.author}
              </p>
              <p className="text-stone-300">{book.category}</p>
              <p className="text-stone-300">{book.price}€</p>
              <div>
                <button
                  className="text-stone-300 btn btn-ghost"
                  onClick={() => reserveHandler(book.id, book.reserved)}
                >
                  {book.reserved ? "Grąžinti" : "Išduoti skaitytojui"}
                </button>
                <Link
                  className="text-stone-300 btn btn-ghost"
                  to={`/edit/${book.id}`}
                >
                  Redaguoti
                </Link>
              </div>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}

export default WelcomePage;