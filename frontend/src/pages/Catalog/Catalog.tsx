import React from "react";
import QuizData from "../../types/Quiz.ts"
import QuizCard from "../../components/QuizCard/QuizCard.tsx";
import "./Catalog.css"
// import {fetchQuests} from "../../services/api.ts";


interface CatalogPageProps {
    onNavigate: (page: string, props?: any) => void;
}


const CatalogPage: React.FC<CatalogPageProps> = ({onNavigate}) => {
    const [apiData, setApiData] = React.useState<QuizData[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/questionaries")
            const data = await response.json();
            setApiData(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    const addQuiz = () => {
        onNavigate("builder")
    }

    const onQuizDelete = async (id: number) => {
        const response = await fetch(`http://localhost:8080/api/v1/questionaries/${id}`, {
            "method": "DELETE",
        })
        const data = await response.json();
        if (response.status !== 200) {
            alert(`Failed to delete questionaries: ${data.message}`);
            return
        }
        let newApiData = [...apiData];
        newApiData = newApiData.filter((quiz) => quiz.id !== id);
        setApiData(newApiData);
    }

    return (
        <main className="catalog">
            {apiData && apiData.map((data: QuizData) => (
                <QuizCard name={data.name} description={data.description}
                          questionsNumber={data.taskCount}
                          onClick={() => onNavigate("quiz", data.id)}
                          key={data.id}
                          onDelete={() => {onQuizDelete(data.id)}}
                />
                ))
            }
            <button onClick={addQuiz}>Add quiz</button>
            {/*<QuizCard name={"quiz"} description={"desc"} questionsNumber={1}/>*/}
        </main>
    )
}

export default CatalogPage;