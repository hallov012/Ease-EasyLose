function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        fontSize: "2.5rem",
        fontWeight: "bold",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          color: "var(--main-color)",
        }}
      >
        404 Error
      </div>
      <div>잘못된 접근입니다!</div>
    </div>
  )
}

export default NotFoundPage
