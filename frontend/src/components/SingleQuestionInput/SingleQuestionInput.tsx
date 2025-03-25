import "./SingleQuestionInput.css"

const SingleQuestionInput = () => {
    return (
        <>
            <div className="single-response-container">
                <input type="text" placeholder="Response 1"/>
                <input type="radio" name="correct" className='radio'/>
            </div>

            <div className="single-response-container">
                <input type="text" placeholder="Response 2"/>
                <input type="radio" name="correct"/>
            </div>

            <div className="single-response-container">
                <input type="text" placeholder="Response 2"/>
                <input type="radio" name="correct"/>
            </div>

            <div className="single-response-container">
                <input type="text" placeholder="Response 4"/>
                <input type="radio" name="correct"/>
            </div>
        </>
    )
}

export default SingleQuestionInput;