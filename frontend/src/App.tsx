import './App.css'
import Header from "./components/Header/Header.tsx";
import CatalogPage from "./pages/Catalog/Catalog.tsx";
import Footer from "./components/Footer/Footer.tsx";
import BuilderPage from "./pages/Builder/Builder.tsx"
import React from "react";
import QuizPage from "./pages/QuizPage/QuizPage.tsx";


interface PageState {
    name: string; // Add more pages here
    props?: any; // Store dynamic props for each page
}


const App = () => {
    const [currentPage, setCurrentPage] = React.useState<PageState>({ name: "catalog" });

    const changePage = (page: string, props?: any) => {
        setCurrentPage({name: page, props: props});
    }

    return (
        <>
            <Header/>
                {currentPage.name === "catalog" && <CatalogPage onNavigate={changePage} />}
                {currentPage.name === "builder" && <BuilderPage onNavigate={changePage} />}
                {currentPage.name === "quiz" && <QuizPage id={currentPage.props} onNavigate={changePage} />}
            <Footer/>
        </>
    )
}

export default App
