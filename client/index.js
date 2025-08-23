import ReactDOM from 'react-dom';
import './styles.css';

function App() {
    return (
        <div className="container">
            <div className="image-section">
                <h1>Capturing Moments,<br />Creating Memories</h1>
            </div>
            <div className="form-section">
                <h1>Create an account</h1>
                <p>Already have an account? <a href="#">Log in</a></p>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Enter your password" />
                <label>
                    <input type="checkbox" /> I agree to the Terms & Conditions
                </label>
                <button>Create account</button>
                <div className="social-buttons">
                    <button>Google</button>
                    <button>Apple</button>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
