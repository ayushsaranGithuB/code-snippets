const Header = () => {
    return (
        <>
            <header>
                <nav>
                    <div className="logo">
                        <a href="/"><img src="/code.svg" width="30" alt="" /> Code Snippets</a>
                    </div>
                    <ul>
                        <li>
                            <a href="/create">(+)New</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Header;