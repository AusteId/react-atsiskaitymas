import { useEffect, useState } from "react";
import { getAllData } from "../helpers/get";
import { updateData } from "../helpers/update";

function WelcomePage() {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);

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

  const editHandler = async () => {
    try {
      await updateData(editBook.id, editBook);
      setBooks((prev) =>
        prev.map((book) => (book.id === editBook.id ? editBook : book))
      );
      setEditBook(null);
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
              <button onClick={() => setEditBook(book)}>Redaguoti</button>
            </div>
          ))}
        </section>

        {editBook && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              editHandler();
            }}
            noValidate
          >
            <section>
              <section>
                <label>Knygos pavadinimas:</label>
                <input
                  type="text"
                  value={editBook.title}
                  onChange={(event) =>
                    setEditBook({ ...editBook, title: event.target.value })
                  }
                  {...register("title", {
                    required: "Knygos pavadinimą nurodyti privaloma",
                    minLength: {
                      value: 3,
                      message:
                        "Knygos pavadinimą turi sudaryti bent 3 simboliai",
                    },
                    maxLength: {
                      value: 100,
                      message:
                        "Knygos pavadinimą turi sudaryti ne daugiau kaip 100 simbolių",
                    },
                  })}
                />
                <p className="text-red-500 font-bold pb-3">
                  {errors.title?.message}
                </p>
              </section>
              <section>
                <label>Knygos autorius:</label>
                <input
                  type="text"
                  value={editBook.author}
                  onChange={(event) =>
                    setEditBook({ ...editBook, author: event.target.value })
                  }
                  {...register("author", {
                    required: "Knygos autorių nurodyti privaloma",
                    pattern: {
                      value: /^[A-Za-zą-žĄ-Ž\s]*$/,
                      message:
                        "Autoriaus įrašas turi būti sudarytas tik iš raidžių ir tarpų",
                    },
                  })}
                />
                <p className="text-red-500 font-bold pb-3">
                  {errors.author?.message}
                </p>
              </section>
              <section>
                <label>Knygos kategorija:</label>
                <select
                  {...register("category", {
                    required: "Knygos kategoriją nurodyti privaloma",
                  })}
                >
                  <option value="">Kategorija</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Science">Science</option>
                  <option value="Biography">Biography</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Dystopian">Dystopian</option>
                  <option value="Romance">Romance</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Adventure">Adventure</option>
                </select>
                <p className="text-red-500 font-bold pb-3">
                  {errors.category?.message}
                </p>
              </section>
              <section>
                <label>Knygos kaina:</label>
                <input
                  type="number"
                  value={editBook.price}
                  onChange={(event) =>
                    setEditBook({ ...editBook, price: event.target.value })
                  }
                  {...register("price", {
                    required: "Knygos kainą nurodyti privaloma",
                    validate: {
                      positiveNumber: (fieldValue) => {
                        return (
                          fieldValue > 0 || "Kaina turi būti didesnė nei 0€"
                        );
                      },
                    },
                  })}
                />
                <p className="text-red-500 font-bold pb-3">
                  {errors.price?.message}
                </p>
              </section>
              <section>
                <label>Knygos viršelis:</label>
                <input
                  type="text"
                  value={editBook.cover}
                  onChange={(event) =>
                    setEditBook({ ...editBook, cover: event.target.value })
                  }
                  {...register("cover", {
                    required: "Viršelio nuorodą pridėti privaloma",
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                      message: "Įkelkite tinkamą nuorodą",
                    },
                  })}
                />
                <p className="text-red-500 font-bold pb-3">
                  {errors.cover?.message}
                </p>
              </section>
              <section>
                <button type="submit">Atnaujinti</button>
                <button onClick={() => setEditBook(null)}>Atšaukti</button>
              </section>
            </section>
          </form>
        )}
      </section>
    </main>
  );
}

export default WelcomePage;
