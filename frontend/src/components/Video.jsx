export default function Video() {
    return (
        <>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <video width="100%" height="100%" autoPlay muted loop  >
                    <source src="caravant.mp4" type="video/mp4" />
                </video>
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontSize: "2rem",
                        // textAlign: "center",
                    }}
                >
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="w-100">hellow world kjkjjk kdklj kskjkl sjlkj skjkjds kkajckl kjsljvsvn ;</h1>
                        </div>
                        <div className="col-md-6">
                            <div className="card" style={{width: "18rem;"}}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}