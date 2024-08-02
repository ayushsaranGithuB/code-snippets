import LoginBtn from './LoginBtn';
const Footer = () => {

    // hljs.highlightAll();
    // function copy(id) {
    //     const code = document.getElementById(id).querySelector('code').innerText;
    //     navigator.clipboard.writeText(code);
    // }

    return (
        <footer>
            <p>Code Snippets. &copy; 2024 - <a href="http://www.ayushsaran.info" target='_blank'>Ayush Saran</a></p>
            <LoginBtn />
        </footer>
    );
}

export default Footer;