import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { postdata } from "../helpers/post";

function BookRegistration() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await postdata({
        ...data,
        reserved: false,
      });
      reset();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h1 className="font-bold text-stone-300 text-2xl text-center py-5">Registruoti knygą</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="text-center">
        <section className="flex flex-col">
          <section className="grid grid-cols-2">
            <label className="text-stone-300 pr-10 self-center justify-self-end">Knygos pavadinimas:</label>
            <input
              type="text"
              placeholder="3-100 simbolių"
              className="rounded-xl w-80"
              {...register("title", {
                required: "Knygos pavadinimą nurodyti privaloma",
                minLength: {
                    value: 3,
                    message: "Knygos pavadinimą turi sudaryti bent 3 simboliai",
                },
                maxLength: {
                    value: 100,
                    message: "Knygos pavadinimą turi sudaryti ne daugiau kaip 100 simbolių",
                },
              })}
            />
            <p className="text-red-500 font-bold pb-3">
              {errors.title?.message}
            </p>
          </section>
          <section className="grid grid-cols-2">
            <label className="text-stone-300 pr-10 self-center justify-self-end">Knygos autorius:</label>
            <input
              type="text"
              className="rounded-xl w-80"
              {...register("author", {
                required: "Knygos autorių nurodyti privaloma",
                pattern: {
                    value: /^[A-Za-zą-žĄ-Ž\s]*$/,
                    message: "Autoriaus įrašas turi būti sudarytas tik iš raidžių ir tarpų",
                },
              })}
            />
            <p className="text-red-500 font-bold pb-3">
              {errors.author?.message}
            </p>
          </section>
          <section className="grid grid-cols-2">
            <label className="text-stone-300 pr-10 self-center justify-self-end">Knygos kategorija:</label>
            <select
            className="rounded-xl w-80"
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
          <section className="grid grid-cols-2">
            <label className="text-stone-300 pr-10 self-center justify-self-end">Knygos kaina:</label>
            <input
              type="number"
              className="rounded-xl w-80"
              {...register("price", {
                required: "Knygos kainą nurodyti privaloma",
                validate: {
                    positiveNumber: (fieldValue) => {
                        return (
                            fieldValue > 0 || "Kaina turi būti didesnė nei 0€"
                        );
                    }
                }
              })}
            />
            <p className="text-red-500 font-bold pb-3">
              {errors.price?.message}
            </p>
          </section>
          <section className="grid grid-cols-2">
            <label className="text-stone-300 pr-10 self-center justify-self-end">Knygos viršelis:</label>
            <input
              type="text"
              placeholder="Nuoroda į knygos viršelio paveikslėlį"
              className="rounded-xl w-80"
              {...register("cover", {
                required: "Viršelio nuorodą pridėti privaloma",
                pattern: {
                    value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                    message: "Įkelkite tinkamą nuorodą",
                },
              })}
            />
            <p className="text-red-500 font-bold pb-3">
              {errors.cover?.message}
            </p>
          </section>
          <section>
            <button className="text-stone-300 pr-5 my-5 btn btn-ghost">Užregistruoti knygą</button>
          </section>
        </section>
      </form>
    </main>
  );
}

export default BookRegistration;
