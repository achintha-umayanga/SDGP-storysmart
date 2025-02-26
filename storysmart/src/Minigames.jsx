import "bootstrap/dist/css/bootstrap.min.css";

const MiniGames = () => {
    const games = [
        {
            title: "Mystery Word Game",
            description: "Guess the hidden word before time runs out!",
            image: "mystery-word.png",
            link: "/mystery-word-game"
        },
        {
            title: "Role Play Game",
            description: "Make choices and experience different story paths!",
            image: "role-play.webp",
            link: "/role-play-game"
        },
        {
            title: "Story Completion Game",
            description: "Finish the story by choosing the right words!",
            image: "story-completion.avif",
            link: "/story-completion-game"
        }
    ];

    return (
        <div className="min-vh-100 py-4" style={{ backgroundColor: "#1a2238", color: "white" }}>
            <div className="container">
                <h2 className="text-center mb-4" style={{ color: "#A9D0F5" }}>Mini Games</h2>
                <div className="row justify-content-center mx-auto" style={{ maxWidth: "1200px" }}>
                    {games.map((game, index) => (
                        <div className="col-md-4 d-flex" key={index}>
                            <div className="card shadow-sm mb-4 flex-fill" style={{ backgroundColor: "#2a3b63", color: "white" }}>
                                <img
                                    src={game.image}
                                    className="card-img-top"
                                    alt={game.title}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body d-flex flex-column text-center">
                                    <h5 className="card-title">{game.title}</h5>
                                    <p className="card-text flex-grow-1">{game.description}</p>
                                    <a href={game.link} className="btn play-now-button btn-outline-light">
                                        Play Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MiniGames;