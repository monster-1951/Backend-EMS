
export async function logout(req, res) {  // <-- Use `res` here, not `response`.
  try {
    const cookieOptions = {
      httpOnly: true,
      sameSite: 'none',
    };

    // Use `res` to clear cookies
    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);

    return res.json({
      message: "Logout Successful",  // Corrected spelling from "messaage" to "message"
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,  // Fixed "messaage" typo
      error: true,
      success: false,
    });
  }
}
