/* eslint-disable react/prop-types */
const Navbar = ({ isLoggedIn }) => {
    return (
        <nav>
            {isLoggedIn ? (
                <>
                    <a href="/contact">Contact</a>
                </>
            ) : (
                <>
                    <a href="/signup">Sign Up</a>
                </>
            )}
        </nav>
    );
};

export default Navbar;