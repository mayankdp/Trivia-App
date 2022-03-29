import { auth } from "../firebase";

function Profile() {
    const user = auth.currentUser;

    return (
        <div id="page_placeholder">
            <h2>Profile Placeholder</h2>
            <p>Display Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default Profile;