export const registerMiddleware = async (req, res, next) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
    const { username, password } = req.body;
  
    // Check if both username and password are provided
    if (!username || !password) {
      return res.status(400).json({ msg: "Please provide both username and password." });
    }
  
    // Check if username and password meet length requirements
    if (username.length <= 3) {
      return res.status(400).json({ msg: "Username must be more than 3 characters long." });
    }
  
    if (password.length <= 5) {
      return res.status(400).json({ msg: "Password must be more than 5 characters long." });
    }
  
    // Check if password meets complexity requirements
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        msg: "Password must be at least 6 characters long and contain at least one number and one lowercase letter.",
      });
    }
  
    next();
  };
  