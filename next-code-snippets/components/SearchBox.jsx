const SearchBox = (props) => {
    const keyword = props.keyword;
    return (<>
        <form id="search-form" name="search-form" action="/search">
            <input type="text" name="keyword" placeholder="Search by title or tag" defaultValue={keyword} />
        </form>
    </>);
}

export default SearchBox;