import { useState } from "react";

export default function ProfilePage() {
    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        bio: "Passionate learner and developer",
        avatar: "https://placehold.co/400x400/000000/FFF",
        level: 4,
        xp: 75,
        subjects: [
            { id: 1, name: "English", progress: 85, icon: "book" },
            { id: 2, name: "Coding", progress: 72, icon: "code-slash" }
        ],
        achievements: [
            { id: 1, name: "Code Master", icon: "trophy", date: "2024-02-15" },
            { id: 2, name: "Grammar Guru", icon: "patch-check", date: "2024-02-14" },
            { id: 3, name: "Fast Learner", icon: "lightning", date: "2024-02-10" }
        ],
        games: [
            { id: 1, name: "Role Play Game", progress: 65, icon: "people" },
            { id: 2, name: "Mystery Word", progress: 80, icon: "puzzle" },
            { id: 3, name: "Story Completion", progress: 45, icon: "book" }
        ],
        gameRewards: 3,
        badges: 5,
        coins: 250
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUser({ ...user, avatar: imageUrl });
        }
    };

    return (
        <div className="min-vh-100 py-4" style={{ backgroundColor: "#1a2238" }}>
            <div className="container">
                {/* Profile Header Section */}
                <div className="row align-items-center mb-5">
                    <div className="col-md-3 text-center">
                        <div className="position-relative d-inline-block">
                            <img
                                src={user.avatar}
                                alt="Profile"
                                className="rounded-circle border border-4 border-primary"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                            {editing && (
                                <label className="position-absolute bottom-0 end-0 btn btn-primary rounded-circle">
                                    <i className="bi bi-camera-fill"></i>
                                    <input type="file" className="d-none" onChange={handleImageUpload} />
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="col-md-9 text-light">
                        <div className="d-flex align-items-center mb-2">
                            {editing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    className="form-control form-control-lg bg-transparent text-light me-3"
                                />
                            ) : (
                                <h1 className="display-5 fw-bold mb-3 me-3">{user.name}</h1>
                            )}
                            <button
                                onClick={() => setEditing(!editing)}
                                className="btn btn-outline-light btn-sm me-3"
                            >
                                <i className={`bi bi-${editing ? 'check-lg' : 'pencil-square'} me-1`}></i>
                                {editing ? "Save" : "Edit"}
                            </button>
                        </div>
                        {editing ? (
                            <textarea
                                name="bio"
                                value={user.bio}
                                onChange={handleChange}
                                className="form-control bg-transparent text-light"
                                rows="2"
                            />
                        ) : (
                            <p className="lead">{user.bio}</p>
                        )}
                        <div className="d-flex align-items-center mt-3">
                            <span className="badge bg-primary me-2">Level {user.level}</span>
                            <div className="progress flex-grow-1" style={{ height: "8px" }}>
                                <div
                                    className="progress-bar bg-info"
                                    role="progressbar"
                                    style={{ width: `${user.xp}%` }}
                                    aria-valuenow={user.xp}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>
                            <span className="ms-2 text-info">{user.xp}%</span>
                        </div>
                    </div>
                </div>

                {/* First Row - Stats */}
                <div className="row g-4 mb-4">
                    <div className="col-md-4">
                        <div className="p-4 rounded-3 text-center text-light h-100" style={{ backgroundColor: "#2a3b63" }}>
                            <i className="bi bi-fire fs-1 text-danger mb-2"></i>
                            <h3>10 Day Streak</h3>
                            <div className="progress mt-2" style={{ height: "6px" }}>
                                <div className="progress-bar bg-danger" style={{ width: "80%" }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 rounded-3 text-center text-light h-100" style={{ backgroundColor: "#2a3b63" }}>
                            <i className="bi bi-award fs-1 text-warning mb-2"></i>
                            <h3>{user.badges} Badges</h3>
                            <p className="mb-0">2 New Available!</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 rounded-3 text-center text-light h-100" style={{ backgroundColor: "#2a3b63" }}>
                            <i className="bi bi-coin fs-1 text-warning mb-2"></i>
                            <h3>{user.coins} Coins</h3>
                            <div className="mt-3">
                                <div className="d-flex justify-content-between mb-2">
                                    <small>Recent: +50</small>
                                    <small className="text-success">Daily Bonus</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Row */}
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="p-4 rounded-3 text-light h-100" style={{ backgroundColor: "#2a3b63" }}>
                            <h3 className="text-center mb-4">Subjects</h3>
                            <div className="d-flex flex-column gap-3">
                                {user.subjects.map(subject => (
                                    <div key={subject.id} className="p-3 rounded bg-dark bg-opacity-25">
                                        <div className="d-flex align-items-center">
                                            <i className={`bi bi-${subject.icon} fs-4 text-info me-3`}></i>
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>{subject.name}</span>
                                                    <span className="text-info">{subject.progress}%</span>
                                                </div>
                                                <div className="progress" style={{ height: "4px" }}>
                                                    <div
                                                        className="progress-bar bg-info"
                                                        style={{ width: `${subject.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 rounded-3 text-light h-100" style={{ backgroundColor: "#2a3b63" }}>
                            <h3 className="text-center mb-4">Achievements</h3>
                            <div className="d-flex flex-column gap-3">
                                {user.achievements.map(achievement => (
                                    <div key={achievement.id} className="p-3 rounded bg-dark bg-opacity-25 d-flex align-items-center">
                                        <i className={`bi bi-${achievement.icon} fs-4 text-warning me-3`}></i>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>{achievement.name}</span>
                                                <small className="text-info">{new Date(achievement.date).toLocaleDateString()}</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 rounded-3 text-light h-100" style={{ backgroundColor: "#2a3b63" }}>
                            <h3 className="text-center mb-4">Game Rewards</h3>
                            <div className="d-flex flex-column gap-3">
                                {user.games.map(game => (
                                    <div key={game.id} className="p-3 rounded bg-dark bg-opacity-25">
                                        <div className="d-flex align-items-center">
                                            <i className={`bi bi-${game.icon} fs-4 text-success me-3`}></i>
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>{game.name}</span>
                                                    <span className="text-success">{game.progress}%</span>
                                                </div>
                                                <div className="progress" style={{ height: "4px" }}>
                                                    <div
                                                        className="progress-bar bg-success"
                                                        style={{ width: `${game.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-3">
                                <small className="text-success">{user.gameRewards} Rewards Ready to Claim!</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}