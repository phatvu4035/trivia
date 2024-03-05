import { useEffect, useState } from "react";
import { useDispatch} from 'react-redux';
import { setQuestions } from "../redux/questionSlice";

const Filter = () => {
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [categories, setCategories] = useState([]);

    const dispatch = useDispatch();

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
    }

    useEffect(() => {
        let url = `https://opentdb.com/api_category.php`;
        fetch(url).then(resp => resp.json()).then(data => {
            setCategories(data.trivia_categories);
        } );
    }, []);

    const getQuizs = () => {
        let url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;
        fetch(url).then(resp => resp.json()).then((data) => {
            dispatch(setQuestions(data.results));
        });
        return false;
    }
    return (
        <form className="filter-form">
            <div className="row">
                <div key={'1'} className="form-group col-45">
                    <select className="form-control" name="categorySelect" onChange={handleCategoryChange} defaultValue={category}>
                        <option value={''}>Select a category</option>
                        {categories.map((cat) => {
                            return (
                                <>
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                </>
                            )
                        })}
                    </select>
                </div>
                <div key={'2'} className="form-group col-45">
                    <select className="form-control" name="difficultySelect" onChange={handleDifficultyChange} defaultValue={difficulty}>
                        <option key={'1'} value={''}>Select a difficulty</option>
                        <option key={'2'} value="easy">Easy</option>
                        <option key={'3'} value="medium">Medium</option>
                        <option key={'4'} value="hard">Hard</option>
                    </select>
                </div>
                <div key={'3'} className="col-10">
                    <button id="createBtn" onClick={(event) => {
                        getQuizs();
                        event.preventDefault();
                    }} className="btn btn-outline-dark">Create</button>
                </div>
            </div>
        </form>
    );
}
export default Filter
