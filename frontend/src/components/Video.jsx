export default function Video() {
    return (
        <>
            <div style={{ position: "relative", width: "100%", height: "100%",
 }}>
                <video width="100%" height="100%" autoPlay muted loop  >
                    <source src="2-car.mp4" type="video/mp4" />
                </video>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: "40px",
                       
                    }}
                >
                    <h1
                        style={{
                            color: "white",
                            fontSize: "2rem",
                            margin: 0,
                        }}
                    >
                        <p className="bg-warning text-light rounden-3 p-2">location</p>
                        <h1>hi welcome to my location site</h1>
                    </h1>
                </div>
                
            </div>
        </>
    )
}