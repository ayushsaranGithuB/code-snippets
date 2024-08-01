const Header = () => {
    return (
        <>
            <header>
                <nav>
                    <div class="logo">
                        <a href="/"><img src="/code.svg" width="30" alt="" /> Code Snippets</a>
                    </div>
                    <ul>
                        <li>
                            <a href="/create">(+) New_Snippet</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Header;