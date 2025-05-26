
export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    maxHeight: "90vh",
    overflowY: "auto",
};

export const buttonStyle = {
    background: 'linear-gradient(135deg, #00f2fe, #03e7a0)',
    color: 'white', '&:hover': { background: 'linear-gradient(135deg, #03e7a0, #00f2fe)' },
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: 'bold'
}

export const linkStyle = {

    color: "white",
    backgroundColor: "#607d8b",
    padding: "10px 20px",
    margin: "30px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
        backgroundColor: "#455a64",
    },
}
export const headerStyle = {
    backgroundColor: "black",
    color: "#fff",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
}
export const backgroundStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundSize: '750px 750px',
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center',
    overflow: 'hidden',
}
export const colorStyle = { backgroundColor: '#607d8b', color: 'white', '&:hover': { backgroundColor: '#455a64' } }
export const paperStyle = {
    p: { xs: 2, sm: 3 },
    boxSizing: 'border-box',
    width: "100%",
    maxWidth: 400,
    minHeight: 250,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #4CAF50",
    borderRadius: 3,
    cursor: "pointer",
    transition: "all 0.3s",
    '&:hover': {
        borderColor: "#2196F3",
        background: "linear-gradient(135deg, #f0f0f0, #e0e0e0)",
    },
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
    backgroundColor: "#ffffff"
}
export const formBox = {
    display: 'flex', flexDirection: 'column', gap: '3rem',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    width: { xs: '90%', sm: '400px' },
}
export const footer = {
    backgroundColor: "#222",
    color: "#fff",
    py: 4,
    textAlign: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 1300
}
