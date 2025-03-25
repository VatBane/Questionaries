import './App.css'
import Header from "./components/Header/Header.tsx";
// import CatalogPage from "./pages/Catalog/Catalog.tsx";
import Footer from "./components/Footer/Footer.tsx";
import BuilderPage from "./pages/Builder/Builder.tsx"


const App = () => {
    return (
        <>
            <Header/>
            {/*<CatalogPage />*/}
            <BuilderPage />
            <Footer/>
        </>
    )
}

export default App
