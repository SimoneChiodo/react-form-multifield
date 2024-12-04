import { useState } from "react";

// Components
import Button from "./components/Button";

// Custom CSS
import "./assets/App.css";

function App() {
    const [count, setCount] = useState(0);

    // Articles Array
    const [articles, setArticles] = useState([]);

    // Form Data
    const [formFields, setFormFields] = useState({
        title: "",
        author: "",
        status: "",
        image: "",
        description: "",
        genre: "",
        publish: false,
    });

    // Warning text placed at the top of the page
    const [warningText, setWarningText] = useState("");

    // Variables
    const [isEditing, setIsEditing] = useState(undefined); // Warn that im EDITING an element and not ADDING a new one

    // On Form Submit
    function handleFormSubmit(e) {
        e.preventDefault();

        // Check if input is not empty
        if (Object.values(formFields).some((data) => data === "")) {
            setWarningText("\nRiempire tutte le caselle!");
            return;
        }

        // Check if an element is being edited
        if (isEditing !== undefined) {
            const newArticles = [...articles];

            // find the index to change
            const indexToChange = newArticles.findIndex(
                (element) => element.id === isEditing
            );

            // change the index
            newArticles[indexToChange] = {
                id: newArticles[indexToChange].id,
                title: formFields.title,
                author: formFields.author,
                genre: formFields.genre,
                status: formFields.status,
                description: formFields.description,
                image: formFields.image,
                publish: formFields.publish,
                isBeingEdited: false,
            };

            setArticles(newArticles);
            setIsEditing(undefined);
            setWarningText("");
            return;
        }

        // Check if the text doesn't already exist
        let alreadyExist = false;
        articles.map((element) => {
            element.title === formFields.title && (alreadyExist = true);
        });
        if (alreadyExist) {
            setWarningText("\nQuesto titolo esiste già");
            return;
        }

        // Add the new Article
        const newArticles = [...articles];
        newArticles.push({
            id: getLastId(articles),
            title: formFields.title,
            author: formFields.author,
            genre: formFields.genre,
            status: formFields.status,
            description: formFields.description,
            image: formFields.image,
            publish: formFields.publish,
            isBeingEdited: false,
        });
        setArticles(newArticles);
    }

    function handleFormChange(e) {
        const newFormData = { ...formFields, [e.target.name]: e.target.value };

        setFormFields(newFormData);
    }

    // Get the Last ID of an Array
    function getLastId(obj) {
        let id = 0;
        {
            obj.map((element) => {
                element.id >= id && (id = element.id + 1);
            });
        }
        return id;
    }

    // Delete an element from an array
    function deleteReactiveElementById(array, setFz, id) {
        let newArray = [...array];
        setFz(newArray.filter((element) => element.id !== id));
    }

    return (
        <>
            <main className="d-flex flex-column align-items-center mt-5">
                {/* Container */}
                <div className="w-50">
                    {/* WARNING TEXT (Default: empty) */}
                    <h1 className="underline-red text-center mb-3">
                        {warningText}
                    </h1>

                    {/* FORM */}
                    <form onSubmit={handleFormSubmit} className="row g-3">
                        {/* Title Input */}
                        <div className="col-6">
                            <label htmlFor="inputTitle" className="form-label">
                                Titolo articolo:
                            </label>

                            <input
                                type="text"
                                onChange={handleFormChange}
                                className="form-control"
                                id="inputTitle"
                                name="title"
                            />
                        </div>
                        {/* Author Input */}
                        <div className="col-6">
                            <label htmlFor="inputAuthor" className="form-label">
                                Autore articolo:
                            </label>

                            <input
                                type="text"
                                onChange={handleFormChange}
                                className="form-control"
                                id="inputAuthor"
                                name="author"
                            />
                        </div>
                        {/* Genre Input */}
                        <div className="col-6">
                            <label htmlFor="inputGenre" className="form-label">
                                Genere articolo:
                            </label>

                            <select
                                onChange={handleFormChange}
                                className="form-select"
                                id="inputGenre"
                                name="genre"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Scegliere...
                                </option>
                                <option value="Genere 1">Genere 1</option>
                                <option value="Genere 2">Genere 2</option>
                                <option value="Genere 3">Genere 3</option>
                            </select>
                        </div>
                        {/* Status Input */}
                        <div className="col-6">
                            <label htmlFor="inputStatus" className="form-label">
                                Stato articolo:
                            </label>

                            <select
                                onChange={handleFormChange}
                                className="form-select"
                                id="inputStatus"
                                name="status"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Scegliere...
                                </option>
                                <option value="Bozza">Bozza</option>
                                <option value="Terminato">Terminato</option>
                            </select>
                        </div>
                        {/* Description Input */}
                        <div className="col-12">
                            <label
                                htmlFor="inputDescription"
                                className="form-label"
                            >
                                Descrizione articolo:
                            </label>

                            <textarea
                                onChange={handleFormChange}
                                className="form-control"
                                id="inputDescription"
                                name="description"
                            ></textarea>
                        </div>
                        {/* Image Input */}
                        <div className="col-12">
                            <label htmlFor="inputImage" className="form-label">
                                Immagine articolo (url):
                            </label>

                            <input
                                type="text"
                                onChange={handleFormChange}
                                className="form-control"
                                id="inputImage"
                                name="image"
                            />
                        </div>
                        {/* Publish Input */}
                        <div className="col-12">
                            <label
                                htmlFor="inputPublish"
                                className="form-label"
                            >
                                Pubblicare l'articolo?
                            </label>

                            <select
                                onChange={handleFormChange}
                                className="form-select"
                                id="inputPublish"
                                name="publish"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Scegliere...
                                </option>
                                <option value={true}>Sì</option>
                                <option value={false}>No</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                Invio
                            </button>
                        </div>
                    </form>

                    {/* ARTICLES LIST */}
                    <ul className="mt-5">
                        {articles?.length ? (
                            // Print the Array
                            articles.map((article) => (
                                <li
                                    key={article.id}
                                    className={
                                        "border d-flex justify-content-between py-2 px-3 mb-2 " +
                                        (article.isBeingEdited === true &&
                                            "bg-secondary")
                                    }
                                >
                                    {/* Article Image */}
                                    <div>
                                        <img
                                            className="rounded-4"
                                            src={article.image}
                                            alt="image not found"
                                        />
                                    </div>

                                    {/* Article Details */}
                                    <div className="flex-grow-1 mx-2 py-2">
                                        <p className="m-0 mb-1">
                                            <b>{"Titolo:"}</b> {article.title}
                                        </p>
                                        <p className="m-0 mb-1">
                                            <b>{"Autore:"}</b> {article.author}
                                        </p>
                                        <p className="m-0 mb-1">
                                            <b>{"Genere:"}</b> {article.genre}
                                        </p>
                                        <p className="m-0">
                                            <b>{"Stato:"}</b> {article.status}
                                        </p>
                                        <p className="m-0 mb-1">
                                            <b>{"Descrizione:"}</b>{" "}
                                            {article.description}
                                        </p>
                                        <p className="m-0 mb-1">
                                            <b>{"Pubblicato:"}</b>{" "}
                                            {article.publish === true
                                                ? "Sì"
                                                : "No"}
                                        </p>
                                    </div>

                                    {/* Utility Buttons */}
                                    <div className="d-flex align-items-center">
                                        {/* Pulsante Modifica */}
                                        <Button
                                            key={"mod-" + article.id}
                                            text={"✏"}
                                            handleStatusChange={() => {
                                                setIsEditing(article.id);
                                                setWarningText(
                                                    "Modifica dell'elemento \"" +
                                                        article.title +
                                                        '"'
                                                );
                                                article.isBeingEdited = true;
                                            }}
                                        />

                                        {/* Pulsante Elimina */}
                                        <Button
                                            key={"del-" + article.id}
                                            text={"🧺"}
                                            handleStatusChange={() =>
                                                deleteReactiveElementById(
                                                    articles,
                                                    setArticles,
                                                    article.id
                                                )
                                            }
                                        />
                                    </div>
                                </li>
                            ))
                        ) : (
                            // Print Empty Array Message
                            <h2>Ancora nessun post...</h2>
                        )}
                    </ul>
                </div>
            </main>
        </>
    );
}

export default App;
