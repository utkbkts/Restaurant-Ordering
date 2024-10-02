import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserSidebar from "../pages/profileSection/user/UserSidebar";
import Navigation from "../components/navigation/Navigation";
import AuthModal from "../pages/auth/AuthModal";
import Footer from "../components/footer/Footer";
import { useSelector } from "react-redux";
import Loading from "../components/loading/Loader";

const userMenu = [
  { name: "Profil", url: "/me/profile" },
  { name: "Profil Güncelle", url: "/me/update" },
  { name: "Parola Değiştir", url: "/me/update_password" },
  { name: "Yorumlarım", url: "/me/reviews" },
  { name: "Siparişlerim", url: "/me/order" },
];

const UserLayout = () => {
  const { pathname } = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const isResetPasswordPage = pathname.startsWith("/password/reset");
  const { user, loading } = useSelector((state) => state.auth);
  const isUserPath = pathname.startsWith("/me/");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
  }, [user]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full text-white h-full mt-[120px]">
      {!isResetPasswordPage && <Navigation setShowLogin={setShowLogin} />}

      {/* Giriş  */}
      {showLogin && (
        <AuthModal showLogin={showLogin} setShowLogin={setShowLogin} />
      )}

      <div className={isUserPath ? "flex " : "w-full"}>
        {/* Kullanıcı sayfası  */}
        {isUserPath && (
          <div className="flex-1 flex items-center  flex-col justify-center  min-h-screen bg-gray-800">
            <UserSidebar userMenu={userMenu} />
          </div>
        )}
        {/* Ana içerik */}
        <div
          className={`${
            isUserPath ? "flex-[4]  min-h-screen " : "w-full h-full"
          } text-black`}
        >
          <Outlet />
        </div>
      </div>
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
