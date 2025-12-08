export default function Footer() {
  return (
    <footer
      className="text-center text-muted py-4 border-top"
      style={{
        height: "20px",
        lineHeight: "20px", // ← vertically centers text
        fontSize: "10px",
        borderTop: "1px solid #ccc",
      }}
    >
      <p>© {new Date().getFullYear()} Lee Lab — University Lab Website</p>
    </footer>
  );
}
