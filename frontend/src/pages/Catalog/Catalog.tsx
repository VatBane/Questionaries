import React from "react";
import QuizData from "../../types/Quiz.ts"
import QuizCard from "../../components/QuizCard/QuizCard.tsx";
import "./Catalog.css"
// import {fetchQuests} from "../../services/api.ts";


const CatalogPage: React.FC = () => {
    const [apiData, setApiData] = React.useState<QuizData[]>();

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/questionaries")
            const data = await response.json();
            console.log(data)
            setApiData(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    return (
        <main className="catalog">
            {apiData && apiData.map((data: QuizData) => (
                <QuizCard name={data.name} description={data.description}
                          questionsNumber={data.taskCount} />
                ))
            }
            {/*<QuizCard name={"quiz"} description={"desc"} questionsNumber={1}/>*/}
        </main>
    )
}

export default CatalogPage;