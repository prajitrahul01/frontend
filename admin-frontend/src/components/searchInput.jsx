
const SearchInput = ({handleChange}) => {
    return (
        <div className='center'>
            <input
                className="search-box"
                type='search'
                name="search"
                placeholder="Search books"
                onChange={handleChange}
            />
        </div>
    );
}

export default SearchInput;
