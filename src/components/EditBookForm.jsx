import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../helpers/get";
import { updateData } from "../helpers/update";

function EditBookForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getBook = async () => {
      try {
        const book = await getById(id);
        setValue("title", book.title);
        setValue("author", book.author);
        setValue("category", book.category);
        setValue("price", book.price);
        setValue("cover", book.cover);
      } catch (error) {
        setError(error.message);
      }
    };
    getBook();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateData(id, data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="container mx-auto px-4">
      <section className="max-w-xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-stone-300 text-center">
          Redaguoti knygą
        </h2>
        {error && <p className="text-error">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <section className="flex flex-col">
            <section className="grid grid-cols-2">
              <label className="text-stone-300 pr-10 self-center justify-self-end">
                Knygos pavadinimas:
              </label>
              <input
                type="text"
                {...register("title", {
                  required: "Knygos pavadinimą nurodyti privaloma",
                  minLength: {
                    value: 3,
                    message: "Knygos pavadinimą turi sudaryti bent 3 simboliai",
                  },
                  maxLength: {
                    value: 100,
                    message:
                      "Knygos pavadinimą turi sudaryti ne daugiau kaip 100 simbolių",
                  },
                })}
                className="input input-bordered w-full"
              />
              <p className="text-red-500 font-bold pb-3">
                {errors.title?.message}
              </p>
            </section>
          </section>
          <section className="grid grid-cols-2">
            <label className="text-stone-300 pr-10 self-center justify-self-end">
              Knygos autorius:
            </label>
            <input
              type="text"
              {...register("author", {
                required: "Knygos autorių nurodyti privaloma",
                pattern: {
                  value: /^[A-Za-zą-žĄ-Ž\s]*$/,
                  message:
                    "Autoriaus įrašas turi būti sudarytas tik iš raidžių ir tarpų",
                },
              })}
              className="input input-bordered w-full"
            />
            <p className="text-red-500 font-bold pb-3">
              {errors.author?.message}
            </p>
          </section>
          <section className="grid grid-cols-2">
            <label className="text-stone-300 pr-10 self-center justify-self-end">
              Knygos kategorija:
            </label>
            <select
              {...register("category", {
                required: "Knygos kategoriją nurodyti privaloma",
              })}
              className="select select-bordered w-full"
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
          <section className="grid grid-cols-2">
            <label className="text-stone-300 pr-10 self-center justify-self-end">
              Knygos kaina:
            </label>
            <input
              type="number"
              {...register("price", {
                required: "Knygos kainą nurodyti privaloma",
                validate: {
                  positiveNumber: (fieldValue) => {
                    return fieldValue > 0 || "Kaina turi būti didesnė nei 0€";
                  },
                },
              })}
              className="input input-bordered w-full"
            />
            <p className="text-red-500 font-bold pb-3">
              {errors.price?.message}
            </p>
          </section>
          <section className="grid grid-cols-2">
            <label className="text-stone-300 pr-10 self-center justify-self-end">
              Knygos viršelis:
            </label>
            <input
              type="text"
              {...register("cover", {
                required: "Viršelio nuorodą pridėti privaloma",
                pattern: {
                  value:
                    /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
                  message: "Įkelkite tinkamą nuorodą",
                },
              })}
              className="input input-bordered w-full"
            />
            <p className="text-red-500 font-bold pb-3">
              {errors.cover?.message}
            </p>
          </section>
          <section className="my-4 flex justify-center">
            <button
              type="button"
              className="btn btn-ghost text-stone-300 mr-2"
              onClick={() => navigate(-1)}
            >
              Atšaukti
            </button>
            <button type="submit" className="btn btn-ghost text-stone-300">
              Atnaujinti
            </button>
          </section>
        </form>
      </section>
    </main>
  );
}

export default EditBookForm;
