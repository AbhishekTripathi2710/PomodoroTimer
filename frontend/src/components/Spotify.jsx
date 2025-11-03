export default function Spotify() {
    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/* <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX9ZXiu2SQvuM"
                width="300"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe> */}
            <iframe 
            data-testid="embed-iframe" 
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/0oPyDVNdgcPFAWmOYSK7O1?utm_source=generator" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"></iframe>
        </div>
    )
}