export async function authMiddleware(req, res) {
  const apiEmail = req.headers["email"];

  if (!apiEmail) {
    res.status(401).send({
      message: "Email é necessário.",
    });
  }
}
