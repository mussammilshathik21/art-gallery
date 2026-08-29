import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const ACCOUNTS_KEY = "ak-arts-accounts";
const SESSION_KEY = "ak-arts-user";

/*
  Demo admin account, seeded once so the Admin
  Dashboard is reachable without a backend.

  Email: admin@artsgallery.com
  Password: admin123
*/
const DEMO_ADMIN = {
  name: "Arts Gallery Admin",
  email: "admin@artsgallery.com",
  password: "admin123",
  phone: "",
  address: "",
  role: "admin",
};


/* ================================
   ACCOUNT STORAGE HELPERS
================================= */

function loadAccounts() {
  const raw = localStorage.getItem(ACCOUNTS_KEY);

  let accounts = [];

  if (raw) {
    try {
      accounts = JSON.parse(raw);
    } catch {
      accounts = [];
    }
  }

  // Seed the demo admin once, without overwriting
  // any accounts the person has already created.
  const hasAdmin = accounts.some(
    (account) => account.email === DEMO_ADMIN.email
  );

  if (!hasAdmin) {
    accounts = [DEMO_ADMIN, ...accounts];
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }

  return accounts;
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

// Strip the password before this account ever
// touches component state or the session key.
function toPublicUser(account) {
  const { password, ...publicUser } = account;
  return publicUser;
}


export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(SESSION_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Make sure the demo admin exists as soon as the
  // app loads, even before anyone logs in.
  useEffect(() => {
    loadAccounts();
  }, []);


  /* ================================
     LOGIN
  ================================= */

  const login = (email, password) => {
    const accounts = loadAccounts();

    const account = accounts.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase()
    );

    if (!account) {
      return {
        success: false,
        message: "Account not found. Please create an account.",
      };
    }

    if (account.password !== password) {
      return {
        success: false,
        message: "Incorrect email or password.",
      };
    }

    const loggedUser = toPublicUser(account);

    setUser(loggedUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(loggedUser));

    return { success: true };
  };


  /* ================================
     SIGNUP
  ================================= */

  const signup = (name, email, password) => {
    const accounts = loadAccounts();

    const alreadyExists = accounts.some(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newAccount = {
      name,
      email,
      password,
      phone: "",
      address: "",
      role: "user",
    };

    saveAccounts([...accounts, newAccount]);

    const loggedUser = toPublicUser(newAccount);

    setUser(loggedUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(loggedUser));

    return { success: true };
  };


  /* ================================
     LOGOUT
  ================================= */

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };


  /* ================================
     UPDATE PROFILE (current user)
  ================================= */

  const updateProfile = (updates) => {
    if (!user) {
      return { success: false };
    }

    const accounts = loadAccounts();

    const updatedAccounts = accounts.map((account) =>
      account.email === user.email
        ? { ...account, ...updates, email: account.email }
        : account
    );

    saveAccounts(updatedAccounts);

    const updatedUser = { ...user, ...updates, email: user.email };

    setUser(updatedUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));

    return { success: true };
  };


  /* ================================
     ADMIN HELPERS
  ================================= */

  // All registered accounts, for the Admin > Users table.
  const getAllUsers = () => loadAccounts().map(toPublicUser);

  // Promote / demote a user by email.
  const setUserRole = (email, role) => {
    const accounts = loadAccounts();

    const updatedAccounts = accounts.map((account) =>
      account.email === email
        ? { ...account, role }
        : account
    );

    saveAccounts(updatedAccounts);

    // Keep the current session in sync if an admin
    // changes their own role.
    if (user?.email === email) {
      const updatedUser = { ...user, role };

      setUser(updatedUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    }
  };

  const deleteUserAccount = (email) => {
    const accounts = loadAccounts();

    saveAccounts(
      accounts.filter((account) => account.email !== email)
    );
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        getAllUsers,
        setUserRole,
        deleteUserAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


// CUSTOM HOOK
export function useAuth() {
  return useContext(AuthContext);
}
